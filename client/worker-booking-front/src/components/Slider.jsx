import Carousel from "react-bootstrap/Carousel";
import plumber from "../assets/images/plumber.jpg";
import electrician from "../assets/images/electrician.jpg";
import carpenter from "../assets/images/carpenter.jpg";
import painter from "../assets/images/painter.jpg";
import mechanic from "../assets/images/mechanic.jpg";
import ac_repair from "../assets/images/ac_repair.jpg";

function Slider() {
  return (
    <Carousel style={{ margin: "0 auto", height: "400px" }}>
      <Carousel.Item>
        <img
          src={plumber}
          alt="plumber"
          style={{ height: "500px", width: "100%", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3 style={{ fontWeight: "bolder" }}>Plumber Services</h3>
          <p style={{ fontWeight: "bolder" }}>
            Reliable plumbing services to quickly fix leaks, pipe issues, and
            ensure smooth water flow in your home
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={mechanic}
          alt="mechanic"
          style={{ height: "500px", width: "100%", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3 style={{ fontWeight: "bolder" }}>Mechanic Servivces</h3>
          <p style={{ fontWeight: "bolder" }}>
            Skilled mechanical services ensuring your vehicle runs smoothly with
            reliable repairs and maintenance
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={carpenter}
          alt="carpenter"
          style={{ height: "500px", width: "100%", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3 style={{ fontWeight: "bolder" }}>Carpenter Services</h3>
          <p style={{ fontWeight: "bolder" }}>
            Expert carpentry services delivering durable furniture, repairs, and
            custom woodwork with precision
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={ac_repair}
          alt="ac_repair"
          style={{ height: "500px", width: "100%", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3 style={{ fontWeight: "bolder" }}>Ac Repairing Services</h3>
          <p style={{ fontWeight: "bolder" }}>
            Fast and efficient AC repair services to keep your home cool,
            comfortable, and energy-efficient
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={electrician}
          alt="electrician"
          style={{ height: "500px", width: "100%", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3 style={{ fontWeight: "bolder" }}>Electrician Services</h3>
          <p style={{ fontWeight: "bolder" }}>
            Professional electrical solutions for safe wiring, repairs, and
            uninterrupted power supply in your home
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={painter}
          alt="painter"
          style={{ height: "500px", width: "100%", objectFit: "cover" }}
        />
        <Carousel.Caption>
          <h3 style={{ fontWeight: "bolder" }}>Beautifull Painting Services</h3>
          <p style={{ fontWeight: "bolder" }}>
            Transform your space with our expert painting services, bringing
            color and life to your walls.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Slider;
