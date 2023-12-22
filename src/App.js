import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import { Register } from "./components/pages/Register";
import { Login } from "./components/pages/Login";
import Navbar from "./components/Navbar";
import Listing from "./components/pages/Listing";
import Home from "./components/pages/Home";
import BookView from "./components/pages/BookView";
import Orders from "./components/pages/Orders";
import OrderDetails from "./components/pages/OrderDetails";
import { useFirebase } from "./components/context/FirebaseContext";
import ProtectedRoute from "./components/pages/ProtectedRoute";
import { useEffect } from "react";

function App() {
  const firebase = useFirebase();
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={ firebase.isLoggedIn ?  <Home /> : <Login /> } />
        <Route path="/books/list" element={<Listing />} />
        <Route path="/book/view/:bookid" element={<BookView />} />
        <Route path="/books/orders" element={<Orders />} />
        <Route path="/books/orders/:bookid" element={<OrderDetails />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
