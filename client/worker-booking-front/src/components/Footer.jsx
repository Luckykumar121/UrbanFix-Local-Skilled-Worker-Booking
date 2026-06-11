import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

function Footer() {
  return (
    <footer
      style={{
        background: "#111",
        color: "#fff",
        padding: "40px 0",
        marginTop: "50px",
      }}
    >
      <Container>
        <Row>
          {/* Logo / About */}
          <Col md={3}>
            <h4>Urban Fix</h4>
            <p>
              Book trusted local workers easily for all your home service needs.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={3}>
            <h5>Quick Links</h5>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Link
                to={"/home"}
                reloadDocument
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Home
              </Link>
              <Link
                to={"/about"}
                reloadDocument
                style={{ color: "#fff", textDecoration: "none" }}
              >
                About Us
              </Link>
              <Link
                to={"/home"}
                reloadDocument
                style={{ color: "#fff", textDecoration: "none" }}
              >
                {" "}
                Services
              </Link>
              <Link
                to={"/about"}
                reloadDocument
                style={{ color: "#fff", textDecoration: "none" }}
              >
                Contact US
              </Link>
            </ul>
          </Col>

          {/* Services */}
          <Col md={3}>
            <h5>Services</h5>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>Plumber</li>
              <li>Electrician</li>
              <li>Carpenter</li>
              <li>Painter</li>
            </ul>
          </Col>

          {/* Contact */}
          <Col md={3}>
            <h5>Contact</h5>
            <p>Email: supporturbanfix@gmail.com</p>
            <p>Phone: +91 9027754499</p>
          </Col>
        </Row>

        {/* Bottom */}
        <Row className="mt-4">
          <Col className="text-center">
            <p style={{ borderTop: "1px solid #444", paddingTop: "10px" }}>
              © 2026 Urban Fix All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
