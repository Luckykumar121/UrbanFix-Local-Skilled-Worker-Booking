import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../../src/App.css";

function Choosecard({ title, desc }) {
  return (
    <Card
      className="cardap"
      style={{
        width: "15rem",
        height: "200px",
        margin: "10px",
        textAlign: "center",
      }}
    >
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{desc}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Choosecard;
