import React from "react";
import LeftPannel from "./left-pannel/left-pannel";
import style from "./main-body.module.scss";
import MainContent from "./main-content/main-content";

const MainBody = (props) => {
  return (
    <>
     <div className={style["main-body"]}>
         {props.isPannel && <LeftPannel />}
          <MainContent />
     </div>
     
    </>
  );
};

export default MainBody;
