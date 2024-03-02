const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "arogyadhdl@gmail.com",
    pass: process.env.GOOGLE_PASS,
  },
});

const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: "arogyadhdl@gmail.com",
    to,
    subject,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export default sendEmail;
