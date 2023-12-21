import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useFirebase } from "../context/FirebaseContext";

const ProtectedRoute = ({ children }) => {
  const firebase = useFirebase();
  const [value, setValue] = useState(firebase.isLoggedIn);
  useEffect(() => {
    setValue(firebase.isLoggedIn);
  }, [firebase.isLoggedIn]);

  console.log(firebase.isLoggedIn);
  console.log(value)

  if (firebase.isLoggedIn) {
    <Navigate to="/" />;
  } else {
    // alert("Please Login first...")
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
