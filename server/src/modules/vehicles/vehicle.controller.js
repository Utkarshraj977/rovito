import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";

import vehicleService from "./vehicle.service.js";

// ========================================
// CREATE VEHICLE
// ========================================

const createVehicle = asyncHandler(async (req, res) => {
  const vehicle = await vehicleService.createVehicle(
    req.body
  );

  return res.status(201).json(
    new ApiResponse(
      201,
      vehicle,
      "Vehicle created successfully"
    )
  );
});

// ========================================
// GET VEHICLE BY ID
// ========================================

const getVehicleById = asyncHandler(async (req, res) => {
  const vehicle = await vehicleService.getVehicleById(
    req.params.id
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      vehicle,
      "Vehicle fetched successfully"
    )
  );
});

// ========================================
// GET ALL VEHICLES
// ========================================

const getAllVehicles = asyncHandler(async (req, res) => {
  const vehicles =
    await vehicleService.getAllVehicles({
      page: req.query.page,
      limit: req.query.limit,
      search: req.query.search,
      vehicleType: req.query.vehicleType,
      availabilityStatus:
        req.query.availabilityStatus,
      operationalStatus:
        req.query.operationalStatus,
    });

  return res.status(200).json(
    new ApiResponse(
      200,
      vehicles,
      "Vehicles fetched successfully"
    )
  );
});

// ========================================
// UPDATE VEHICLE
// ========================================

const updateVehicle = asyncHandler(async (req, res) => {
  const vehicle =
    await vehicleService.updateVehicle(
      req.params.id,
      req.body
    );

  return res.status(200).json(
    new ApiResponse(
      200,
      vehicle,
      "Vehicle updated successfully"
    )
  );
});

// ========================================
// UPDATE AVAILABILITY STATUS
// ========================================

const updateAvailabilityStatus =
  asyncHandler(async (req, res) => {
    const vehicle =
      await vehicleService.updateAvailabilityStatus(
        req.params.id,
        req.body.availabilityStatus
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        vehicle,
        "Vehicle availability updated successfully"
      )
    );
  });

// ========================================
// UPDATE OPERATIONAL STATUS
// ========================================

const updateOperationalStatus =
  asyncHandler(async (req, res) => {
    const vehicle =
      await vehicleService.updateOperationalStatus(
        req.params.id,
        req.body.operationalStatus
      );

    return res.status(200).json(
      new ApiResponse(
        200,
        vehicle,
        "Vehicle operational status updated successfully"
      )
    );
  });

export {
  createVehicle,
  getVehicleById,
  getAllVehicles,
  updateVehicle,
  updateAvailabilityStatus,
  updateOperationalStatus,
};