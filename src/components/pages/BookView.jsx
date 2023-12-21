import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/FirebaseContext";

function BookView() {
  const firebase = useFirebase();
  const params = useParams();
  const [data, setData] = useState(null);
  const [url, setUrl] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    firebase.getBookById(params.bookid).then((value) => setData(value.data()));
  }, []);

  useEffect(() => {
    if (data) {
      const imageurl = data.ImageUrl;
      firebase.listImage(imageurl).then((url) => setUrl(url));
      console.log(url);
    }
  }, [data]);

  if (data == null) return <h1>Loading ...</h1>;

  const order = async()=>{
   const result =  await firebase.placeorder(params.bookid , qty)
   console.log(result , "order places")
  }

  return (
    <div className="container border rounded ">
      <h1 className="text-center">{data.name}</h1>
      <img className="" src={url} width="50%" />
      <h1>Details</h1>
      <h5>Price : {data.price}</h5>
      <h1>Owners Details</h1>
      <h5>Name:{data.displayName}</h5>
      <h5>Email:{data.userEmail}</h5>
      <form>
        <label for="exampleFormControlInput1" class="form-label">
          Quantity
        </label>
        <input
          onChange={(e) => setQty(e.target.value)}
          type="Number"
          class="form-control"
          id="exampleFormControlInput1"
        />
      </form>
      <button onClick={order} className=" mt-3 btn btn-primary container">Buy Now</button>
    </div>
  );
}

export default BookView;
