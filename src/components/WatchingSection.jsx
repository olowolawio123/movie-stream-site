import React from "react";
import { Row, Col, Card, ProgressBar } from "react-bootstrap";
import movies from "../movies"; // dummy data

const WatchingSection = () => {
  // Simulate progress with the first few movies
  const continueWatching = [
    { ...movies[4], progress: 20 },
    { ...movies[5], progress: 60 },
    { ...movies[6], progress: 85 },
  ];

  return (
    <div className="mt-5">
      <h3 className="text-white mb-3">Continue Watching</h3>
      <Row className="g-4">
        {continueWatching.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4}>
            <Card bg="dark" text="white" className="h-100 shadow-sm">
              <Card.Img variant="top" src={movie.posterUrl} alt={movie.title} />
              <Card.Body>
                <Card.Title style={{ fontSize: "1rem" }}>{movie.title}</Card.Title>
                <ProgressBar now={movie.progress} label={`${movie.progress}%`} variant="danger" />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default WatchingSection;
