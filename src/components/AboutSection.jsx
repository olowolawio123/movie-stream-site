import React from "react";
import { Card } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";

const AboutSection = () => {
  const { user, userData } = useAuth();

  return (
    <Card bg="dark" text="white" className="p-4">
      <h3>About You</h3>
      <p><strong>Name:</strong> {userData?.name || "N/A"}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Subscription:</strong> Premium (Dummy)</p>
      <p><strong>Joined:</strong> Jan 1, 2024 (Dummy)</p>
    </Card>
  );
};

export default AboutSection;
