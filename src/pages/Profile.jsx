// src/pages/Profile.jsx
import React, { useEffect, useState } from 'react';
import { Container, Tabs, Tab, Card, Spinner } from 'react-bootstrap';
import Header from '../components/Header';
import AboutSection from '../components/AboutSection';
import MyListSection from '../components/MyListSection';
import WatchingSection from '../components/WatchingSection';
import { useAuth } from '../context/AuthContext';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

const Profile = () => {
  const { user } = useAuth();
  const [points, setPoints] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoints = async () => {
      if (!user) return;
      try {
        const docRef = doc(db, 'users', user.uid);
        const snapshot = await getDoc(docRef);
        if (snapshot.exists()) {
          setPoints(snapshot.data().points || 0);
        }
      } catch (err) {
        console.error("Failed to load points:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPoints();
  }, [user]);

  return (
    <>
      <Header />
      <Container className="mt-4 text-white">
        {loading ? (
          <div className="text-center text-white">
            <Spinner animation="border" variant="light" />
          </div>
        ) : (
          <Card bg="dark" text="white" className="mb-4 shadow-sm text-center">
            <Card.Body>
              <h5 className="mb-0">🎯 Your Current Points: <strong>{points}</strong></h5>
            </Card.Body>
          </Card>
        )}

        <Tabs defaultActiveKey="about" className="mt-4" fill>
          <Tab eventKey="about" title="About">
            <AboutSection />
          </Tab>
          <Tab eventKey="mylist" title="My List">
            <MyListSection showHeader={false} />
          </Tab>
          <Tab eventKey="watching" title="Continue Watching">
            <WatchingSection />
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};

export default Profile;
