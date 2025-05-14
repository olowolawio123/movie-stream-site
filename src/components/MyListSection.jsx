import React, { useEffect, useState } from "react";
import { Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { collection, getDocs, deleteDoc, doc,setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

const MyListSection = ({ showHeader = true }) => {
  const { user } = useAuth();
  const [myList, setMyList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load My List
  useEffect(() => {
    const loadMyList = async () => {
      if (!user) return;

      try {
        const listRef = collection(db, "users", user.uid, "myList");
        const snapshot = await getDocs(listRef);
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMyList(data);
      } catch (error) {
        console.error("Error fetching My List:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMyList();
  }, [user]);

  // Remove movie from list
  const removeFromList = async (movieId) => {
    if (!user) return;
  
    const docId = movieId.toString(); // Firestore doc ID must be a string
  
    console.log("Removing movie with Firestore doc ID:", docId);
  
    try {
      await deleteDoc(doc(db, "users", user.uid, "myList", docId));
  
      // Make sure the types match during comparison
      setMyList((prev) => prev.filter((movie) => movie.id.toString() !== docId));
    } catch (error) {
      console.error("Error removing from list:", error.message);
    }
  };

   const handleWatchTrailer = async (movie) => {
      if (!user) return;
    
      try {
        await setDoc(doc(db, "users", user.uid, "continueWatching", movie.id.toString()), {
          id: movie.id,
          title: movie.title || movie.name,
          poster_path: movie.poster_path,
          progress: 10, // simulate starting progress
          timestamp: Date.now()
        });
      } catch (err) {
        console.error("Error adding to continue watching:", err);
      }
    };
  
  
  

  return (
    <>
      {showHeader && <Header />}
      <div className="mt-4">
        <h3 className="text-white mb-3">My List</h3>
        {loading ? (
          <div className="text-white text-center">
            <Spinner animation="border" variant="light" />
          </div>
        ) : myList.length === 0 ? (
          <p className="text-white">You haven’t added anything to your list yet.</p>
        ) : (
          <Row className="g-4">
            {myList.map((movie) => (
              <Col key={movie.id} xs={6} sm={4} md={3}>
                <Card bg="dark" text="white" className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title className="text-center" style={{ fontSize: "1rem" }}>
                      {movie.title}
                    </Card.Title>
                    <Link
                     to={`/movie/${movie.id}`}
                    className="btn btn-outline-light btn-sm"
                     onClick={() => handleWatchTrailer(movie)}
                    >
                     Watch Trailer
                    </Link>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeFromList(movie.id)}
                      className="mt-3"
                    >
                      Remove from My List
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </>
  );
};

export default MyListSection;
