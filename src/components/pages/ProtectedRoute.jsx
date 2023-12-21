import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useFirebase } from "../context/FirebaseContext";

const ProtectedRoute = ({ children }) => {
  const firebase = useFirebase();
  console.log(firebase.isLoggedIn)
    if(!firebase.isLoggedIn){
      // alert("Please Login first...")
       return <Navigate to="/login" />
    }
  return children;
};

export default ProtectedRoute;
