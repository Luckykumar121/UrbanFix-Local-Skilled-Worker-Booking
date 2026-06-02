import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Card,
  Spinner,
  Alert,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { motion } from "framer-motion";
import { getAuthHeaders } from "../utils/util";

function Fetchworkers({ category = null, limit = null }) {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // Track booking request status for each worker
  const [requestedWorkers, setRequestedWorkers] = useState({});

  // Get logged-in user info from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const handlereq = async (workerId) => {
    if (!user) {
      return setError("Please log in before sending a request.");
    }

    setRequestedWorkers((prev) => ({
      ...prev,
      [workerId]: "loading",
    }));

    try {
      await axios.post(
        "http://localhost:5000/workers/requests",
        { workerId },
        { headers: getAuthHeaders() },
      );

      setRequestedWorkers((prev) => ({
        ...prev,
        [workerId]: "pending",
      }));
    } catch (err) {
      console.error("Booking request error:", err);
      setError(err.response?.data?.message || "Failed to send booking request");
      setRequestedWorkers((prev) => ({
        ...prev,
        [workerId]: undefined,
      }));
    }
  };

  const getButtonText = (workerId) => {
    const status = requestedWorkers[workerId];
    if (status === "loading") return "Booking...";
    if (status === "pending") return "Requested";
    if (status === "accepted") return "Working...";
    if (status === "completed") return "Book";
    return "Book";
  };

  const getButtonDisabled = (workerId) => {
    const status = requestedWorkers[workerId];
    return status === "loading" || status === "accepted";
  };

  // Function to fetch customer bookings and update status
  const fetchCustomerBookings = async () => {
    if (!user) return;

    try {
      const bookingsRes = await axios.get(
        "http://localhost:5000/workers/bookings",
        { headers: getAuthHeaders() },
      );
      const bookings = bookingsRes.data.bookings || [];

      // Create a map of worker profile ID to status
      const statusMap = {};
      bookings.forEach((booking) => {
        statusMap[booking.workerProfileId._id] = booking.status;
      });

      // Update requestedWorkers with the current statuses
      setRequestedWorkers(statusMap);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };
  useEffect(() => {
    const fetchWorkers = async () => {
      //   console.log("Fetching workers for category:", category);
      setLoading(true);
      setError("");
      try {
        let url = "http://localhost:5000/workers/list";
        const params = new URLSearchParams();
        if (category) params.append("category", category);
        if (limit) params.append("limit", limit);
        if (params.toString()) url += `?${params.toString()}`;

        // console.log("API URL:", url);
        const res = await axios.get(url);
        console.log("API Response:", res.data);
        setWorkers(res.data.workers || []);

        // Fetch customer's bookings to check status
        if (user) {
          await fetchCustomerBookings();
        }
      } catch (err) {
        console.error("API Error:", err);
        setError(
          err.response?.data?.message ||
            err.message ||
            "Failed to load workers",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchWorkers();

    // Set up polling to check for booking status updates every 10 seconds
    const pollInterval = setInterval(() => {
      if (user) {
        fetchCustomerBookings();
      }
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(pollInterval);
  }, [category, limit]);

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status" />
        <p className="mt-2">Loading workers...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (workers.length === 0) {
    return (
      <Container className="my-5">
        <Alert variant="info">No workers found.</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.4 }}
      >
        <h3 className="mb-4">
          {category ? `${category}s` : "All Workers by Category"}
        </h3>
        {category ? (
          // Single category view
          <Row>
            {workers.map((worker) => (
              <Col key={worker._id} md={4} className="mb-4">
                <Card
                  style={{ width: "70%", textAlign: "center", margin: "auto" }}
                >
                  <Card.Body>
                    <strong style={{ textAlign: "center" }}>
                      {worker.userId?.name || "Unknown"}
                    </strong>
                    <br />
                    <Card.Title>{worker.category}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      📍 {worker.location}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Experience:</strong> {worker.experience}
                      <br />
                      <strong>Hourly Rate:</strong> {worker.hourlyRate}rs
                      <br />
                      <br />
                      <strong>Contact:</strong>{" "}
                      {worker.userId?.contact || "N/A"}
                      <br />
                      <strong>Email:</strong> {worker.userId?.email || "N/A"}
                    </Card.Text>
                    <Button
                      variant="primary"
                      style={{ width: "60%" }}
                      onClick={() => handlereq(worker._id)}
                      disabled={getButtonDisabled(worker._id)}
                    >
                      {getButtonText(worker._id)}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          // Grouped by category view
          <>
            {Object.entries(
              workers.reduce((acc, worker) => {
                if (!acc[worker.category]) acc[worker.category] = [];
                acc[worker.category].push(worker);
                return acc;
              }, {}),
            ).map(([cat, catWorkers]) => (
              <div key={cat} className="mb-5">
                <h4 className="text-primary mb-3">
                  {cat} ({catWorkers.length} workers)
                </h4>
                <Row>
                  {catWorkers.map((worker) => (
                    <Col key={worker._id} md={4} className="mb-4">
                      <Card>
                        <Card.Body>
                          <Card.Title>{worker.category}</Card.Title>
                          <Card.Subtitle className="mb-2 text-muted">
                            📍 {worker.location}
                          </Card.Subtitle>
                          <Card.Text>
                            <strong>Experience:</strong> {worker.experience}
                            <br />
                            <strong>Hourly Rate:</strong> ${worker.hourlyRate}
                            <br />
                            <strong>Contact:</strong>{" "}
                            {worker.userId?.contact || "N/A"}
                            <br />
                            <strong>Email:</strong>{" "}
                            {worker.userId?.email || "N/A"}
                          </Card.Text>
                          <Button
                            variant="primary"
                            style={{ width: "60%" }}
                            onClick={() => handlereq(worker._id)}
                            disabled={getButtonDisabled(worker._id)}
                          >
                            {getButtonText(worker._id)}
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>
            ))}
          </>
        )}
      </motion.div>
    </Container>
  );
}

export default Fetchworkers;
