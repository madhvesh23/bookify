import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFirebase } from "../context/FirebaseContext";
export const Login = () => {
  const navigate = useNavigate();

  const firebase = useFirebase();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUser = async (e) => {
    e.preventDefault();
    try {
      firebase.setLoading(true);
      const user = await firebase.LoginUser(email, password);
      console.log(user, "user");
      setTimeout(() => {
        firebase.setLoading(false);
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleAuth = async (e) => {
    e.preventDefault();
    try {
      firebase.setLoading(true);
      await firebase.LoginUserWithGoogle();
      setTimeout(() => {
        firebase.setLoading(false);
        navigate("/");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const handleClick = () => {
      setLoading(true);

      setTimeout(() => {
        setLoading(false);
      }, 500);
    };
    handleClick();
  },[]);

  return (
    <>
      {loading && (
        <div className="loading-container">
          {" "}
          <div className="loading-spinner"></div>{" "}
        </div>
      )}
      {firebase.loading ? (
        <>
          <div className="loading-container">
            {" "}
            <div className="loading-spinner"></div>{" "}
          </div>
        </>
      ) : (
        <>
          <div className="container mt-5 border rounded">
            <form onSubmit={handleUser}>
              <div className="mb-3">
                <h1>Login Page</h1>
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  type="email"
                  required
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                <div id="emailHelp" className="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  value={password}
                  required
                  onChange={(e) => setpassword(e.target.value)}
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </form>
            <h1>OR</h1>
            <button
              onClick={handleGoogleAuth}
              disabled={firebase.loading}
              className="p-2  btn btn-danger"
            >
              Sign with Google
            </button>
          </div>
        </>
      )}
    </>
  );
};
