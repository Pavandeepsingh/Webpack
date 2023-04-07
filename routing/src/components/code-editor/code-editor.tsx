import React, { useEffect, useRef, useState } from "react";
import style from "./code-editor.module.scss";
import Editor, {
  useMonaco,
  loader,
  Monaco,
  EditorProps,
} from "@monaco-editor/react";
import CopyIcon from "../../assets/svg/copy.svg";

loader
  .init()
  .then((monaco) => console.log("here is the monaco instance:", monaco));

const CodeEditor = () => {
  const editorRef = useRef(null);
  const options: EditorProps["options"] = {
    bracketPairColorization: {
      enabled: true,
      independentColorPoolPerBracketType: true,
    },
    wordWrap: "on",
    // formatOnPaste: true,
    // formatOnType: true,
    fontWeight: "900",
    fontSize: 20,
    scrollbar: {
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8,
      verticalSliderSize: 8,
      horizontalSliderSize: 8,
    },
    // lineDecorationsWidth: 0,
    // readOnly: true,
    matchBrackets: "always",
    autoIndent: "full",
    fontFamily: "monospace",
    minimap: { enabled: false },
    showUnused: false,
    folding: false,
    lineNumbersMinChars: 2,
    scrollBeyondLastLine: false,
    automaticLayout: true,
  };

  function handleEditorDidMount(editor, monaco) {
    console.dir(editor, monaco);
    editorRef.current = editor;
  }

  function handleEditorChange(value, event) {}

  function handleEditorWillMount(monaco) {
    monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
  }

  function copyValue() {
    editorRef.current.focus();
    navigator.clipboard.writeText(editorRef.current.getValue()).then(
      function () {
        console.log("Copying to clipboard was successful!");
      },
      function (err) {
        console.error("Could not copy text: ", err);
      }
    );
  }

  return (
    <>
      <div className={style["editor_wrapper"]}>
        <img
          onClick={copyValue}
          src={CopyIcon}
          className={style["copy-icon"]}
          alt="Copy"
        ></img>
        <Editor
          height="250px"
          width="100%"
          theme="light"
          defaultLanguage="javascript"
          defaultValue="// Enter a code"
          value="// Copy Code
        "
          onMount={handleEditorDidMount}
          onChange={handleEditorChange}
          beforeMount={handleEditorWillMount}
          options={options}
          className={style["editor_style"]}
          language="javascript"
        />
      </div>
    </>
  );
};

export default CodeEditor;
