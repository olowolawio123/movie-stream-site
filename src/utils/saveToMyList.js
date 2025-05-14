// saveToMyList.js
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const saveToMyList = async (userId, movie) => {
  const movieRef = doc(db, "users", userId, "myList", movie.id.toString());
  await setDoc(movieRef, movie);
};
