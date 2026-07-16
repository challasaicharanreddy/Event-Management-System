import Event from "../../models/Event.js";
import Registration from "../../models/Registration.js";
import ApiError from "../../utils/ApiError.js";
import QRCode from "qrcode";

export const registerForEvent = async (eventId, userId) => {
  const event = await Event.findById(eventId);

  if (!event) {
    throw new ApiError(404, "Event not found");
  }

  if (event.registeredCount >= event.capacity) {
    throw new ApiError(400, "Event is full");
  }

  const existingRegistration = await Registration.findOne({
    user: userId,
    event: eventId,
  });

  if (existingRegistration) {
    throw new ApiError(400, "You have already registered for this event");
  }

  // Create registration first
  const registration = await Registration.create({
    user: userId,
    event: eventId,
  });

  // Generate readable ticket ID using MongoDB ObjectId
  registration.ticketId = `EVT-${new Date().getFullYear()}-${registration._id
    .toString()
    .slice(-6)
    .toUpperCase()}`;

  // Generate QR code
  registration.qrCode = await QRCode.toDataURL(registration.ticketId);

  await registration.save();

  // Increment registration count
  event.registeredCount += 1;
  await event.save();

  return registration;
};