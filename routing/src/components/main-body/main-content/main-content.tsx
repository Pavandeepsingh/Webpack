import React from "react";
import style from "./main-content.module.scss";
import { Routes, Route, Outlet, Link } from "react-router-dom";

const MainContent = (props) => {
  return (
    <>
      <div className={style["main-content"]}>
        <Routes>
          <Route
            path="/"
            element={
              <div className={style["main_container"]}>
                <h1>Welcome to Koch Industries</h1>
              </div>
            }
          />

          <Route
            path="project1"
            element={
              <>
                <div className={style["main_container"]}>
                  <h1><Link to="/project1">Project 1</Link></h1>
                  <Link to="/project1/child0">Load child 0</Link>
                  <Link to="/project1/child1">Load child 1</Link>
                  <Link to="/project1/detail">details</Link>
                  <Link to="/project1/detail/1">details of 1</Link>
                  <Link to="/project1/detail/admin">details of admin</Link>
                  <Outlet />
                </div>
              </>
            }
          >
            <Route index element={<h1>Load Project 1 Load default child</h1>} />
            <Route path="child0" element={<h1>Load Project 1 Child 0 Element</h1>} />
            <Route path="child1" element={<h1>Load Project 1 Child 1 Element</h1>} />
            <Route path="detail" element={<h1>details</h1>} />
            <Route path="detail/:childid" element={<h1>details : childid</h1>} />
            <Route path="detail/admin" element={<h1>details : Admin</h1>} />
          </Route>

          <Route
            path="project2"
            element={
              <div className={style["main_container"]}>
                <h1>Project 2</h1>
              </div>
            }
          />

          <Route
            path="project3"
            element={
              <div className={style["main_container"]}>
                <h1>Project 3</h1>
              </div>
            }
          />

          <Route path="*" element={<h1>Project Not Found</h1>} />
        </Routes>
      </div>
    </>
  );
};

export default MainContent;
