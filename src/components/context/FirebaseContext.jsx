import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyAe1JEMMDb92Lz9qmA68iize1_xZIhYlc0",
  authDomain: "bookify-ebd79.firebaseapp.com",
  projectId: "bookify-ebd79",
  storageBucket: "bookify-ebd79.appspot.com",
  messagingSenderId: "512525256464",
  appId: "1:512525256464:web:a0b88a7ec1d6c62ba9c795",
};
// Initialize Firebase

export const useFirebase = () => useContext(FirebaseContext);
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);

export const FirebaseProvider = (props) => {


  
  // user information hook
  const [user, setuser] = useState(null);
  const isLoggedIn = user ? true : false
  // Create Book into firstore
  const submitBooks = async (name, isbnNumber, coverImage, price) => {
    const storeRef = ref(
      storage,
      `uploads/images/${Date.now()}-${coverImage.name}`
    );
    const resultBucket = await uploadBytes(storeRef, coverImage);
    return await addDoc(collection(firestore, "books"), {
      name,
      isbnNumber,
      price,
      ImageUrl: resultBucket.ref.fullPath,
      userEmail: user.email,
      displayName: user.displayName,
      userId: user.uid,
      photoURL: user.photoURL,
    });
  };

  // list the books stoe in firestore
  const listBooks = async () => {
    return await getDocs(collection(firestore, "books"));
  };

  // show cover image of book
  const listImage = (path) => {
    return getDownloadURL(ref(storage, path));
  };

  // get book by id for buying .
  const getBookById = async (bookid) => {
    const docRef = doc(firestore, "books", bookid);
    const result = await getDoc(docRef);
    return result;
  };
  // placing order .
  const placeorder = async (bookid, qty) => {
    const collectionRef = collection(firestore, "books", bookid, "orders");
    const result = await addDoc(collectionRef, {
      userEmail: user.email,
      displayName: user.displayName,
      userId: user.uid,
      photoURL: user.photoURL,
      qty: Number(qty),
    });
    return result;
  };
  // fetch books for orders
  const fetchBooks = async (userId) => {
    const collectionRef = collection(firestore, "books");
    const q = query(collectionRef, where("userId", "==", user.uid));
    const result = await getDocs(q);
    return result;
  };
  // View order list
  const viewOrderDetails = async (bookid) => {
    const collectionRef = collection(firestore, "books", bookid, "orders");
    const result = await getDocs(collectionRef);
    return result;
  };

  // create new user
  const registerUser = async (email, password) =>
   await createUserWithEmailAndPassword(firebaseAuth, email, password);

  // Login user
  const LoginUser =  async (email, password) => {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  };
  //  Google login
  const LoginUserWithGoogle = async () =>
   await  signInWithPopup(firebaseAuth, googleProvider);

  useEffect(() => {
      onAuthStateChanged(firebaseAuth, (user) => {
      if(user) return setuser(user)
      else{return setuser(null)}
    });
    // return () => {
    //   unsubscribe();
    // };
  }, []);

  


  return (
    <FirebaseContext.Provider
      value={{
        registerUser,
        LoginUser,
        LoginUserWithGoogle,
        // isLoggedIn,
        submitBooks,
        listBooks,
        listImage,
        getBookById,
        placeorder,
        fetchBooks,
        user,
        isLoggedIn,
        viewOrderDetails,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
