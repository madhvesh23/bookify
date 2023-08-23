import React, { useState } from "react";
import { useFirebase } from "../context/FirebaseContext";
function Listing() {
  const [name, setName] = useState("");
  const [isbnNumber, setisbnNumber] = useState("");
  const [coverImage, setcoverImage] = useState("");
  const [price, setPrice] = useState("");
  const firebase = useFirebase()


  const handleSubmit = async  (e)=>{
    e.preventDefault()
    await firebase.submitBooks(name ,isbnNumber,coverImage,price)
  }

  return (
    <div className="container mt-5 border rounded">
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <h1>Listing Page</h1>
          <label for="BookName" className="form-label">
            Enter Book Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="form-control"
            id="exampleInputEmail1"
          />
        </div>
        <div className="mb-3">
          <label for="isbn" className="form-label">
            ISBN
          </label>
          <input
            value={isbnNumber}
            onChange={(e) => setisbnNumber(e.target.value)}
            type="text"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Price
          </label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="text"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Image
          </label>
          <input
            onChange={(e) => setcoverImage(e.target.files[0])}
            type="file"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-success container m-2">
          Create
        </button>
      </form>
    </div>
  );
}

export default Listing;
