import React, { useEffect, useState, useCallback } from "react";
import { Container, ListGroup, Button, Spinner } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  increment,
} from "firebase/firestore";
import { toast } from "react-toastify";
import Header from "../components/Header";
import MobileFooter from "../components/MobileFooter";

const NotificationPage = () => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Stable function with useCallback
  const fetchNotifications = useCallback(async () => {
    if (!user) return;

    try {
      const ref = collection(db, "users", user.uid, "notifications");
      const snap = await getDocs(ref);
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setNotifications(data);
    } catch (err) {
      console.error("Error fetching notifications:", err);
      toast.error("Failed to fetch notifications.");
    } finally {
      setLoading(false);
    }
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

      setNotifications((prev) =>
        prev.map((n) => (n.id === notifId ? { ...n, claimed: true } : n))
      );

      toast.success("🎉 5 points claimed!");
    } catch (err) {
      console.error("Claim failed:", err);
      toast.error("Something went wrong.");
    }
  };

  // ✅ Now safe with no warnings
  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return (
    <>
      <Header />
      <Container className="mt-4 text-white">
        <h2>Your Notifications</h2>

        {loading ? (
          <div className="text-center mt-4">
            <Spinner animation="border" variant="light" />
          </div>
        ) : notifications.length === 0 ? (
          <p className="mt-3">No notifications yet.</p>
        ) : (
          <ListGroup variant="flush">
            {notifications.map((note) => (
              <ListGroup.Item
                key={note.id}
                className="bg-dark text-white d-flex justify-content-between align-items-center"
              >
                <span>{note.message}</span>
                {!note.claimed ? (
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleClaim(note.id)}
                  >
                    Claim +5
                  </Button>
                ) : (
                  <span className="text-success">Claimed</span>
                )}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Container>
      <MobileFooter />
    </>
  );
};

export default NotificationPage;
