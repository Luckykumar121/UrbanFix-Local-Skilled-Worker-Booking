import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Categorycard({
  category,
  label,
  experience,
  hourlyRate,
  location,
  img,
}) {
  const navigate = useNavigate();
  const handlecategoryClick = (category) => {
    // Navigate to category page and show workers by category
    navigate(`/category/${encodeURIComponent(category)}`);
  };
  const cardStyle = {
    width: "100%",
    minHeight: "clamp(20rem, 90vw, 24rem)",
    borderRadius: "15px",
    border: "none",
    padding: "0",
    overflow: "hidden",
    textAlign: "center",
    boxShadow: "0 14px 35px rgba(0,0,0,0.12)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
  };

  const imgStyle = {
    height: "clamp(80px, 12vw, 100px)",
    width: "clamp(80px, 12vw, 100px)",
    objectFit: "cover",
    borderRadius: "50%",
    border: "3px solid #6366f1",
    padding: "4px",
    margin: "clamp(15px, 5vw, 20px) auto 10px",
    display: "block",
  };

  const contentStyle = {
    padding: "clamp(12px 15px, 4vw, 20px 18px) 18px clamp(15px, 4vw, 24px)",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  };

  return (
    <Card style={cardStyle} className="category-card">
      <img src={img} alt={category} style={imgStyle} />
      <Card.Body style={contentStyle}>
        <Card.Title
          style={{
            fontSize: "clamp(1rem, 4vw, 1.25rem)",
            fontWeight: "700",
            marginBottom: "8px",
          }}
        >
          {label || category}
        </Card.Title>
        <Card.Text
          style={{
            color: "#5b5b5b",
            lineHeight: "1.5",
            marginBottom: "18px",
            fontSize: "clamp(0.85rem, 3vw, 1rem)",
          }}
        >
          Fast & reliable {label || category} service with trust-verified
          professionals.
        </Card.Text>
        <Button
          variant="primary"
          style={{
            width: "100%",
            borderRadius: "10px",
            backgroundColor: "#6366f1",
            border: "none",
            padding: "clamp(8px, 2vw, 10px) 14px",
            fontWeight: "600",
            fontSize: "clamp(0.9rem, 3vw, 1rem)",
          }}
          onClick={() => handlecategoryClick(category)}
        >
          View details
        </Button>
      </Card.Body>
    </Card>
  );
}

export default Categorycard;
