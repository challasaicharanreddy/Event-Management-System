import transporter from "../config/mail.js";

export const sendRegistrationEmail = async ({
  user,
  event,
  registration,
}) => {
  await transporter.sendMail({
    from: `"Event Management System" <${process.env.EMAIL_USER}>`,
    to: user.email,
    subject: `Registration Confirmed - ${event.title}`,
    html: `
      <div style="font-family:Arial,sans-serif;padding:20px">
        <h2>Hello ${user.name} 👋</h2>

        <p>Your registration has been confirmed.</p>

        <hr/>

        <h3>${event.title}</h3>

        <p><strong>Venue:</strong> ${event.venue}</p>

        <p>
          <strong>Date:</strong>
          ${new Date(event.startDateTime).toLocaleString()}
        </p>

        <p>
          <strong>Ticket ID:</strong>
          ${registration.ticketId}
        </p>

        <br>

        <img
          src="${registration.qrCode}"
          width="220"
        />

        <br><br>

        <p>Please show this QR code during check-in.</p>

        <hr/>

        <p>Thank you for registering.</p>
      </div>
    `,
  });
};