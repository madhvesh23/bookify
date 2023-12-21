import React from "react";
import { useFirebase } from "./context/FirebaseContext";

function Navbar() {
  const firebase = useFirebase();
  const loggedIn = firebase.isLoggedIn;
  console.log(loggedIn);
  return (
    <nav class="navbar navbar-custom navbar-expand navbar-light">
      <div className="container-fluid">
        <a className="bookify navbar-brand" href="/">
          BookShell
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">
                Home
              </a>
            </li>
            {loggedIn && (
              <>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/books/list"
                  >
                    Add Book
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    aria-current="page"
                    href="/books/orders"
                  >
                    Orders
                  </a>
                </li>
              </>
            )}
          </ul>
          <ul className="nav navbar-nav navbar-right" >
          <li className="nav-item">
                  <a
                    className="logout nav-link "
                    aria-current="page"
                    href="/books/orders"
                  >
                    Logout
                  </a>
                </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
