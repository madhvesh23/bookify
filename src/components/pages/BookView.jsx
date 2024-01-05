import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../context/FirebaseContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

  if (data == null)
    return (
      <div className="loading-container">
        {" "}
        <div className="loading-spinner"></div>{" "}
      </div>
    );

  const order = async () => {
    firebase.setLoading(true);
    const result = await firebase.placeorder(params.bookid, qty);
    toast("Addded to orders");
    console.log(result, "order places");
    firebase.setLoading(false);
  };

  return (
    <>
      {firebase.loading && (
        <div className="loading-container">
          {" "}
          <div className="loading-spinner"></div>{" "}
        </div>
      )}
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
        <button onClick={order} className=" mt-3 btn btn-primary container">
          Buy Now
        </button>
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
      </div>
    </>
  );
}

export default BookView;
