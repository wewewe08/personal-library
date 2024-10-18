import logo from "../assets/react.svg";
import React, { useState } from "react";
import BookForm from "./BookForm";

function NavBar() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible(!isFormVisible);
  };

  return (
    // Fragments get rid of unnecessary div elements; empty brackets tell React to use Fragments
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid justify-content-around">
          <a className="navbar-brand" href="#">
            <img
              src={logo}
              alt="Logo"
              width="50"
              height="40"
              className="Icon"
            />
          </a>
          <div
            className="d-flex input-group has-search"
            style={{ width: "80%" }}
          >
            <span
              className="input-group-text"
              style={{ backgroundColor: "transparent" }}
            >
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control shadow-none"
              placeholder="Search library"
            />
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
