import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import * as registrationService from "./registration.service.js";

export const registerEvent = asyncHandler(async (req, res) => {

    const registration =
        await registrationService.registerForEvent(
            req.params.eventId,
            req.user._id
        );

    return res.status(201).json(
        new ApiResponse(
            201,
            "Successfully registered",
            registration
        )
    );
});