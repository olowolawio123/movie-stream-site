import React from "react";
import movies from "../movies"; // dummy data
import { Container, Row, Col, Card } from "react-bootstrap";
import Header from "../components/Header";


const Home = () => {

  return (
    <>
    <Header />
    <Container className="mt-4 text-white">
      <p>Enjoy your favorite movies and shows!</p>

      <h3 className="mt-5 mb-4">Trending Now</h3>
      <Row className="g-4">
        {movies.map((movie) => (
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
    </Container>
    </>
  );
};

export default Home;
