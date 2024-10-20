import logo from "../assets/bookshelf.svg";
import { useState } from "react";
import BookForm from "./BookForm";
import Reveal from "react-awesome-reveal";
import { keyframes } from "@emotion/react";

interface Props {
  setLibrary: (
    library: {
      isbn: string;
      genre: string;
      title: string;
      author: string;
      status: boolean;
    }[]
  ) => void;
}

function NavBar({ setLibrary }: Props) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const openAnimation = keyframes`
  from {
    opacity: 0;
    transform: translate3d(0, -1rem, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

  const openBookForm = () => {
    setIsFormOpen(true);
  };

  const closeBookForm = () => {
    setIsFormOpen(false);
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
            style={{ width: "75%" }}
          >
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
            <input
              type="text"
              className="form-control shadow-none"
              placeholder="Search library by ISBN, book title, or author..."
            />
          </div>
          <button
            type="button"
            className="btn btn-primary"
            onClick={isFormOpen ? closeBookForm : openBookForm}
          >
            Add new book
            <i className="fa fa-plus" style={{ marginLeft: "0.5em" }} />
          </button>
        </div>
      </nav>
      {isFormOpen === true && (
        <Reveal keyframes={openAnimation} triggerOnce>
          <BookForm setLibrary={setLibrary} />
        </Reveal>
      )}
    </>
  );
}

export default NavBar;
