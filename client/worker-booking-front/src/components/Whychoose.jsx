import React from "react";
import Choosecard from "./Choosecard";
import { Container } from "react-bootstrap";

const features = [
  {
    title: "Verified Workers",
    desc: "All professionals are background-checked",
  },
  {
    title: "Quick Booking",
    desc: "Book services in just a few clicks",
  },
  {
    title: "Affordable Pricing",
    desc: "Best services at reasonable prices",
  },
  {
    title: "Secure Platform",
    desc: "Your data is safe and protected",
  },
];

function Whychoose() {
  return (
    <>
      <h2 style={{ textAlign: "center", paddingTop: "10px" }}>Why choose Us</h2>
      <Container
        style={{
          display: "flex",
          marginTop: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {features.map((item, index) => (
          <Choosecard key={index} title={item.title} desc={item.desc} />
        ))}
      </Container>
    </>
  );
}

export default Whychoose;
