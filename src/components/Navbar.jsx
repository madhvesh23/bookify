import React, { useState } from "react";
import { useFirebase } from "./context/FirebaseContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Navbar() {
  const [loading, setLoading] = useState(false);
  const firebase = useFirebase();
  const navigate = useNavigate();
  const loggedIn = firebase.isLoggedIn;
  console.log(loggedIn);

  const loggedOutUser = async () => {
    firebase.setLoading(true);
    await firebase.signOutUser().then(() => {
      toast("Please login again!");
      setTimeout(() => {
        firebase.setLoading(false);
        navigate("/login");
      }, 700);
    });
  };

  // loader spinner task

  const handleClick = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  return (
    <>
      {loading && (
        <div className="loading-container">
          {" "}
          <div className="loading-spinner"></div>{" "}
        </div>
      )}
      <nav className="navbar navbar-custom navbar-expand navbar-light">
        <div className="container-fluid">
          <button
            className="bookify navbar-brand"
            onClick={() => {
              navigate("/");
              handleClick();
            }}
          >
            BookShell
          </button>
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
                <button
                  className="nav-link active"
                  aria-current="page"
                  onClick={() => {
                    navigate("/");
                    handleClick();
                  }}
                >
                  Home
                </button>
              </li>
              {loggedIn && (
                <>
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      aria-current="page"
                      onClick={() => {
                        navigate("/books/list");
                        handleClick();
                      }}
                    >
                      Add Book
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      aria-current="page"
                      onClick={() => {
                        navigate("/books/orders");
                        handleClick();
                      }}
                    >
                      Orders
                    </button>
                  </li>
                </>
              )}
            </ul>
            {loggedIn && (
              <>
                <ul className="nav navbar-nav navbar-right">
                  <li className="nav-item">
                    <button
                      className="logout nav-link "
                      aria-current="page"
                      onClick={() => {
                        navigate("/login");
                        handleClick();
                        loggedOutUser();
                      }}
                    >
                      Log out
                    </button>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </nav>
    </>
  );
}

export default Navbar;
