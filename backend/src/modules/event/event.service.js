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
        import Event from "../../models/Event.js";
        import ApiError from "../../utils/ApiError.js";
        import { uploadImage } from "../../services/cloudinary.service.js";
        import cloudinary from "../../config/cloudinary.js";
        
        export const createEvent = async (data, createdBy, file) => {
          const {
            title,
            description,
            venue,
            category,
            startDateTime,
            endDateTime,
            capacity,
            price,
          } = data;
        
          if (new Date(startDateTime) >= new Date(endDateTime)) {
            throw new ApiError(400, "End date must be after start date.");
          }
        
          let banner = {
            url: "",
            publicId: "",
          };
        
          if (file) {
            const uploaded = await uploadImage(file, "event-banners");
        
            banner = {
              url: uploaded.secure_url,
              publicId: uploaded.public_id,
            };
          }
        
          const event = await Event.create({
            title,
            description,
            venue,
            category,
            startDateTime,
            endDateTime,
            capacity,
            price,
            banner,
            createdBy,
          });
        
          return event;
        };
        
        export const getAllEvents = async () => {
          return await Event.find()
            .populate("createdBy", "name email")
            .sort({ startDateTime: 1 });
        };
        
        export const getEventById = async (id) => {
          const event = await Event.findById(id).populate(
            "createdBy",
            "name email"
          );
        
          if (!event) {
            throw new ApiError(404, "Event not found");
          }
        
          return event;
        };
        
        export const updateEvent = async (id, data, file) => {
          const event = await Event.findById(id);
        
          if (!event) {
            throw new ApiError(404, "Event not found");
          }
        
          if (file) {
            if (event.banner?.publicId) {
              await cloudinary.uploader.destroy(event.banner.publicId);
            }
        
            const uploaded = await uploadImage(file, "event-banners");
        
            event.banner = {
              url: uploaded.secure_url,
              publicId: uploaded.public_id,
            };
          }
        
          Object.assign(event, data);
        
          await event.save();
        
          return event;
        };
        
        export const deleteEvent = async (id) => {
          const event = await Event.findById(id);
        
          if (!event) {
            throw new ApiError(404, "Event not found");
          }
        
          if (event.banner?.publicId) {
            await cloudinary.uploader.destroy(event.banner.publicId);
          }
        
          await event.deleteOne();
        
          return true;
        };
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