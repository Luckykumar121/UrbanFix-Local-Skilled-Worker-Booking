import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Alert,
  Row,
  Col,
  Spinner,
  Badge,
} from "react-bootstrap";
import { getAuthHeaders, isAuthenticated } from "../utils/util";
import { useNavigate } from "react-router-dom";

function Booking() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    const fetchBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/workers/bookings", {
          headers: getAuthHeaders(),
        });
        setBookings(res.data.bookings || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, [navigate]);

  if (loading) return <Spinner animation="border" />;

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="my-5" style={{ padding: "0 15px" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "clamp(1.5rem, 5vw, 2rem)",
          marginBottom: "2rem",
        }}
      >
        My Bookings
      </h2>
      {bookings.length === 0 ? (
        <Alert variant="info" style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>
          No bookings yet.
        </Alert>
      ) : (
        <Row className="g-3 g-md-4">
          {bookings.map((booking) => (
            <Col
              key={booking._id}
              xs={12}
              sm={6}
              lg={4}
              xl={3}
              className="d-flex justify-content-center"
            >
              <Card
                style={{
                  width: "100%",
                  maxWidth: "350px",
                  borderRadius: "15px",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
                  minHeight: "250px",
                }}
              >
                <Card.Body
                  style={{
                    padding: "clamp(15px, 3vw, 20px)",
                    textAlign: "center",
                  }}
                >
                  <Card.Title
                    style={{
                      fontSize: "clamp(1.1rem, 4vw, 1.25rem)",
                      color: "#333",
                      marginBottom: "15px",
                    }}
                  >
                    {booking.workerProfileId?.category}
                  </Card.Title>
                  <Card.Text
                    style={{
                      fontSize: "clamp(0.85rem, 3vw, 0.95rem)",
                      lineHeight: "1.6",
                      color: "#555",
                      textAlign: "left",
                    }}
                  >
                    <strong style={{ color: "#333" }}>
                      {booking.workerProfileId?.userId?.name}
                    </strong>
                    <br />
                    <strong>Experience:</strong>{" "}
                    {booking.workerProfileId?.experience} years
                    <br />
                    <strong>Hourly Rate:</strong> ₹
                    {booking.workerProfileId?.hourlyRate}
                    <br />
                    <strong>Location:</strong>{" "}
                    {booking.workerProfileId?.location}
                    <br />
                    <strong>Status:</strong>{" "}
                    <Badge
                      bg={
                        booking.status === "accepted"
                          ? "success"
                          : booking.status === "rejected"
                            ? "danger"
                            : "warning"
                      }
                      style={{ fontSize: "clamp(0.75rem, 2.5vw, 0.85rem)" }}
                    >
                      {booking.status}
                    </Badge>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Booking;
