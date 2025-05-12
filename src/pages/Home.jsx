import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import Header from "../components/Header"

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;



const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
        );
        console.log("API KEY:", API_KEY);
        console.log("Fetched data:", response.data);
        setMovies(response.data.results || []);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
        setMovies([]); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

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
          
            // Inside your map loop
            <Col key={movie.id} xs={6} sm={4} md={3}>
              <Card bg="dark" text="white" className="h-100 shadow-sm d-flex flex-column justify-content-between">
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <Card.Body className="d-flex flex-column justify-content-between">
                  <Card.Title className="text-center" style={{ fontSize: "1rem" }}>
                    {movie.title}
                  </Card.Title>
                  <div className="text-center mt-2">
                    <Link to={`/movie/${movie.id}`} className="btn btn-outline-light btn-sm">
                      Watch Trailer
                    </Link>
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
