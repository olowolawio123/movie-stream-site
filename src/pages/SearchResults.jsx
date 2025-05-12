import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import Header from "../components/Header"

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!query) return;

      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
        );
        setResults(response.data.results);
      } catch (error) {
        console.error("Search failed:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

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
              <Card bg="dark" text="white" className="h-100 shadow-sm">
                <Card.Img
                  variant="top"
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Image"
                  }
                  alt={item.title || item.name}
                />
                <Card.Body>
                  <Card.Title className="text-center" style={{ fontSize: "1rem" }}>
                    {item.title || item.name}
                  </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
    </>
  );
};

export default SearchResults;
