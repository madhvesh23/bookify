import React , {useEffect,useState} from 'react'
import { useFirebase } from '../context/FirebaseContext'
import Listcard from '../Listcard'

function Orders() {
    const firebase = useFirebase()
    const [books ,setbooks] = useState([])
     
    useEffect(()=>{
        if(firebase.isLoggedIn)
         firebase.fetchBooks(firebase.user.uid)?.then((books) => setbooks(books.docs))},[firebase])

    if(firebase.isLoggedIn === false) return <h1>Please Login Again...</h1>
  return (
    <div className='orders'>
      {books.map((book)=>(
            <Listcard Link={`/books/orders/${book.id}`} key={book.id} id={book.id} {...book.data()} />
        ))}
    </div>
  )
}

export default Orders
