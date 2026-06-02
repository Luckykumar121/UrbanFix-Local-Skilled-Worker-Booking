const nodemailer = require("nodemailer");
// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: "luckykumarr554@gmail.com",
    pass: "vgyb mltf ipkp yqvl",
  },
});

module.exports = { transporter };
