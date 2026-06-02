import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Tabs,
  Tab,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  notifysucess,
  notifyerror,
  getAuthHeaders,
  isAuthenticated,
} from "../utils/util";
import { ToastContainer } from "react-toastify";

function UserProfile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("account");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Account Info State
  const [accountInfo, setAccountInfo] = useState({
    name: "",
    email: "",
    contact: "",
    role: "",
  });

  // Worker Info State
  const [workerInfo, setWorkerInfo] = useState({
    category: "",
    experience: "",
    hourlyRate: "",
    location: "",
  });

  // Password State
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [editMode, setEditMode] = useState(false);

  // Fetch user and worker profile
  useEffect(() => {
    if (!isAuthenticated()) {
      notifyerror("Please login first");
      navigate("/login");
      return;
    }
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/auth/profile", {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setAccountInfo({
        name: data.user.name,
        email: data.user.email,
        contact: data.user.contact,
        role: data.user.role,
      });

      // Fetch worker profile if user is a worker
      if (data.user.role === "worker") {
        fetchWorkerProfile();
      }
    } catch (err) {
      setError(err.message);
      notifyerror(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchWorkerProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/workers/my-profile", {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setWorkerInfo({
          category: data.workerProfile.category,
          experience: data.workerProfile.experience,
          hourlyRate: data.workerProfile.hourlyRate,
          location: data.workerProfile.location,
        });
        setLoading(false);
      } else if (response.status === 404) {
        // Worker profile not found - profile may have been deleted
        setLoading(false);
        notifyerror("Worker profile not found. Please create a new profile.");
        navigate("/worker-form");
      } else {
        throw new Error("Failed to fetch worker profile");
      }
    } catch (err) {
      console.error("Could not fetch worker profile:", err);
      setLoading(false);
      // If error occurs, show message and redirect to worker form
      notifyerror("Error loading worker profile. Please create a new one.");
      navigate("/worker-form");
    }
  };

  // Handle Account Info Change
  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountInfo({ ...accountInfo, [name]: value });
  };

  // Handle Worker Info Change
  const handleWorkerChange = (e) => {
    const { name, value } = e.target;
    setWorkerInfo({ ...workerInfo, [name]: value });
  };

  // Handle Password Change
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
  };

  // Save Account Info
  const saveAccountInfo = async () => {
    try {
      setSaving(true);
      const response = await fetch(
        "http://localhost:5000/auth/update-profile",
        {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            name: accountInfo.name,
            contact: accountInfo.contact,
          }),
        },
      );

      const data = await response.json();
      if (response.ok) {
        notifysucess("Account updated successfully");
        setEditMode(false);
      } else {
        notifyerror(data.message || "Failed to update account");
      }
    } catch (err) {
      notifyerror(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Save Worker Info
  const saveWorkerInfo = async () => {
    if (
      !workerInfo.category ||
      !workerInfo.experience ||
      !workerInfo.hourlyRate ||
      !workerInfo.location
    ) {
      notifyerror("Please fill all required fields");
      return;
    }

    try {
      setSaving(true);
      const response = await fetch(
        "http://localhost:5000/workers/update-profile",
        {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            category: workerInfo.category,
            experience: Number(workerInfo.experience),
            hourlyRate: Number(workerInfo.hourlyRate),
            location: workerInfo.location,
          }),
        },
      );

      const data = await response.json();
      if (response.ok) {
        notifysucess("Worker profile updated successfully");
        setEditMode(false);
      } else {
        notifyerror(data.message || "Failed to update worker profile");
      }
    } catch (err) {
      notifyerror(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Change Password
  const changePassword = async () => {
    if (
      !passwordForm.currentPassword ||
      !passwordForm.newPassword ||
      !passwordForm.confirmPassword
    ) {
      notifyerror("Please fill all password fields");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      notifyerror("New passwords do not match");
      return;
    }

    try {
      setSaving(true);
      const response = await fetch(
        "http://localhost:5000/auth/change-password",
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            currentPassword: passwordForm.currentPassword,
            newPassword: passwordForm.newPassword,
          }),
        },
      );

      const data = await response.json();
      if (response.ok) {
        notifysucess("Password changed successfully");
        setPasswordForm({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        notifyerror(data.message || "Failed to change password");
      }
    } catch (err) {
      notifyerror(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status" />
        <p className="mt-2">Loading profile...</p>
      </Container>
    );
  }

  return (
    <Container
      className="my-5"
      style={{
        padding: "0 clamp(10px, 2vw, 20px)",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <Card
        style={{
          borderRadius: "15px",
          width: "100%",
          maxWidth: "100%",
          margin: "0 auto",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
        }}
      >
        <Card.Header
          style={{
            backgroundColor: "#2763bd",
            color: "white",
            borderRadius: "15px 15px 0 0",
            padding: "clamp(15px, 3vw, 20px)",
          }}
        >
          <h4
            className="mb-0"
            style={{ fontSize: "clamp(1.25rem, 4vw, 1.5rem)" }}
          >
            My Profile
          </h4>
        </Card.Header>

        <Card.Body style={{ padding: "clamp(20px, 4vw, 30px)" }}>
          {error && (
            <Alert
              variant="danger"
              style={{ fontSize: "clamp(0.85rem, 3vw, 0.95rem)" }}
            >
              {error}
            </Alert>
          )}

          <Tabs
            activeKey={activeTab}
            onSelect={(tab) => setActiveTab(tab)}
            className="mb-4"
            style={{ fontSize: "clamp(0.85rem, 3vw, 1rem)" }}
          >
            {/* Account Info Tab */}
            <Tab eventKey="account" title="Account Information">
              <div className="mt-4">
                <Row className="g-3 justify-content-center">
                  <Col xs={12} sm={10} md={6} lg={5} xl={4}>
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          fontSize: "clamp(0.9rem, 3vw, 1rem)",
                          fontWeight: "bold",
                        }}
                      >
                        Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={accountInfo.name}
                        onChange={handleAccountChange}
                        disabled={!editMode}
                        style={{
                          fontSize: "clamp(0.9rem, 3vw, 1rem)",
                          padding: "clamp(8px, 2vw, 12px)",
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={10} md={6} lg={5} xl={4}>
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          fontSize: "clamp(0.9rem, 3vw, 1rem)",
                          fontWeight: "bold",
                        }}
                      >
                        Email
                      </Form.Label>
                      <Form.Control
                        type="email"
                        value={accountInfo.email}
                        disabled
                        style={{
                          fontSize: "clamp(0.9rem, 3vw, 1rem)",
                          padding: "clamp(8px, 2vw, 12px)",
                        }}
                      />
                      <small
                        className="text-muted"
                        style={{ fontSize: "clamp(0.75rem, 2.5vw, 0.85rem)" }}
                      >
                        Email cannot be changed
                      </small>
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="g-3 justify-content-center">
                  <Col xs={12} sm={10} md={6} lg={5} xl={4}>
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          fontSize: "clamp(0.9rem, 3vw, 1rem)",
                          fontWeight: "bold",
                        }}
                      >
                        Contact
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="contact"
                        value={accountInfo.contact}
                        onChange={handleAccountChange}
                        disabled={!editMode}
                        maxLength="10"
                        style={{
                          fontSize: "clamp(0.9rem, 3vw, 1rem)",
                          padding: "clamp(8px, 2vw, 12px)",
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12} sm={10} md={6} lg={5} xl={4}>
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          fontSize: "clamp(0.9rem, 3vw, 1rem)",
                          fontWeight: "bold",
                        }}
                      >
                        Role
                      </Form.Label>
                      <Form.Control
                        type="text"
                        value={
                          accountInfo.role === "worker" ? "Worker" : "Customer"
                        }
                        disabled
                        style={{
                          fontSize: "clamp(0.9rem, 3vw, 1rem)",
                          padding: "clamp(8px, 2vw, 12px)",
                        }}
                      />
                      <small
                        className="text-muted"
                        style={{ fontSize: "clamp(0.75rem, 2.5vw, 0.85rem)" }}
                      >
                        Role cannot be changed
                      </small>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex gap-2 mt-4 flex-wrap justify-content-center justify-content-md-start">
                  {!editMode ? (
                    <Button
                      variant="primary"
                      onClick={() => setEditMode(true)}
                      style={{
                        fontSize: "clamp(0.9rem, 3vw, 1rem)",
                        padding: "clamp(8px, 2vw, 12px)",
                        minWidth: "120px",
                      }}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="success"
                        onClick={saveAccountInfo}
                        disabled={saving}
                        style={{
                          fontSize: "clamp(0.9rem, 3vw, 1rem)",
                          padding: "clamp(8px, 2vw, 12px)",
                          minWidth: "120px",
                        }}
                      >
                        {saving ? "Saving..." : "Save Changes"}
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setEditMode(false)}
                        style={{
                          fontSize: "clamp(0.9rem, 3vw, 1rem)",
                          padding: "clamp(8px, 2vw, 12px)",
                          minWidth: "80px",
                        }}
                      >
                        Cancel
                      </Button>
                    </>
                  )}
                  <Button
                    variant="secondary"
                    onClick={() => navigate("/home")}
                    style={{
                      fontSize: "clamp(0.9rem, 3vw, 1rem)",
                      padding: "clamp(8px, 2vw, 12px)",
                      minWidth: "100px",
                    }}
                  >
                    Go to Home
                  </Button>
                </div>
              </div>
            </Tab>

            {/* Worker Info Tab */}
            {accountInfo.role === "worker" && (
              <Tab eventKey="worker" title="Worker Information">
                <div className="mt-4">
                  <Row className="g-3 justify-content-center">
                    <Col xs={12} sm={10} md={6} lg={5} xl={4}>
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            fontSize: "clamp(0.9rem, 3vw, 1rem)",
                            fontWeight: "bold",
                          }}
                        >
                          Category *
                        </Form.Label>
                        <Form.Select
                          name="category"
                          value={workerInfo.category}
                          onChange={handleWorkerChange}
                          disabled={!editMode}
                          style={{
                            fontSize: "clamp(0.9rem, 3vw, 1rem)",
                            padding: "clamp(8px, 2vw, 12px)",
                          }}
                        >
                          <option value="">Select category</option>
                          <option value="plumber">Plumber</option>
                          <option value="electrician">Electrician</option>
                          <option value="carpenter">Carpenter</option>
                          <option value="painter">Painter</option>
                          <option value="mechanic">Mechanic</option>
                          <option value="ac_repair">AC Repair</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col xs={12} sm={10} md={6} lg={5} xl={4}>
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            fontSize: "clamp(0.9rem, 3vw, 1rem)",
                            fontWeight: "bold",
                          }}
                        >
                          Experience (years) *
                        </Form.Label>
                        <Form.Control
                          type="number"
                          name="experience"
                          value={workerInfo.experience}
                          onChange={handleWorkerChange}
                          disabled={!editMode}
                          min="0"
                          style={{
                            fontSize: "clamp(0.9rem, 3vw, 1rem)",
                            padding: "clamp(8px, 2vw, 12px)",
                          }}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="g-3 justify-content-center">
                    <Col xs={12} sm={10} md={6} lg={5} xl={4}>
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            fontSize: "clamp(0.9rem, 3vw, 1rem)",
                            fontWeight: "bold",
                          }}
                        >
                          Hourly Rate (₹) *
                        </Form.Label>
                        <Form.Control
                          type="number"
                          name="hourlyRate"
                          value={workerInfo.hourlyRate}
                          onChange={handleWorkerChange}
                          disabled={!editMode}
                          min="0"
                          style={{
                            fontSize: "clamp(0.9rem, 3vw, 1rem)",
                            padding: "clamp(8px, 2vw, 12px)",
                          }}
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={12} sm={10} md={6} lg={5} xl={4}>
                      <Form.Group className="mb-3">
                        <Form.Label
                          style={{
                            fontSize: "clamp(0.9rem, 3vw, 1rem)",
                            fontWeight: "bold",
                          }}
                        >
                          Location *
                        </Form.Label>
                        <Form.Select
                          name="location"
                          value={workerInfo.location}
                          onChange={handleWorkerChange}
                          disabled={!editMode}
                          style={{
                            fontSize: "clamp(0.9rem, 3vw, 1rem)",
                            padding: "clamp(8px, 2vw, 12px)",
                          }}
                        >
                          <option value="">Select location</option>
                          <option value="Badhi">Badhi</option>
                          <option value="Ranipur">Ranipur</option>
                          <option value="Ramgarh">Ramgarh</option>
                          <option value="Roshanpur">Roshanpur</option>
                          <option value="Aghyana">Aghyana</option>
                          <option value="Dholamajara">Dholamajara</option>
                          <option value="Tighri">Tighri</option>
                          <option value="Naharmajara">Naharmajara</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <div className="d-flex gap-2 mt-4 flex-wrap justify-content-center justify-content-md-start">
                    {!editMode ? (
                      <Button
                        variant="primary"
                        onClick={() => setEditMode(true)}
                        style={{
                          fontSize: "clamp(0.9rem, 3vw, 1rem)",
                          padding: "clamp(8px, 2vw, 12px)",
                          minWidth: "120px",
                        }}
                      >
                        Edit Details
                      </Button>
                    ) : (
                      <>
                        <Button
                          variant="success"
                          onClick={saveWorkerInfo}
                          disabled={saving}
                          style={{
                            fontSize: "clamp(0.9rem, 3vw, 1rem)",
                            padding: "clamp(8px, 2vw, 12px)",
                            minWidth: "120px",
                          }}
                        >
                          {saving ? "Saving..." : "Save Changes"}
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setEditMode(false)}
                          style={{
                            fontSize: "clamp(0.9rem, 3vw, 1rem)",
                            padding: "clamp(8px, 2vw, 12px)",
                            minWidth: "80px",
                          }}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Tab>
            )}

            {/* Security Tab */}
            <Tab eventKey="security" title="Security">
              <div className="mt-4">
                <h5
                  className="mb-4 text-center"
                  style={{ fontSize: "clamp(1.1rem, 4vw, 1.25rem)" }}
                >
                  Change Password
                </h5>

                <Row className="g-3 justify-content-center">
                  <Col xs={12} sm={10} md={8} lg={6} xl={5}>
                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          fontSize: "clamp(0.9rem, 3vw, 1rem)",
                          fontWeight: "bold",
                        }}
                      >
                        Current Password *
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter your current password"
                        style={{
                          fontSize: "clamp(0.9rem, 3vw, 1rem)",
                          padding: "clamp(8px, 2vw, 12px)",
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-3">
                      <Form.Label
                        style={{
                          fontSize: "clamp(0.9rem, 3vw, 1rem)",
                          fontWeight: "bold",
                        }}
                      >
                        New Password *
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        placeholder="Enter new password"
                        style={{
                          fontSize: "clamp(0.9rem, 3vw, 1rem)",
                          padding: "clamp(8px, 2vw, 12px)",
                        }}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label
                        style={{
                          fontSize: "clamp(0.9rem, 3vw, 1rem)",
                          fontWeight: "bold",
                        }}
                      >
                        Confirm New Password *
                      </Form.Label>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        placeholder="Confirm new password"
                        style={{
                          fontSize: "clamp(0.9rem, 3vw, 1rem)",
                          padding: "clamp(8px, 2vw, 12px)",
                        }}
                      />
                    </Form.Group>

                    <div className="d-flex justify-content-center">
                      <Button
                        variant="danger"
                        onClick={changePassword}
                        disabled={saving}
                        style={{
                          fontSize: "clamp(0.9rem, 3vw, 1rem)",
                          padding: "clamp(8px, 2vw, 12px)",
                          minWidth: "150px",
                        }}
                      >
                        {saving ? "Updating..." : "Change Password"}
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Tab>
          </Tabs>
        </Card.Body>
      </Card>

      <ToastContainer />
    </Container>
  );
}

export default UserProfile;
