import React from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import Fetchworkers from "./Fetchworkers";

function CategoryWorkers() {
  const { categoryName } = useParams();

  const categoryLabels = {
    plumber: "Plumbing",
    electrician: "Electrical",
    carpenter: "Carpentry",
    painter: "Painting",
    mechanic: "Mechanic",
    ac_repair: "Ac Repairing",
  };

  const slug = decodeURIComponent(categoryName);
  const label = categoryLabels[slug] || slug;

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Workers in "{label}"</h2>
        <Link to="/home">
          <Button variant="success">Back to categories</Button>
        </Link>
      </div>

      <Fetchworkers category={slug} />
    </Container>
  );
}

export default CategoryWorkers;
