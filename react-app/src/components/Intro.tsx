import "./Intro.css";
import logo from "../assets/bookshelf.svg";
import { Fade } from "react-awesome-reveal";

function Intro() {
  return (
    <>
      <div
        className="container text-center d-flex justify-content-center"
        id="intro-container"
      >
        <div className="jumbotron">
          <Fade cascade triggerOnce damping={0.3}>
            <img src={logo}></img>
            <h1 className="display-4">Welcome to Yvonne's Personal Library!</h1>
            <p className="lead">
              This is a simple library database that acts as a storage for all
              the books I have read and plan to read.
            </p>
            <div className="custom-hr">
              <i className="fas fa-book-open"></i>
            </div>
          </Fade>
        </div>
      </div>
    </>
  );
}

export default Intro;
