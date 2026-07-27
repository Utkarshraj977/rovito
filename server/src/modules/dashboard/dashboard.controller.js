import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";

import dashboardService from "./dashboard.service.js";

// ========================================
// OWNER DASHBOARD
// ========================================

const getOwnerDashboard = asyncHandler(
  async (req, res) => {
    const dashboard =
      await dashboardService.getOwnerDashboard();

    return res.status(200).json(
      new ApiResponse(
        200,
        dashboard,
        "Owner dashboard fetched successfully"
      )
    );
  }
);

// ========================================
// CUSTOMER DASHBOARD
// ========================================

const getCustomerDashboard = asyncHandler(
  async (req, res) => {
    const dashboard =
      await dashboardService.getCustomerDashboard(
        req.user.id
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        dashboard,
        "Customer dashboard fetched successfully"
      )
    );
  }
);

export {
  getOwnerDashboard,
  getCustomerDashboard,
};