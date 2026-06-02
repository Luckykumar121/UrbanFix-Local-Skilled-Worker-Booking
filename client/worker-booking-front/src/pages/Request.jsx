import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Button,
  Alert,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";
import { getAuthHeaders, isAuthenticated } from "../utils/util";
import { useNavigate } from "react-router-dom";

function Request() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    const storedRole = localStorage.getItem("role") || "";
    setUserRole(storedRole);

    const fetchRequests = async () => {
      try {
        let url = "";
        if (storedRole === "worker") {
          url = "http://localhost:5000/workers/requests";
        } else if (storedRole === "customer") {
          url = "http://localhost:5000/workers/bookings";
        } else if (storedRole === "admin") {
          url = "http://localhost:5000/admin/requests";
        } else {
          throw new Error("Unsupported user role for requests page.");
        }

        const res = await axios.get(url, {
          headers: getAuthHeaders(),
        });

        setRequests(
          res.data.requests || res.data.bookings || res.data.data || [],
        );
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load requests",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();

    // Set up polling to check for request status updates every 5 seconds
    const pollInterval = setInterval(fetchRequests, 5000);

    return () => clearInterval(pollInterval);
  }, [navigate]);

  const handleStatusChange = async (requestId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/workers/requests/${requestId}`,
        { status },
        { headers: getAuthHeaders() },
      );
      setRequests((prev) =>
        prev.map((req) => (req._id === requestId ? { ...req, status } : req)),
      );
    } catch (err) {
      setError("Failed to update request status");
    }
  };

  if (loading) return <Spinner animation="border" />;

  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="my-5" style={{ padding: "0 15px" }}>
      <h2
        style={{ fontSize: "clamp(1.5rem, 5vw, 2rem)", marginBottom: "2rem" }}
      >
        Incoming Booking Requests
      </h2>
      {requests.length === 0 ? (
        <Alert variant="info" style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>
          No requests yet.
        </Alert>
      ) : (
        <Row className="g-3 g-md-4">
          {requests.map((req) => (
            <Col
              key={req._id}
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
                  minHeight: "280px",
                }}
              >
                <Card.Body style={{ padding: "clamp(15px, 3vw, 20px)" }}>
                  <Card.Title
                    style={{
                      fontSize: "clamp(1.1rem, 4vw, 1.25rem)",
                      color: "#6366f1",
                      marginBottom: "15px",
                      textAlign: "center",
                    }}
                  >
                    Request from {req.customerId?.name}
                  </Card.Title>
                  <Card.Text
                    style={{
                      fontSize: "clamp(0.85rem, 3vw, 0.95rem)",
                      lineHeight: "1.6",
                      color: "#555",
                    }}
                  >
                    <strong style={{ color: "#333" }}>Email:</strong>{" "}
                    {req.customerId?.email}
                    <br />
                    <strong style={{ color: "#333" }}>Contact:</strong>{" "}
                    {req.customerId?.contact}
                    <br />
                    <strong style={{ color: "#333" }}>Status:</strong>{" "}
                    {req.status}
                  </Card.Text>
                  {userRole === "worker" && req.status === "pending" && (
                    <div
                      style={{
                        display: "flex",
                        gap: "clamp(5px, 2vw, 10px)",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        marginTop: "15px",
                      }}
                    >
                      <Button
                        variant="success"
                        onClick={() => handleStatusChange(req._id, "accepted")}
                        style={{
                          fontSize: "clamp(0.8rem, 3vw, 0.9rem)",
                          padding:
                            "clamp(6px, 2vw, 8px) clamp(12px, 3vw, 16px)",
                          flex: "1",
                          minWidth: "80px",
                        }}
                      >
                        Accept
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => handleStatusChange(req._id, "rejected")}
                        style={{
                          fontSize: "clamp(0.8rem, 3vw, 0.9rem)",
                          padding:
                            "clamp(6px, 2vw, 8px) clamp(12px, 3vw, 16px)",
                          flex: "1",
                          minWidth: "80px",
                        }}
                      >
                        Reject
                      </Button>
                    </div>
                  )}
                  {userRole === "worker" && req.status === "accepted" && (
                    <div
                      style={{
                        display: "flex",
                        gap: "clamp(5px, 2vw, 10px)",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        marginTop: "15px",
                      }}
                    >
                      <Button
                        variant="info"
                        onClick={() => handleStatusChange(req._id, "completed")}
                        style={{
                          fontSize: "clamp(0.8rem, 3vw, 0.9rem)",
                          padding:
                            "clamp(6px, 2vw, 8px) clamp(12px, 3vw, 16px)",
                          flex: "1",
                          minWidth: "100px",
                        }}
                      >
                        Completed
                      </Button>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default Request;
