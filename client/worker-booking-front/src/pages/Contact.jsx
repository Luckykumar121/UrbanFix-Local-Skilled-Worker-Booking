import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Accordion,
} from "react-bootstrap";
import { motion } from "framer-motion";
import Navcompo from "../components/Navcompo";
import Footer from "../components/Footer";
import { notifysucess, notifyerror } from "../utils/util";
import { ToastContainer } from "react-toastify";
import contactBg from "../assets/images/about.jpg";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      notifyerror("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      // Backend endpoint to send email
      const response = await fetch("http://localhost:5000/contact/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        notifysucess("Message sent successfully! We'll get back to you soon.");
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "General Inquiry",
          message: "",
        });
      } else {
        notifyerror(data.message || "Failed to send message");
      }
    } catch (error) {
      notifyerror("Error sending message: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: "📧",
      title: "Email",
      detail: "supporturbanfix@gmail.com",
      description: "We reply within 24 hours",
    },
    {
      icon: "📞",
      title: "Phone",
      detail: "+91 9027 754 499",
      description: "Mon-Fri, 9AM-6PM IST",
    },
    {
      icon: "📍",
      title: "Address",
      detail: "Nakur, Badhi",
      description: "Saharanpur, Uttar Pradesh 247342",
    },
    {
      icon: "⏰",
      title: "Support Hours",
      detail: "9:00 AM - 6:00 PM",
      description: "Monday to Saturday",
    },
  ];

  const faqs = [
    {
      question: "How long does it take to get a worker?",
      answer:
        "Typically, we connect you with a worker within 2-4 hours. However, during peak hours, it may take up to 24 hours depending on availability and your location.",
    },
    {
      question: "How are workers verified?",
      answer:
        "All workers on our platform go through a rigorous verification process including background checks, skill verification, and customer reviews.",
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer:
        "If you're not satisfied with the service, you can report it through your dashboard within 24 hours. We have a dispute resolution team that handles such cases.",
    },
    {
      question: "How do I cancel a booking?",
      answer:
        "You can cancel a booking up to 2 hours before the scheduled time without any penalty. Cancellations within 2 hours may have a small charge.",
    },
    {
      question: "How do payments work?",
      answer:
        "We accept multiple payment methods including credit/debit cards, UPI, and net banking. Payment is secured and processed instantly.",
    },
    {
      question: "Can I give feedback about a worker?",
      answer:
        "Yes! After every service, you can rate and review the worker. Your feedback helps us maintain quality service and helps other customers make informed choices.",
    },
  ];

  const socialLinks = [
    { name: "Facebook", icon: "f", url: "https://facebook.com" },
    { name: "Instagram", icon: "📷", url: "https://instagram.com" },
    { name: "Twitter", icon: "𝕏", url: "https://twitter.com" },
    { name: "LinkedIn", icon: "in", url: "https://linkedin.com" },
  ];

  return (
    <>
      <Navcompo />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={false}
        draggable={true}
      />

      {/* Hero Section */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img
          src={contactBg}
          style={{
            width: "100%",
            height: "clamp(250px, 50vw, 400px)",
            objectFit: "cover",
          }}
          alt="Contact Us"
        />
        <motion.div
          style={{
            position: "absolute",
            top: "40%",
            left: "25%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            color: "white",
            width: "90%",
            maxWidth: "600px",
            padding: "0 15px",
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Get In Touch
          </motion.h1>
          <motion.p
            style={{
              fontSize: "clamp(0.9rem, 3vw, 1.2rem)",
              marginBottom: "20px",
              lineHeight: "1.6",
            }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Have questions? We'd love to hear from you. Send us a message and
            we'll respond as soon as possible.
          </motion.p>
        </motion.div>
      </div>

      <Container className="my-5">
        {/* Contact Info Cards */}
        <Row className="mb-5 g-4">
          {contactInfo.map((info, index) => (
            <Col key={index} md={6} lg={3} sm={12}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <Card
                  style={{
                    border: "none",
                    borderRadius: "15px",
                    boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
                    height: "100%",
                    textAlign: "center",
                    padding: "30px 20px",
                    backgroundColor: "#f8f9ff",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div style={{ fontSize: "3rem", marginBottom: "15px" }}>
                    {info.icon}
                  </div>
                  <Card.Title
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "#333",
                      marginBottom: "8px",
                    }}
                  >
                    {info.title}
                  </Card.Title>
                  <Card.Text
                    style={{
                      fontSize: "1rem",
                      fontWeight: "600",
                      color: "#6367ff",
                      marginBottom: "8px",
                    }}
                  >
                    {info.detail}
                  </Card.Text>
                  <Card.Text
                    style={{
                      fontSize: "0.85rem",
                      color: "#999",
                    }}
                  >
                    {info.description}
                  </Card.Text>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Main Contact Section */}
        <Row className="mb-5 g-4" style={{}}>
          {/* Contact Form */}
          <Col lg={6} md={12}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card
                style={{
                  border: "none",
                  borderRadius: "20px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                  padding: "clamp(20px, 5vw, 40px)",
                  height: "100%",
                }}
              >
                <Card.Title
                  style={{
                    fontSize: "clamp(1.3rem, 4vw, 1.8rem)",
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: "clamp(15px, 4vw, 30px)",
                  }}
                >
                  Send us a Message
                </Card.Title>

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontWeight: "600",
                        color: "#333",
                        fontSize: "0.95rem",
                      }}
                    >
                      Full Name *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your full name"
                      style={{
                        borderRadius: "10px",
                        border: "2px solid #e0e0e0",
                        padding: "clamp(10px, 2vw, 12px) 15px",
                        fontSize: "1rem",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#6367ff")}
                      onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontWeight: "600",
                        color: "#333",
                        fontSize: "0.95rem",
                      }}
                    >
                      Email Address *
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      style={{
                        borderRadius: "10px",
                        border: "2px solid #e0e0e0",
                        padding: "clamp(10px, 2vw, 12px) 15px",
                        fontSize: "1rem",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#6367ff")}
                      onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontWeight: "600",
                        color: "#333",
                        fontSize: "0.95rem",
                      }}
                    >
                      Phone Number
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXXXXXXX"
                      style={{
                        borderRadius: "10px",
                        border: "2px solid #e0e0e0",
                        padding: "clamp(10px, 2vw, 12px) 15px",
                        fontSize: "1rem",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#6367ff")}
                      onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label
                      style={{
                        fontWeight: "600",
                        color: "#333",
                        fontSize: "0.95rem",
                      }}
                    >
                      Subject
                    </Form.Label>
                    <Form.Select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      style={{
                        borderRadius: "10px",
                        border: "2px solid #e0e0e0",
                        padding: "clamp(10px, 2vw, 12px) 15px",
                        fontSize: "1rem",
                      }}
                    >
                      <option>General Inquiry</option>
                      <option>Booking Issue</option>
                      <option>Worker Complaint</option>
                      <option>Feature Request</option>
                      <option>Bug Report</option>
                      <option>Other</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label
                      style={{
                        fontWeight: "600",
                        color: "#333",
                        fontSize: "0.95rem",
                      }}
                    >
                      Message *
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      style={{
                        borderRadius: "10px",
                        border: "2px solid #e0e0e0",
                        padding: "clamp(10px, 2vw, 12px) 15px",
                        fontSize: "1rem",
                        fontFamily: "inherit",
                        resize: "vertical",
                        minHeight: "clamp(120px, 20vw, 150px)",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#6367ff")}
                      onBlur={(e) => (e.target.style.borderColor = "#e0e0e0")}
                    />
                  </Form.Group>

                  <Button
                    type="submit"
                    disabled={loading}
                    style={{
                      width: "100%",
                      backgroundColor: "#6367ff",
                      border: "none",
                      borderRadius: "10px",
                      padding: "clamp(12px, 3vw, 14px) 20px",
                      fontSize: "clamp(0.95rem, 2vw, 1rem)",
                      fontWeight: "600",
                      cursor: loading ? "not-allowed" : "pointer",
                      opacity: loading ? 0.7 : 1,
                      transition: "all 0.3s ease",
                      minHeight: "44px",
                    }}
                    onMouseEnter={(e) =>
                      !loading &&
                      (e.target.style.transform = "translateY(-2px)")
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.transform = "translateY(0)")
                    }
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </Form>
              </Card>
            </motion.div>
          </Col>

          {/* Social Media & Quick Links */}
          <Col lg={6} md={12}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card
                style={{
                  border: "none",
                  borderRadius: "20px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                  padding: "clamp(20px, 5vw, 40px)",
                  marginBottom: "clamp(20px, 4vw, 30px)",
                }}
              >
                <Card.Title
                  style={{
                    fontSize: "clamp(1.1rem, 3vw, 1.5rem)",
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: "clamp(15px, 4vw, 25px)",
                  }}
                >
                  Connect With Us
                </Card.Title>

                <div style={{ marginBottom: "30px" }}>
                  <p
                    style={{
                      color: "#666",
                      marginBottom: "20px",
                      fontSize: "clamp(0.9rem, 2vw, 0.95rem)",
                    }}
                  >
                    Follow us on social media for updates and special offers
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "clamp(10px, 2vw, 15px)",
                      flexWrap: "wrap",
                    }}
                  >
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: "clamp(45px, 10vw, 50px)",
                          height: "clamp(45px, 10vw, 50px)",
                          borderRadius: "10px",
                          backgroundColor: "#f0f4ff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "clamp(1.1rem, 2vw, 1.3rem)",
                          textDecoration: "none",
                          color: "#6367ff",
                          fontWeight: "bold",
                          transition: "all 0.3s ease",
                          minHeight: "44px",
                          minWidth: "44px",
                        }}
                        whileHover={{ scale: 1.1, backgroundColor: "#e0e4ff" }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </Card>

              <Card
                style={{
                  border: "none",
                  borderRadius: "20px",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
                  padding: "clamp(20px, 5vw, 30px)",
                  backgroundColor: "#f8f9ff",
                }}
              >
                <Card.Title
                  style={{
                    fontSize: "clamp(1rem, 3vw, 1.3rem)",
                    fontWeight: "bold",
                    color: "#333",
                    marginBottom: "clamp(12px, 3vw, 20px)",
                  }}
                >
                  Response Time
                </Card.Title>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "clamp(10px, 2vw, 15px)",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      width: "12px",
                      height: "12px",
                      backgroundColor: "#4ade80",
                      borderRadius: "50%",
                      animation: "pulse 2s infinite",
                      flexShrink: 0,
                      marginTop: "2px",
                    }}
                  />
                  <div style={{ flex: 1, minWidth: "200px" }}>
                    <p
                      style={{
                        fontWeight: "600",
                        color: "#333",
                        margin: 0,
                        fontSize: "clamp(0.9rem, 2vw, 0.95rem)",
                      }}
                    >
                      Usually replies within 24 hours
                    </p>
                    <p
                      style={{
                        fontSize: "clamp(0.8rem, 1.5vw, 0.9rem)",
                        color: "#999",
                        margin: "5px 0 0 0",
                      }}
                    >
                      During business hours: 9 AM - 6 PM IST
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Col>
        </Row>

        {/* FAQ Section */}
        <Row className="mb-5">
          <Col md={12}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div
                style={{
                  textAlign: "center",
                  marginBottom: "40px",
                }}
              >
                <span
                  style={{
                    color: "#6367ff",
                    fontWeight: "bold",
                    fontSize: "0.9rem",
                    textTransform: "uppercase",
                    letterSpacing: "2px",
                  }}
                >
                  FREQUENTLY ASKED QUESTIONS
                </span>
                <h2
                  style={{
                    fontSize: "clamp(1.2rem, 5vw, 2.5rem)",
                    fontWeight: "bold",
                    color: "#333",
                    marginTop: "10px",
                  }}
                >
                  Common Questions
                </h2>
              </div>

              <Card
                style={{
                  border: "none",
                  borderRadius: "15px",
                  boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
                  padding: "clamp(15px, 4vw, 30px)",
                }}
              >
                <Accordion flush>
                  {faqs.map((faq, index) => (
                    <Accordion.Item key={index} eventKey={index.toString()}>
                      <Accordion.Header
                        style={{
                          fontSize: "clamp(0.9rem, 2vw, 1.05rem)",
                          fontWeight: "600",
                          color: "#333",
                          padding: "clamp(12px, 2vw, 15px) 0",
                        }}
                      >
                        {faq.question}
                      </Accordion.Header>
                      <Accordion.Body
                        style={{
                          fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)",
                          color: "#666",
                          lineHeight: "1.6",
                          padding: "clamp(12px, 2vw, 15px) 0",
                        }}
                      >
                        {faq.answer}
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </Card>
            </motion.div>
          </Col>
        </Row>
      </Container>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>

      <Footer />
    </>
  );
}

export default Contact;
