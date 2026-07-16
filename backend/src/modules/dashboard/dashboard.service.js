import User from "../../models/User.js";
import Event from "../../models/Event.js";
import Registration from "../../models/Registration.js";
import Attendance from "../../models/Attendance.js";

export const getDashboardStats = async () => {
  const [
    totalUsers,
    totalEvents,
    totalRegistrations,
    totalAttendance,
    upcomingEvents,
  ] = await Promise.all([
    User.countDocuments(),
    Event.countDocuments(),
    Registration.countDocuments(),
    Attendance.countDocuments(),
    Event.countDocuments({ status: "Upcoming" }),
  ]);

  return {
    totalUsers,
    totalEvents,
    totalRegistrations,
    totalAttendance,
    upcomingEvents,
  };
};