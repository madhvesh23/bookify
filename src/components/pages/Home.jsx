import React, { useEffect, useState } from "react";
import { useFirebase } from "../context/FirebaseContext";
import Listcard from "../Listcard";
function Home() {
  const firebase = useFirebase();
  const [books, setBooks] = useState([]);

    useEffect(() => {
      firebase.listBooks().then((book) => {
        const result = book.docs;
        return setBooks(result);
      });
    }, []);
  return (
    <div className=" row conatiner m-4">
      {books.map((book) => (
        <Listcard
          Link={`/book/view/${book.id}`}
          key={book.id}
          id={book.id}
          {...book.data()}
        />
      ))}
    </div>
  );
}
export default Home;
