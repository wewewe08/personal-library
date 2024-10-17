import logo from "../assets/react.svg";

function NavBar() {
  return (
    // Fragments get rid of unnecessary div elements; empty brackets tell React to use Fragments
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid justify-content-start">
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
            style={{ width: "87%" }}
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
          <div className="form-check form-switch">
            <input
              className="form-check-input shadow-none"
              type="checkbox"
              role="switch"
              id="flexSwitchCheckDefault"
            />
            <label
              className="form-check-label "
              htmlFor="flexSwitchCheckDefault"
            >
              Dark Mode
            </label>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
