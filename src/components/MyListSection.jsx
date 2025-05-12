import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import movies from "../movies"; // dummy list from existing dummy data

const MyListSection = () => {
  // For demo, we pretend the user has added the first 4 movies to their list
  const myList = movies.slice(0, 4);

  return (
    <div className="mt-4">
      <h3 className="text-white mb-3">My List</h3>
      <Row className="g-4">
        {myList.map((movie) => (
          <Col key={movie.id} xs={6} sm={4} md={3}>
            <Card bg="dark" text="white" className="h-100 shadow-sm">
              <Card.Img variant="top" src={movie.posterUrl} alt={movie.title} />
              <Card.Body>
                <Card.Title className="text-center" style={{ fontSize: "1rem" }}>
                  {movie.title}
                </Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default MyListSection;
