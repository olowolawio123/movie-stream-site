import React, { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Card, } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { updateProfile, sendPasswordResetEmail } from "firebase/auth";
import { auth, storage } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { toast } from "react-toastify";
import MobileFooter from "../components/MobileFooter";


const SettingsPage = () => {
  const { user, logout } = useAuth();
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [profileImage, setProfileImage] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.toggle("bg-dark", darkMode);
    document.body.classList.toggle("text-white", darkMode);
  }, [darkMode]);

  const handleSave = async () => {
    setLoading(true);
    try {
      let photoURL = user?.photoURL;

      if (profileImage) {
        const storageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(storageRef, profileImage);
        photoURL = await getDownloadURL(storageRef);
      }

      await updateProfile(auth.currentUser, { displayName, photoURL });
      toast.success("Profile updated!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    }
    setLoading(false);
  };

  const handlePasswordReset = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.success("Password reset email sent.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send reset email.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/Login");
    } catch (err) {
      console.error("Logout failed", err);
      toast.error("Logout failed");
    }
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <>
      <Header />
      <Container className="mt-5 text-white vh-100">
        <Row className="justify-content-center">
          <Col md={6}>
            <Card bg="dark" text="white" className="shadow">
              <Card.Body>
                <Card.Title>Settings</Card.Title>

                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={user?.email || ""} disabled />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Display Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="Enter display name"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Upload Profile Picture</Form.Label>
                    <Form.Control
                      type="file"
                      accept="image/*"
                      onChange={(e) => setProfileImage(e.target.files[0])}
                    />
                  </Form.Group>

                  {profileImage && (
                    <img
                      src={URL.createObjectURL(profileImage)}
                      alt="Preview"
                      className="mb-3 rounded"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                    />
                  )}

                  <Button
                    variant="light"
                    onClick={handleSave}
                    className="mb-3 w-100"
                    disabled={loading}
                  >
                    {loading ? "Saving..." : "Save Changes"}
                  </Button>

                  <Button
                    variant="outline-warning"
                    onClick={handlePasswordReset}
                    className="mb-3 w-100"
                  >
                    Send Password Reset Email
                  </Button>

                  <Form.Check
                    type="switch"
                    id="dark-mode-switch"
                    label="Enable Dark Mode"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                    className="mb-3"
                  />

                  <Button variant="danger" onClick={handleLogout} className="w-100">
                    Logout
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
     
      <MobileFooter />
    </>
  );
};

export default SettingsPage;
