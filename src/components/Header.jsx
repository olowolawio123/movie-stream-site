import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  NavDropdown,
  Image,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/th.jfif";
import defaultAvatar from "../assets/defaultAvatar.png";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { toast } from "react-toastify";

const Header = () => {
  const { user, userData, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  useEffect(() => {
    const fetchNotifications = async () => {
      if (!user) return;
      const ref = collection(db, "users", user.uid, "notifications");
      const snap = await getDocs(ref);
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotifications(data.filter((n) => !n.claimed));
    };

    fetchNotifications();
  }, [user]);

  const handleClaim = async (notifId) => {
    if (!user) return;
    try {
      await updateDoc(doc(db, "users", user.uid, "notifications", notifId), {
        claimed: true,
      });
      await updateDoc(doc(db, "users", user.uid), {
        points: increment(5),
      });
      setNotifications((prev) => prev.filter((note) => note.id !== notifId));
      toast.success("🎉 Reward claimed! 5 points added.");
    } catch (err) {
      console.error("Error claiming reward:", err);
      toast.error("Something went wrong while claiming.");
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (err) {
      toast.error("Logout failed");
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className="shadow-sm py-3">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={logo} alt="Netflix" height="30" width="100" className="d-inline-block align-top" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="m-auto">
            <Nav.Link href="/Home">Home</Nav.Link>
            <Nav.Link href="/tv">TV Shows</Nav.Link>
            <Nav.Link href="/movies">Movies</Nav.Link>
            <Nav.Link href="/recent">Recently Added</Nav.Link>
            <Nav.Link href="/MyListSection">My List</Nav.Link>
          </Nav>

          <Form className="d-flex me-3" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search movies..."
              className="me-2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-light" type="submit">Search</Button>
          </Form>

          <Nav className="align-items-center">
            <NavDropdown
              title={
                <div style={{ position: "relative" }}>
                  <i className="bi bi-bell-fill fs-5" />
                  {notifications.length > 0 && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-5px",
                        right: "-10px",
                        background: "red",
                        borderRadius: "50%",
                        color: "white",
                        padding: "5px 6px",
                        fontSize: "10px",
                      }}
                    >
                      {notifications.length}
                    </span>
                  )}
                </div>
              }
              id="user-bell-dropdown"
              align="end"
            >
              {notifications.length === 0 ? (
                <NavDropdown.Item>No rewards yet</NavDropdown.Item>
              ) : (
                notifications.map((note) => (
                  <NavDropdown.Item key={note.id} onClick={() => handleClaim(note.id)}>
                    {note.message} <span className="text-success">[Claim]</span>
                  </NavDropdown.Item>
                ))
              )}
            </NavDropdown>

            <NavDropdown
              title={
                <Image
                  src={userData?.image || defaultAvatar}
                  roundedCircle
                  width="30"
                  height="30"
                  alt="User"
                />
              }
              id="user-dropdown"
              align="end"
            >
              <NavDropdown.Item disabled>
                {userData?.username || user?.email}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/Profile">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
