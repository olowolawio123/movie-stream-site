import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import Header from "../components/Header";
import { doc, setDoc, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import MobileFooter from "../components/MobileFooter";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");
  const { user } = useAuth();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );
        setResults(response.data.results || []);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  const handleAddToList = async (movie) => {
    if (!user) return alert("You must be logged in to add to your list.");
    try {
      const movieRef = doc(db, "users", user.uid, "myList", movie.id.toString());
      await setDoc(movieRef, {
        id: movie.id,
        title: movie.title || movie.name,
        poster_path: movie.poster_path || "",
      });
      alert(`${movie.title || movie.name} added to your list!`);
    } catch (error) {
      console.error("Error adding to list:", error);
    }
  };

  const handleWatchTrailer = async (movie) => {
    if (!user) return;

    try {
      // Save to continue watching
      await setDoc(doc(db, "users", user.uid, "continueWatching", movie.id.toString()), {
        id: movie.id,
        title: movie.title || movie.name,
        poster_path: movie.poster_path || "",
        progress: 10,
        timestamp: Date.now(),
      });

      // Add reward notification
      await addDoc(collection(db, "users", user.uid, "notifications"), {
        message: `You watched a trailer: ${movie.title || movie.name}. Click to claim +5 points!`,
        claimed: false,
        type: "trailer",
        timestamp: Date.now(),
      });

    } catch (err) {
      console.error("Error during trailer handling:", err);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-4 text-white">
        <h2>Search Results for: <em>{query}</em></h2>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="light" />
          </div>
        ) : results.length === 0 ? (
          <p>No results found.</p>
        ) : (
          <Row className="g-4">
            {results.map((item) => (
              <Col key={item.id} xs={6} sm={4} md={3}>
                <Card bg="dark" text="white" className="h-100 shadow-sm d-flex flex-column justify-content-between">
                  <Card.Img
                    variant="top"
                    src={
                      item.poster_path
                        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                        : "https://via.placeholder.com/500x750?text=No+Image"
                    }
                    alt={item.title || item.name}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title className="text-center" style={{ fontSize: "1rem" }}>
                      {item.title || item.name}
                    </Card.Title>
                    <div className="text-center mt-2 d-flex justify-content-center gap-2 flex-wrap">
                      <Link
                        to={`/movie/${item.id}`}
                        className="btn btn-outline-light btn-sm"
                        onClick={() => handleWatchTrailer(item)}
                      >
                        Watch Trailer
                      </Link>
                      <button
                        onClick={() => handleAddToList(item)}
                        className="btn btn-outline-success btn-sm"
                      >
                        + My List
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
      
     <MobileFooter />
    </>
  );
};

export default SearchResults;
