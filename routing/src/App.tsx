import React, { useState } from "react";
import "./App.css";
import Header from "./components/header/header";
import MainBody from "./components/main-body/main-body";

function App() {
  const [isPannelVisible, setPannelVisibility] = useState(false);

  const togglePannelVisibility = () => {
    setPannelVisibility((t) => !t);
  };

  return (
    <>
      <Header toggleButtonVisibility={togglePannelVisibility} />
      <MainBody isPannel={isPannelVisible} />
    </>
  );
}

export default App;
