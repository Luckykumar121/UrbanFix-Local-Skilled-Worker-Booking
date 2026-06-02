import { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notifyerror, notifysucess } from "../../utils/util";

function LoginForm() {
  const [login, setlogin] = useState({
    email: "",
    password: "",
  });

  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = login;
    if (!email || !password) {
      return notifyerror("Please fill all the fields");
    }

    try {
      const url = "/api/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(login),
      });

      const contentType = response.headers.get("content-type") || "";
      const result =
        contentType.includes("application/json") && response.status !== 204
          ? await response.json()
          : null;

      //

      //console.log("Login response", response.status, result);

      if (response.ok) {
        const successMessage = result?.message || "Login successful";
        const { jwttoken, user } = result;
        localStorage.setItem("token", jwttoken);
        localStorage.setItem("loggedinuser", user.name);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", user.role);
        notifysucess(successMessage);
        setTimeout(() => {
          if (user.role === "worker") {
            Navigate("/worker-form");
          } else if (user.role === "customer") {
            Navigate("/home");
          } else if (user.role === "admin") {
            Navigate("/admin");
          } else {
            Navigate("/home");
          }
        }, 1000);
        return;
      }

      const errorMessage =
        result?.message ||
        result?.error?.message ||
        result?.error?.details?.[0]?.message ||
        result?.error ||
        response.statusText ||
        "Something went wrong";

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
          Login
        </h3>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label style={{ fontSize: "clamp(0.9rem, 3vw, 1rem)" }}>
              Email
            </Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={login.email}
              onChange={(e) => setlogin({ ...login, email: e.target.value })}
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
              type="password"
              placeholder="Enter password"
              value={login.password}
              onChange={(e) => setlogin({ ...login, password: e.target.value })}
              style={{
                fontSize: "clamp(0.9rem, 3vw, 1rem)",
                padding: "clamp(8px, 2vw, 12px)",
              }}
            />
          </Form.Group>

          <Button
            variant="dark"
            type="submit"
            className="w-100"
            style={{
              fontSize: "clamp(0.9rem, 3vw, 1rem)",
              padding: "clamp(8px, 2vw, 12px)",
            }}
          >
            Login
          </Button>
          <Form.Group className="mb-3 mt-3">
            <span style={{ fontSize: "clamp(0.8rem, 3vw, 0.9rem)" }}>
              if you don't have account{" "}
            </span>
            <Link
              className="mb-3"
              to={"/register"}
              style={{
                fontSize: "clamp(0.8rem, 3vw, 0.9rem)",
                color: "#6366f1",
                textDecoration: "none",
              }}
            >
              Sign up
            </Link>
          </Form.Group>
        </Form>
        <ToastContainer />
      </Card.Body>
    </Card>
  );
}

export default LoginForm;
