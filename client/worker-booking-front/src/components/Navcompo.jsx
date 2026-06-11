import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/images/logo.jpg";
import { useEffect, useState } from "react";
import { notifyerror, notifylogout } from "../utils/util";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Navcompo() {
  const categories = [
    "plumber",
    "electrician",
    "carpenter",
    "painter",
    "mechanic",
    "ac_repair",
  ];
  //input functions

  const navigate = useNavigate();
  const [input, setinput] = useState("");

  const handlesubmit = (e) => {
    e.preventDefault();
    if (categories.includes(input.toLowerCase())) {
      try {
        console.log(input);
        navigate(`/category/${encodeURIComponent(input)}`);
        setinput("");
      } catch (err) {
        notifyerror(err.message || "Search failed");
      }
    } else {
      notifyerror("Service not found");
    }
  };

  const [user, setUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (err) {
        console.error("Failed to parse user from localStorage", err);
        setUser(null);
      }
    }
    setLoggedInUser(localStorage.getItem("loggedinuser"));
  }, []);

  const handlelogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedinuser");
    localStorage.removeItem("user");

    setUser(null);
    setLoggedInUser("");

    setTimeout(() => {
      notifylogout("you have logged out !");
      navigate("/login");
    }, 1000);
  };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src={logo}
            alt="logo"
            style={{ height: "50px", width: "60px", borderRadius: "50%" }}
          />
          Urban Fix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link onClick={() => navigate("/home")}>Home</Nav.Link>
            <Nav.Link onClick={() => navigate("/about")}>About Us</Nav.Link>
            <Nav.Link onClick={() => navigate("/contact")}>Contact Us</Nav.Link>
            <NavDropdown title="More" id="navbarScrollingDropdown">
              {user?.role === "worker" && (
                <NavDropdown.Item onClick={() => navigate("/requests")}>
                  Requests
                </NavDropdown.Item>
              )}
              {user?.role === "customer" && (
                <NavDropdown.Item onClick={() => navigate("/bookings")}>
                  Bookings
                </NavDropdown.Item>
              )}

              <NavDropdown.Divider />
              <NavDropdown.Item onClick={() => navigate("/profile")}>
                Profile
              </NavDropdown.Item>
            </NavDropdown>
            {!user && (
              <Nav.Link
                onClick={() => navigate("/login")}
                style={{
                  backgroundColor: "#6367FF",
                  borderRadius: "10%",
                  width: "80px",
                  height: "10%",
                  textAlign: "center",
                  color: "#ffff",
                  cursor: "pointer",
                }}
              >
                Login
              </Nav.Link>
            )}
            {user && (
              <Nav.Link
                onClick={handlelogout}
                style={{
                  backgroundColor: "#6367FF",
                  borderRadius: "10%",
                  width: "80px",
                  height: "10%",
                  textAlign: "center",
                  color: "#ffff",
                  cursor: "pointer",
                }}
              >
                Logout
              </Nav.Link>
            )}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Enter service "
              className="me-2"
              aria-label="Search"
              value={input}
              onChange={(e) => {
                setinput(e.target.value);
              }}
            />
            <Button variant="outline-success" onClick={handlesubmit}>
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
      {<ToastContainer />}
    </Navbar>
  );
}

export default Navcompo;
