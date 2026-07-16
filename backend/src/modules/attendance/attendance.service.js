import Attendance from "../../models/Attendance.js";
import Registration from "../../models/Registration.js";
import ApiError from "../../utils/ApiError.js";

export const checkIn = async (ticketId) => {
  const registration = await Registration.findOne({ ticketId });

  if (!registration) {
    throw new ApiError(404, "Invalid ticket.");
  }

  if (registration.status !== "Registered") {
    throw new ApiError(
      400,
      `Cannot check in. Current status: ${registration.status}`
    );
  }

  const existingAttendance = await Attendance.findOne({
    registration: registration._id,
  });

  if (existingAttendance) {
    throw new ApiError(400, "Attendance has already been marked.");
  }

  registration.status = "Checked In";
  await registration.save();

  const attendance = await Attendance.create({
    registration: registration._id,
    user: registration.user,
    event: registration.event,
    checkedInAt: new Date(),
  });

  return attendance;
};