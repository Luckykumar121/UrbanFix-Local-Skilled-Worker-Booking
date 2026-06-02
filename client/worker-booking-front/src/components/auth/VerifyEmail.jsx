import React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { notifysucess, notifyerror } from "../../utils/util";
import { useState } from "react";
import { Container } from "react-bootstrap";

function VerifyEmail() {
  const [code, setcode] = useState("");
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!code) {
      return notifyerror("Please enter the verification code");
    }
    const response = await fetch("/api/auth/verify-email", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ code }),
    });
    const result = await response.json();
    if (response.ok) {
      notifysucess(result.message || "Email verified successfully");
      setTimeout(() => {
        // After verification, all users (both workers and customers) go to login
        // Workers will create their profile after logging in
        localStorage.removeItem("token");
        localStorage.removeItem("loggedinuser");
        navigate("/login");
      }, 1000);
    } else {
      notifyerror(result.message || "Failed to verify email");
    }
  };
  return (
    <Container
      style={{
        textAlign: "center",
        marginTop: "10%",

        height: "40vh",
        width: "50%",
        borderRadius: "20px",
        padding: "50px",
      }}
    >
      <h3 style={{ marginBottom: "50px" }}>Check Your Email</h3>
      <form className="row g-3" onSubmit={handlesubmit}>
        <div className="col-auto">
          <label className="visually-hidden">Email</label>
          <input
            type="text"
            readOnly
            className="form-control-plaintext"
            id="staticEmail2"
            value="Enter the 6-digit code"
          />
        </div>
        <div className="col-auto">
          <label className="visually-hidden">Otp</label>
          <input
            type="text"
            value={code}
            placeholder="6-digit code"
            onChange={(e) => setcode(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="col-auto">
          <button type="submit" className="btn btn-primary mb-3">
            verify
          </button>
        </div>
        <ToastContainer />
      </form>
    </Container>
  );
}

export default VerifyEmail;
