const { transporter } = require("./Email.config");
const {
  Verification_Email_Template,
  Welcome_Email_Template,
} = require("./EmailTamplate");

const Sendverificationcode = async (email, code) => {
  try {
    const response = await transporter.sendMail({
      from: '"UrbanFix Community" <luckykumarr554@gmail.com>',
      to: email,
      subject: "Email Verification",
      text: `Verify Your Email`,
      html: Verification_Email_Template.replace("{verificationCode}", code),
    });

    console.log("Email sent successfully", response);
  } catch (err) {
    console.error("Error sending verification email:", err);
    throw err;
  }
};

module.exports = { Sendverificationcode };
