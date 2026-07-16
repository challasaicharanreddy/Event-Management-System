import transporter from "./config/mail.js";

const sendTestEmail = async () => {
  try {
    const info = await transporter.sendMail({
      from: `"Event Management System" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER,
      subject: "Nodemailer Test",
      html: `
        <h2>🎉 Congratulations!</h2>
        <p>Your email configuration is working correctly.</p>
      `,
    });

    console.log("Email sent:", info.messageId);
  } catch (error) {
    console.error(error);
  }
};

sendTestEmail();