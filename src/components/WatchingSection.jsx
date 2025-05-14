import React, { useEffect, useState } from "react";
import { Row, Col, Card, ProgressBar, Spinner } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";

const WatchingSection = () => {
  const { user } = useAuth();
  const [watching, setWatching] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadContinueWatching = async () => {
      if (!user) return;

      try {
        const colRef = collection(db, "users", user.uid, "continueWatching");
        const snapshot = await getDocs(colRef);
        const filtered = snapshot.docs
          .map(doc => doc.data())
          .filter(item => item.progress < 100);

        setWatching(filtered);
      } catch (error) {
        console.error("Failed to fetch continue watching:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContinueWatching();
  }, [user]);

  if (loading) {
    return (
      <div className="text-center text-white mt-4">
        <Spinner animation="border" variant="light" />
      </div>
    );
  }

  if (watching.length === 0) return null;

  return (
    <div className="mt-5">
      <h3 className="text-white mb-3">Continue Watching</h3>
      <Row className="g-4">
        {watching.map((movie) => (
          <Col key={movie.id} xs={12} sm={6} md={4}>
            <Card bg="dark" text="white" className="h-100 shadow-sm">
              <Card.Img
                variant="top"
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <Card.Body>
                <Card.Title style={{ fontSize: "1rem" }}>{movie.title}</Card.Title>
                <ProgressBar
                  now={movie.progress}
                  label={`${movie.progress}%`}
                  variant="danger"
                />
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default WatchingSection;
