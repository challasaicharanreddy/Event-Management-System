import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import * as attendanceService from "./attendance.service.js";

export const checkIn = asyncHandler(async (req, res) => {

    const { ticketId } = req.body;
    const attendance = await attendanceService.checkIn(ticketId);

    return res.status(200).json(
        new ApiResponse(
            200,
            "Check-in successful",
            attendance
        )
    );
});