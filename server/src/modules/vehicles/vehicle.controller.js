import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/apiResponse.js";

import vehicleService from "./vehicle.service.js";


// Create Vehicle
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


// Get Vehicle By ID
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


// Get All Vehicles
const getAllVehicles = asyncHandler(async (req, res) => {
  const { skip, take } = req.pagination;

  const vehicles = await vehicleService.getAllVehicles(
    skip,
    take
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      vehicles,
      "Vehicles fetched successfully"
    )
  );
});


// Update Vehicle
const updateVehicle = asyncHandler(async (req, res) => {
  const vehicle = await vehicleService.updateVehicle(
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


// Delete Vehicle
const deleteVehicle = asyncHandler(async (req, res) => {
  await vehicleService.deleteVehicle(
    req.params.id
  );

  return res.status(200).json(
    new ApiResponse(
      200,
      null,
      "Vehicle deleted successfully"
    )
  );
});


export {
  createVehicle,
  getVehicleById,
  getAllVehicles,
  updateVehicle,
  deleteVehicle,
};