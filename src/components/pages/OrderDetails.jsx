import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/FirebaseContext";
import { useParams } from "react-router-dom";
function OrderDetails() {
  const firebase = useFirebase();
  const params = useParams();
  const [orders, setorders] = useState([]);
  useEffect(() => {
    firebase
      .viewOrderDetails(params.bookid)
      .then((orders) => setorders(orders.docs));
  }, []);
  console.log(orders)
  return (
    <div className="container border rounded  ">
      <h1 className="text-center border p-2 rounded m-2 bg-success"  >Orders</h1>
       {orders.map((order) => {
        const data = order.data();
        return  (
       
            <div className=" mt-5 p-2 container border rounded">
              <h4> Order By : {data.displayName}</h4> 
              <h5>Quantity : {data.qty}</h5>
              <h6>Email : <span className="text-primary">{data.userEmail}</span> </h6>
            </div>
        )
      })}
    </div>
  );
}

export default OrderDetails;
