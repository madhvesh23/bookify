import React, { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom"
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useFirebase } from "./context/FirebaseContext";

function Listcard(props) {
  const firebase = useFirebase();
  const navigate = useNavigate()
  const [Image, setImage] = useState(null);
  useEffect(() => {
     firebase.listImage(props.ImageUrl).then((url) => setImage(url));
  }, []);
  return (
    <Card className="m-3" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={Image} />
      <Card.Body>
        <Card.Title>{props.name} </Card.Title>
        <Card.Text>
          This book is written by {props.displayName}, and sold at price of{" "}
          {props.price}..
        </Card.Text>
        <Button onClick={()=>navigate(props.Link)} variant="success container ">Buy</Button>
      </Card.Body>
    </Card>
  );
}

export default Listcard;
