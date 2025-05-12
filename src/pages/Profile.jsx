// src/pages/Profile.jsx
import React from 'react';
import { Container, Tabs, Tab } from 'react-bootstrap';
import Header from '../components/Header';
import AboutSection from '../components/AboutSection';
import MyListSection from '../components/MyListSection';
import WatchingSection from '../components/WatchingSection';

const Profile = () => {
  return (
    <>
    <Header />
    <Container className="mt-4 vh-100 text-white">
      <Tabs defaultActiveKey="about" className="mt-4" fill>
        <Tab eventKey="about" title="About">
          <AboutSection />
        </Tab>
        <Tab eventKey="mylist" title="My List">
          <MyListSection />
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
