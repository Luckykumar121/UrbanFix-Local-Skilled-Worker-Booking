import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notifysucess, notifyerror } from "../../utils/util";

function SignupForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
    role: "customer",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const { name, email, contact, password, role } = form;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !contact || !role) {
      return notifyerror("Please fill all the fields");
    }
    try {
      const url = "/api/auth/register";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          //TODO: change this to form data when we have file upload in the form
          "content-type": "application/json",
        },
        body: JSON.stringify(form), //TODO: change this to form data when we have file upload in the form
      });

      const contentType = response.headers.get("content-type") || "";
      const result =
        contentType.includes("application/json") && response.status !== 204
          ? await response.json()
          : null;

      //   await Sendverificationcode(email,verificationcode);
      //   console.log("verification email sent");
      //   alert("verification email sent, please check your inbox !");

      //console.log("signup response", response.status, result);

      if (response.ok) {
        localStorage.setItem("role", role);
        const successMessage = result?.message || "Signup successful";
        notifysucess(successMessage);
        setTimeout(() => {
          navigate("/verify-email");
        }, 1000);
        return;
      }

      const errorMessage =
        result?.message ||
        result?.error ||
        "Signup failed. Please check your input and try again.";

      notifyerror(errorMessage);
    } catch (error) {
      notifyerror(error?.message || "Network error");
    }

    // TODO: replace console.log with actual signup API call.
    //console.log(form);
  };

  return (
    <Card
      style={{
        width: "100%",
        maxWidth: "400px",
        margin: "auto",

        marginTop: "clamp(10px, 10vh, 10px)",
        borderRadius: "20px",
        paddingTop: "clamp(10px, 2vw, 20px)",
      }}
    >
      <Card.Body style={{ padding: "clamp(20px, 4vw, 40px)" }}>
        <h3
          className="text-center mb-4"
          style={{ fontSize: "clamp(1.5rem, 5vw, 2rem)" }}
        >
          Signup
        </h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>
              Name
            </Form.Label>
            <Form.Control
              name="name"
              placeholder="Enter name"
              value={name}
              onChange={handleChange}
              style={{
                fontSize: "clamp(0.9rem, 3vw, 1rem)",
                padding: "clamp(8px, 2vw, 12px)",
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>
              Email
            </Form.Label>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={handleChange}
              style={{
                fontSize: "clamp(0.9rem, 3vw, 1rem)",
                padding: "clamp(8px, 2vw, 12px)",
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>
              Contact
            </Form.Label>
            <Form.Control
              name="contact"
              type="tel"
              minLength={10}
              maxLength={10}
              placeholder="Enter number"
              value={contact}
              onChange={handleChange}
              style={{
                fontSize: "clamp(0.9rem, 3vw, 1rem)",
                padding: "clamp(8px, 2vw, 12px)",
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>
              Password
            </Form.Label>
            <Form.Control
              name="password"
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handleChange}
              style={{
                fontSize: "clamp(0.9rem, 3vw, 1rem)",
                padding: "clamp(8px, 2vw, 12px)",
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>
              Role
            </Form.Label>
            <Form.Select
              name="role"
              value={role}
              onChange={handleChange}
              style={{
                fontSize: "clamp(0.9rem, 3vw, 1rem)",
                padding: "clamp(8px, 2vw, 12px)",
              }}
            >
              <option value="customer">Customer</option>
              <option value="worker">Worker</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>
          <Button
            variant="dark"
            className="w-100"
            type="submit"
            style={{
              fontSize: "clamp(0.9rem, 3vw, 1rem)",
              padding: "clamp(8px, 2vw, 12px)",
            }}
          >
            Signup
          </Button>
          <Form.Group className="mb-3 mt-3">
            <span
              style={{ fontSize: "clamp(0.8rem, 3vw, 0.9rem)" }}
              className="mb-3"
            >
              Already have account ?
            </span>
            <Link
              className="mb-3"
              to={"/login"}
              style={{
                fontSize: "clamp(0.8rem, 3vw, 0.9rem)",
                color: "#6366f1",
                textDecoration: "none",
              }}
            >
              login here
            </Link>
          </Form.Group>
        </Form>
        <ToastContainer />
      </Card.Body>
    </Card>
  );
}

export default SignupForm;
