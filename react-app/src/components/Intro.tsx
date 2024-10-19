import "./Intro.css";

function Intro() {
  return (
    <>
      <div
        className="container text-center d-flex justify-content-center align-items-center"
        id="intro-container"
      >
        <div className="jumbotron">
          <h1 className="display-4">Welcome to Yvonne's Personal Library!</h1>
          <p className="lead">
            This is a simple library database that acts as a storage for all the
            books I have read and plan to read.
          </p>
          <div className="custom-hr">
            <i className="fas fa-book-open"></i>
          </div>
        </div>
      </div>
    </>
  );
}

export default Intro;
