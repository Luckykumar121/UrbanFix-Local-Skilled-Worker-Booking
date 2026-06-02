import React from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import Fetchworkers from "./Fetchworkers";

function AllWorkers() {
  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All Available Workers</h2>
        <Link to="/home">
          <Button variant="secondary">Back to categories</Button>
        </Link>
      </div>

      <Fetchworkers />
    </Container>
  );
}

export default AllWorkers;
