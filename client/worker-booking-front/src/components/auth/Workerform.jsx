import { useState, useEffect } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import {
  notifysucess,
  notifyerror,
  getAuthHeaders,
  isAuthenticated,
} from "../../utils/util";

function Workerform() {
  const [form, setForm] = useState({
    category: "",
    experience: "",
    hourlyRate: "",
    location: "",
  });

  const Navigate = useNavigate();

  // Check authentication on component mount
  useEffect(() => {
    if (!isAuthenticated()) {
      notifyerror("Please login first");
      Navigate("/login");
    }
  }, [Navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const { category, experience, hourlyRate, location } = form;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category || !experience || !hourlyRate || !location) {
      return notifyerror("Please fill all the required fields");
    }

    try {
      const url =
        "https://urbanfix-backend-production.up.railway.app/workers/profile";
      const response = await fetch(url, {
        method: "POST",
        headers: getAuthHeaders(), // Automatically includes JWT token
        body: JSON.stringify({
          category,
          experience: Number(experience),
          hourlyRate: Number(hourlyRate),

          location,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        const successMessage =
          result?.message || "Worker profile created successfully";
        notifysucess(successMessage);
        setTimeout(() => {
          Navigate("/home");
        }, 1000);
        return;
      }

      const errorMessage = result?.message || "Failed to create worker profile";
      notifyerror(errorMessage);
    } catch (error) {
      notifyerror(error?.message || "Network error");
    }
  };

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "400px",
        margin: "auto",
        marginTop: "clamp(50px, 10vh, 100px)",
        borderRadius: "20px",
        padding: "clamp(10px, 2vw, 20px)",
      }}
    >
      <Card.Body style={{ padding: "clamp(20px, 4vw, 40px)" }}>
        <h3
          className="text-center mb-4"
          style={{ fontSize: "clamp(1.5rem, 5vw, 2rem)" }}
        >
          Worker Information
        </h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formGroupText">
            <Form.Label style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>
              Category
            </Form.Label>
            <Form.Select
              name="category"
              value={category}
              onChange={handleChange}
              aria-label="Select category"
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

          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>
              Experience (in years)
            </Form.Label>
            <Form.Control
              name="experience"
              type="number"
              placeholder="Enter experience in years"
              value={experience}
              onChange={handleChange}
              min="0"
              style={{
                fontSize: "clamp(0.9rem, 3vw, 1rem)",
                padding: "clamp(8px, 2vw, 12px)",
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>
              Hourly Rate (₹)
            </Form.Label>
            <Form.Control
              name="hourlyRate"
              type="number"
              placeholder="Enter hourly rate"
              value={hourlyRate}
              onChange={handleChange}
              min="0"
              style={{
                fontSize: "clamp(0.9rem, 3vw, 1rem)",
                padding: "clamp(8px, 2vw, 12px)",
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>
              Location
            </Form.Label>
            <Form.Select
              name="location"
              value={location}
              onChange={handleChange}
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
            <span>Already have worker profile ?</span>
            <Link to="/profile" style={{ marginLeft: "5px" }}>
              View Profile
            </Link>
          </Form.Group>
          <Form.Group className="mb-3"></Form.Group>

          <Button
            variant="dark"
            className="w-100"
            type="submit"
            style={{
              fontSize: "clamp(0.9rem, 3vw, 1rem)",
              padding: "clamp(8px, 2vw, 12px)",
            }}
          >
            Submit
          </Button>
        </Form>
        <ToastContainer />
      </Card.Body>
    </Card>
  );
}

export default Workerform;
