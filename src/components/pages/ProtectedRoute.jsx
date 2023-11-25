import React from 'react'
import { Navigate } from 'react-router-dom'
import { useFirebase } from '../context/FirebaseContext'

const ProtectedRoute = ({children}) => {
  const firebase = useFirebase();
  // const auth = true
  // console.log(auth)
  console.log(firebase.isLoggedIn)
    if(!firebase.isLoggedIn){
      // alert("Please Login first...")
       return <Navigate to="/login" />
    }
  return children;
}

export default ProtectedRoute
