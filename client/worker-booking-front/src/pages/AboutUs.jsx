import { Container, Row, Col, Card, Button } from "react-bootstrap";
import React, { use } from "react";

import Navcompo from "../components/Navcompo";
import about from "../assets/images/about.jpg";

import thumb from "../assets/icons/thumb.png";
import tool from "../assets/icons/tool.png";
import money from "../assets/icons/money.png";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function AboutUs() {
  const navigate = useNavigate();
  const handleemail = () => {
    navigate("https://mail.google.com");
  };

  return (
    <>
      <Navcompo />
      <div style={{ position: "relative" }}>
        <img
          src={about}
          style={{ width: "100%", height: "500px", objectFit: "cover" }}
          alt="About Us"
        />
        <motion.div
          style={{
            position: "absolute",
            top: "40%",
            left: "5%",
            transform: "translateY(-50%)",
            textAlign: "left",
            color: "white",
            width: "40%",

            padding: "0 20px",
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h1
            style={{ fontSize: "3rem", marginBottom: "20px" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            About Us
          </motion.h1>
          <motion.p
            style={{ fontSize: "1rem", marginBottom: "30px" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Connecting you with trusted local professionals quickly and easily
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          ></motion.div>
        </motion.div>
      </div>
      <Container className="my-5" fluid>
        <Row className="mb-4">
          <Col
            style={{
              display: "flex",
              textAlign: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <motion.span
              style={{
                color: "#667eea",
                fontWeight: "bold",
                fontSize: "1rem",
                textTransform: "uppercase",
                letterSpacing: "2px",
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Why Choose Us
            </motion.span>
            <motion.h2
              style={{
                fontWeight: "bold",
                fontSize: "2.5rem",
                color: "#333",
                marginTop: "10px",
              }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Introducing Our Best Features
            </motion.h2>
          </Col>
        </Row>
        <Row className="mb-4 g-4 justify-content-center">
          <Col md={4} sm={12} className="d-flex justify-content-center">
            <motion.div
              style={{ width: "100%" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card
                style={{
                  width: "100%",
                  border: "none",
                  borderRadius: "15px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  height: "100%",
                  overflow: "hidden",
                }}
                className="mb-4"
              >
                <Card.Img
                  variant="top"
                  src={thumb}
                  style={{
                    height: "80px",
                    width: "100%",
                    objectFit: "contain",
                    padding: "20px",
                    backgroundColor: "#f0f4ff",
                  }}
                />
                <Card.Body style={{ padding: "25px" }}>
                  <Card.Title
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#333",
                      marginBottom: "10px",
                    }}
                  >
                    Best Trusted Workers
                  </Card.Title>
                  <Card.Text
                    style={{
                      fontSize: "0.95rem",
                      color: "#666",
                      lineHeight: "1.6",
                    }}
                  >
                    We connect you with the most trusted and verified workers in
                    your area
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          <Col md={4} sm={12} className="d-flex justify-content-center">
            <motion.div
              style={{ width: "100%" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card
                style={{
                  width: "100%",
                  border: "none",
                  borderRadius: "15px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  height: "100%",
                  overflow: "hidden",
                }}
                className="mb-4"
              >
                <Card.Img
                  variant="top"
                  src={tool}
                  style={{
                    height: "80px",
                    width: "100%",
                    objectFit: "contain",
                    padding: "20px",
                    backgroundColor: "#fff5f0",
                  }}
                />
                <Card.Body style={{ padding: "25px" }}>
                  <Card.Title
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#333",
                      marginBottom: "10px",
                    }}
                  >
                    Wide Range of Services
                  </Card.Title>
                  <Card.Text
                    style={{
                      fontSize: "0.95rem",
                      color: "#666",
                      lineHeight: "1.6",
                    }}
                  >
                    From plumbing to electrical work, we offer a wide variety of
                    services
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          <Col md={4} sm={12} className="d-flex justify-content-center">
            <motion.div
              style={{ width: "100%" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card
                style={{
                  width: "100%",
                  border: "none",
                  borderRadius: "15px",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
                  height: "100%",
                  overflow: "hidden",
                }}
                className="mb-4"
              >
                <Card.Img
                  variant="top"
                  src={money}
                  style={{
                    height: "80px",
                    width: "100%",
                    objectFit: "contain",
                    padding: "20px",
                    backgroundColor: "#f0fff5",
                  }}
                />
                <Card.Body style={{ padding: "25px" }}>
                  <Card.Title
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#333",
                      marginBottom: "10px",
                    }}
                  >
                    Affordable Pricing
                  </Card.Title>
                  <Card.Text
                    style={{
                      fontSize: "0.95rem",
                      color: "#666",
                      lineHeight: "1.6",
                    }}
                  >
                    We offer competitive pricing to ensure you get the best
                    value for your money
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
      <Container className="my-5">
        <Row className="mb-5">
          <Col>
            <motion.div
              style={{ textAlign: "center", marginBottom: "20px" }}
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                Our Mission & Vision
              </h2>
              <p
                style={{ fontSize: "1.1rem", color: "#666", marginTop: "10px" }}
              >
                Driving innovation and excellence in service platform
              </p>
            </motion.div>
          </Col>
        </Row>

        <Row
          style={{ textAlign: "center", marginLeft: "10%" }}
          className="mb-5"
        >
          <Col md={6} sm={12} style={{ marginBottom: "20px" }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  borderRadius: "15px",
                  width: "100%",
                  height: "100%",
                  boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
                  overflow: "hidden",
                }}
                className="text-white"
              >
                <Card.Body style={{ padding: "40px 50px" }}>
                  <motion.div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "20px",
                      textAlign: "center",
                    }}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                  >
                    🎯
                  </motion.div>
                  <Card.Title
                    style={{
                      fontSize: "1.8rem",
                      marginBottom: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Our Mission
                  </Card.Title>
                  <Card.Text
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.6",
                      fontWeight: "500",
                    }}
                  >
                    To revolutionize the way people find and book reliable
                    service professionals. We're committed to making it easy,
                    transparent and easy
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col md={6} sm={12} style={{ marginBottom: "20px" }}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card
                style={{
                  background:
                    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  border: "none",
                  borderRadius: "15px",
                  width: "100%",
                  height: "100%",
                  boxShadow: "0 10px 30px rgba(245, 87, 108, 0.3)",
                  overflow: "hidden",
                }}
                className="text-white"
              >
                <Card.Body style={{ padding: "40px 25px" }}>
                  <motion.div
                    style={{
                      fontSize: "3rem",
                      marginBottom: "20px",
                      textAlign: "center",
                    }}
                    animate={{ rotate: [0, -5, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                  >
                    🌟
                  </motion.div>
                  <Card.Title
                    style={{
                      fontSize: "1.8rem",
                      marginBottom: "15px",
                      fontWeight: "bold",
                    }}
                  >
                    Our Vision
                  </Card.Title>
                  <Card.Text
                    style={{
                      fontSize: "1rem",
                      lineHeight: "1.6",
                      fontWeight: "500",
                    }}
                  >
                    To become the most trusted and widely-used platform
                    connecting customers with skilled professionals worldwide.
                    We envision a future where quality service is just a click
                    away
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <motion.div
              style={{ textAlign: "center", marginBottom: "40px" }}
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2
                style={{
                  fontSize: "2.5rem",
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom: "10px",
                }}
              >
                Our Services
              </h2>
              <p style={{ fontSize: "1.1rem", color: "#970cdd" }}>
                We offer a wide range of professional services to meet all your
                needs
              </p>
            </motion.div>
          </Col>
        </Row>

        <Row className="mb-5 g-5" style={{ paddingLeft: "40px" }}>
          <Col xs={12} sm={6} md={4} className="d-flex">
            <motion.div
              style={{ width: "100%" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card
                style={{
                  background:
                    "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                  width: "70%",
                  border: "none",
                  borderRadius: "15px",
                  boxShadow: "0 10px 30px rgba(79, 172, 254, 0.3)",
                  height: "100%",
                }}
                className="text-white"
              >
                <Card.Body style={{ padding: "30px", textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "15px" }}>
                    🚿
                  </div>
                  <Card.Title
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    Plumbing
                  </Card.Title>
                  <Card.Text style={{ fontSize: "0.95rem" }}>
                    Professional plumbing solutions for all your needs
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col xs={12} sm={6} md={4} className="d-flex">
            <motion.div
              style={{ width: "100%" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card
                style={{
                  background:
                    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
                  border: "none",
                  width: "70%",
                  borderRadius: "15px",
                  boxShadow: "0 10px 30px rgba(250, 112, 154, 0.3)",
                  height: "100%",
                }}
                className="text-white"
              >
                <Card.Body style={{ padding: "30px", textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "15px" }}>
                    ⚡
                  </div>
                  <Card.Title
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    Electrical
                  </Card.Title>
                  <Card.Text style={{ fontSize: "0.95rem" }}>
                    Expert electrical services and installations
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col xs={12} sm={6} md={4} className="d-flex">
            <motion.div
              style={{ width: "100%" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card
                style={{
                  background:
                    "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
                  border: "none",
                  width: "70%",
                  borderRadius: "15px",
                  boxShadow: "0 10px 30px rgba(168, 237, 234, 0.3)",
                  height: "100%",
                }}
                className="text-dark"
              >
                <Card.Body style={{ padding: "30px", textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "15px" }}>
                    🔨
                  </div>
                  <Card.Title
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: "bold",
                      marginBottom: "10px",
                      color: "#333",
                    }}
                  >
                    Carpentry
                  </Card.Title>
                  <Card.Text style={{ fontSize: "0.95rem", color: "#555" }}>
                    Quality carpentry and woodwork services
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col xs={12} sm={6} md={4} className="d-flex">
            <motion.div
              style={{ width: "100%" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card
                style={{
                  background:
                    "linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)",
                  border: "none",
                  width: "70%",
                  borderRadius: "15px",
                  boxShadow: "0 10px 30px rgba(255, 106, 136, 0.3)",
                  height: "100%",
                }}
                className="text-white"
              >
                <Card.Body style={{ padding: "30px", textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "15px" }}>
                    🎨
                  </div>
                  <Card.Title
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    Painting
                  </Card.Title>
                  <Card.Text style={{ fontSize: "0.95rem" }}>
                    Professional painting and decoration services
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col xs={12} sm={6} md={4} className="d-flex">
            <motion.div
              style={{ width: "100%" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  border: "none",
                  borderRadius: "15px",
                  width: "70%",
                  boxShadow: "0 10px 30px rgba(102, 126, 234, 0.3)",
                  height: "100%",
                }}
                className="text-white"
              >
                <Card.Body style={{ padding: "30px", textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "15px" }}>
                    🔧
                  </div>
                  <Card.Title
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    Mechanic
                  </Card.Title>
                  <Card.Text style={{ fontSize: "0.95rem" }}>
                    Trusted mechanical repair and maintenance
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>

          <Col xs={12} sm={6} md={4} className="d-flex">
            <motion.div
              style={{ width: "100%" }}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <Card
                style={{
                  background:
                    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  border: "none",
                  width: "70%",
                  borderRadius: "15px",
                  boxShadow: "0 10px 30px rgba(245, 87, 108, 0.3)",
                  height: "100%",
                }}
                className="text-white"
              >
                <Card.Body style={{ padding: "30px", textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "15px" }}>
                    ❄️
                  </div>
                  <Card.Title
                    style={{
                      fontSize: "1.4rem",
                      fontWeight: "bold",
                      marginBottom: "10px",
                    }}
                  >
                    AC Repair
                  </Card.Title>
                  <Card.Text style={{ fontSize: "0.95rem" }}>
                    Expert AC repair and maintenance services
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>

        <Row className="mb-5">
          <Col>
            <motion.h2
              style={{ textAlign: "center" }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Meet Our Team
            </motion.h2>
          </Col>
        </Row>
        <Row>
          <Col md={3} sm={6} xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card
                style={{
                  background:
                    "linear-gradient(135deg, #0586bd 0%, #8645cc 50%,#B3E8F7 100%)",
                  border: "none",
                  height: "40vh",
                  borderRadius: "15px",
                  boxShadow: "0 10px 30px rgba(239, 108, 223, 0.3)",
                }}
                className="text-center mb-4"
              >
                <Card.Body>
                  <Card.Title style={{ color: "#F08D39" }}>Lucky</Card.Title>
                  <Card.Subtitle style={{ color: "#FFF6C0" }} className="mb-2 ">
                    Project Member
                  </Card.Subtitle>
                  <Card.Text style={{ color: "#fff" }}>
                    The mastermind behind our platform's seamless functionality.
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card
                style={{
                  background:
                    "linear-gradient(135deg, #0586bd 0%, #8645cc 50%,#B3E8F7 100%)",
                  border: "none",
                  height: "40vh",
                  borderRadius: "15px",
                  boxShadow: "0 10px 30px rgba(239, 108, 223, 0.3)",
                }}
                className="text-center mb-4"
              >
                <Card.Body>
                  <Card.Title style={{ color: "#F08D39" }}>Himanshu</Card.Title>
                  <Card.Subtitle className="mb-2 " style={{ color: "#FFF6C0" }}>
                    Project Member
                  </Card.Subtitle>
                  <Card.Text style={{ color: "#fff" }}>
                    Ensuring smooth project execution and timely delivery with
                    his helping hand.
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Card
                style={{
                  background:
                    "linear-gradient(135deg, #0586bd 0%, #8645cc 50%,#B3E8F7 100%)",
                  border: "none",
                  height: "40vh",
                  borderRadius: "15px",
                  boxShadow: "0 10px 30px rgba(239, 108, 223, 0.3)",
                }}
                className="text-center mb-4"
              >
                <Card.Body>
                  <Card.Title style={{ color: "#F08D39" }}>Livesh</Card.Title>
                  <Card.Subtitle style={{ color: "#FFF6C0" }} className="mb-2 ">
                    Project Member
                  </Card.Subtitle>
                  <Card.Text style={{ color: "#fff" }}>
                    Driving innovation and ensuring user experience excellence
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
          <Col md={3} sm={6} xs={12}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Card
                style={{
                  background:
                    "linear-gradient(135deg, #0586bd 0%, #8645cc 50%,#B3E8F7 100%)",
                  border: "none",
                  height: "40vh",
                  borderRadius: "15px",
                  boxShadow: "0 10px 30px rgba(239, 108, 223, 0.3)",
                }}
                className="text-center mb-4"
              >
                <Card.Body>
                  <Card.Title style={{ color: "#F08D39" }}>Akash</Card.Title>
                  <Card.Subtitle className="mb-2 " style={{ color: "#FFF6C0" }}>
                    Project Member
                  </Card.Subtitle>
                  <Card.Text style={{ color: "#fff" }}>
                    Providing valuable support and assistance throughout the
                    project lifecycle.
                  </Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </>
  );
}

export default AboutUs;
