import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";
import * as dashboardService from "./dashboard.service.js";

export const getDashboard = asyncHandler(async (req, res) => {
  const stats = await dashboardService.getDashboardStats();

  return res.status(200).json(
    new ApiResponse(200, "Dashboard fetched successfully", stats)
  );
});