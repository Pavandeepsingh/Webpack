import React from "react";
import style from "./left-pannel.module.scss";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const componentList = [
  {
    id: 1,
    name: "home",
    active: false,
    to: "/",
  },
  {
    id: 2,
    name: "Connection Central",
    active: false,
    to: "/project1",
  },
  {
    id: 3,
    name: "RegSearch",
    active: false,
    to: "/project2",
  },
  {
    id: 4,
    name: "trax",
    active: false,
    to: "/project3",
  }
];

const LeftPannel = (props) => {
  
  const navigate = useNavigate();

  return (
    <>
      <div className={`${style["left-pannel"]}`}>
        <ul>
          {componentList.map((c) => {
            return (
              <li
                key={c.id}
                className={
                  style.pannel_menu + " " + `${c.active ? style.active : ""}`
                }
              >
                <Link to={c.to}> {c.name}</Link>
              </li>
            );
          })}
          <li className={style.pannel_menu}  onClick={() => navigate(-1)}> Go Back</li>
        </ul>
      </div>
    </>
  );
};

export default LeftPannel;
