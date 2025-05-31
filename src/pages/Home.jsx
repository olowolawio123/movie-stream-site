import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
        );
        setMovies(response.data.results || []);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleAddToList = async (movie) => {
    if (!user) {
      alert("Please log in to save to your list.");
      return;
    }

    try {
      const movieRef = doc(db, "users", user.uid, "myList", movie.id.toString());
      await setDoc(movieRef, {
        ...movie,
        addedAt: new Date(),
      });
      alert(`${movie.title} added to your list!`);
    } catch (error) {
      console.error("Error adding to list:", error);
      alert("Failed to add movie. Try again.");
    }
  };

  const handleWatchTrailer = async (movie) => {
    if (!user) return;

    try {
      // Save progress
      await setDoc(doc(db, "users", user.uid, "continueWatching", movie.id.toString()), {
        id: movie.id,
        title: movie.title || movie.name,
        poster_path: movie.poster_path,
        progress: 10,
        timestamp: Date.now()
      });

      // Add reward notification
      await setDoc(
        doc(db, "users", user.uid, "notifications", movie.id.toString()),
        {
          type: "reward",
          message: `You earned 5 points for watching "${movie.title || movie.name}"`,
          claimed: false,
          timestamp: Date.now(),
        }
      );

      console.log("✅ Trailer logged and reward added.");
    } catch (err) {
      console.error("Error handling trailer watch:", err);
    }
  };

  return (
    <>
      <Header />
      <Container className="mt-4 text-white">
        <h1 className="mb-3">Trending Movies</h1>

        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="light" />
          </div>
        ) : Array.isArray(movies) && movies.length > 0 ? (
          <Row className="g-4">
            {movies.map((movie) => (
              <Col key={movie.id} xs={6} sm={4} md={3}>
                <Card
                  bg="dark"
                  text="white"
                  className="h-100 shadow-sm d-flex flex-column justify-content-between"
                >
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title className="text-center" style={{ fontSize: "1rem" }}>
                      {movie.title}
                    </Card.Title>
                    <div className="text-center mt-2 d-flex justify-content-center gap-2 flex-wrap">
                      <Link
                        to={`/movie/${movie.id}`}
                        className="btn btn-outline-light btn-sm"
                        onClick={() => handleWatchTrailer(movie)}
                      >
                        Watch Trailer
                      </Link>

                      <button
                        onClick={() => handleAddToList(movie)}
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
        ) : (
          <p>No movies found.</p>
        )}
      </Container>
    </>
  );
};

export default Home;
