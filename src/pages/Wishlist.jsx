// src/pages/Wishlist.jsx
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase"; // If using multiple
import { doc, updateDoc } from "firebase/firestore";
import MobileFooter from "../components/MobileFooter";

const movies = [
  { id: 1, title: "Movie A" },
  { id: 2, title: "Movie B" },
];

export default function Wishlist() {
  const { user, userData } = useAuth();

  const toggleWishlist = async (movieId) => {
    const current = userData.wishlist || [];
    const updated = current.includes(movieId)
      ? current.filter((id) => id !== movieId)
      : [...current, movieId];
    await updateDoc(doc(db, "users", user.uid), { wishlist: updated });
  };

  return (
    <>
    <div>
      <h2>My Wishlist</h2>
      {movies.map((movie) => (
        <div key={movie.id}>
          {movie.title}
          <button onClick={() => toggleWishlist(movie.id)}>
            {userData.wishlist?.includes(movie.id) ? "Remove" : "Add"}
          </button>
        </div>
      ))}
    </div>
    <MobileFooter />
    </>

  );
}
