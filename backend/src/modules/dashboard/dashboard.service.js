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
    completedEvents,
    cancelledEvents
  ] = await Promise.all([
    User.countDocuments(),
    Event.countDocuments(),
    Registration.countDocuments(),
    Attendance.countDocuments(),
    Event.countDocuments({ status: "Upcoming" }),
    Event.countDocuments({ status: "Completed" }),
    Event.countDocuments({ status: "Cancelled" }),
  ]);

  const eventsByCategory = await Event.aggregate([
    {
      $group: {
        _id: "$category",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        category: "$_id",
        count: 1,
      },
    },
  ]);

  const registrationsPerEvent = await Event.aggregate([
    {
      $project: {
        _id: 0,
        title: 1,
        registrations: "$registeredCount",
      },
    },
    {
      $sort: {
        registrations: -1,
      },
    },
  ]);

  return {
    summary: {
      totalUsers,
      totalEvents,
      totalRegistrations,
      totalAttendance,
      upcomingEvents,
      completedEvents,
      cancelledEvents,
    },

    charts: {
      eventsByCategory,
      registrationsPerEvent,
    },
  };
};