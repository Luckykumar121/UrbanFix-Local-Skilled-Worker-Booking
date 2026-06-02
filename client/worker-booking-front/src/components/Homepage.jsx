import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Button, Row, Col, Container } from "react-bootstrap";
import Slider from "./Slider";

import Navcompo from "./Navcompo";

import { notifylogout } from "../utils/util";
import { ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";
import Categorycard from "./Categorycard";
import plumber from "../assets/icons/plumber.jpg";
import electrician from "../assets/icons/electrician.jpg";
import carpenter from "../assets/icons/carpenter.jpg";
import painter from "../assets/icons/painter.jpg";
import mechanic from "../assets/icons/mechanic.jpg";
import ac_repair from "../assets/icons/ac_repair.jpg";
import Whychoose from "./Whychoose";
import Footer from "./Footer";
import { motion } from "framer-motion";

function Homepage() {
  const categoryImages = {
    plumber: plumber,
    electrician: electrician,
    carpenter: carpenter,
    painter: painter,
    mechanic: mechanic,
    ac_repair: ac_repair,
  };
  const categories = [
    { slug: "plumber", label: "Plumbing" },
    { slug: "electrician", label: "Electrical" },
    { slug: "carpenter", label: "Carpentry" },
    { slug: "painter", label: "Painting" },
    { slug: "mechanic", label: "Mechanic" },
    { slug: "ac_repair", label: "Ac Repairing" },
  ];

  const navigate = useNavigate();
  window.onload = () => {
    navigate("/home");
  };

  return (
    <>
      {/* <center>{loggedInUser}</center>;<center></center>
      <Button variant="dark" className="w-100" onClick={handlelogout}>
        <Link to={"/login"} color="white">
          Logout
        </Link>
      </Button> */}
      <Navcompo />

      <Slider />
      <motion.div
        className="my-5"
        style={{ padding: "10px" }}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <motion.h2
          style={{
            textAlign: "center",
            marginTop: "5%",
            paddingTop: "10px",
            paddingLeft: "10px",
            paddingRight: "10px",
            fontSize: "clamp(1.5rem, 5vw, 2rem)",
          }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          Explore Our Services
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Container fluid style={{ padding: "0 10px" }}>
            <Row
              className="g-3 g-sm-4 justify-content-center"
              style={{ marginLeft: "0", marginRight: "0" }}
            >
              {categories.map((category, index) => (
                <Col
                  key={category.slug}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={4}
                  className="d-flex justify-content-center p-2 p-sm-3"
                  style={{ minHeight: "auto" }}
                >
                  <motion.div
                    style={{ width: "100%", maxWidth: "340px" }}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <Categorycard
                      category={category.slug}
                      label={category.label}
                      img={categoryImages[category.slug]}
                    />
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Container>
          <ToastContainer />
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Whychoose />
      </motion.div>
      <Footer />
      {/* <ToastContainer /> */}
    </>
  );
}

export default Homepage;
