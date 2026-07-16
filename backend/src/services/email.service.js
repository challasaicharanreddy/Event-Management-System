import transporter from "../config/mail.js";

export const sendEmail = async ({
  to,
  subject,
  html,
  attachments = [],
}) => {
  return transporter.sendMail({
    from: `"Online Event Management" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    attachments,
  });
};