import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useFirebase } from "../context/FirebaseContext";

export const Register = () => {
  const navigate = useNavigate();

  const firebase = useFirebase();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleUser = async (e) => {
    e.preventDefault();
    try {
      const user = await firebase.registerUser(email, password);
       console.log(user)
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   if (firebase.isLoggedIn) {

  //   }
  // });
  return (
    <div className="container mt-5 border rounded">
      <form onSubmit={handleUser}>
        <h1>Signup Page</h1>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            value={email}
            onChange={(e) => setemail(e.target.value)}
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
