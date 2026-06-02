const express = require("express");
const { sendContactEmail } = require("../controllers/contactcontroller");

const router = express.Router();

// Send contact email
router.post("/send", sendContactEmail);

module.exports = router;
