import vehicleRepository from "./vehicle.repository.js";
import ApiError from "../../utils/apiError.js";

// ========================================
// CREATE VEHICLE
// ========================================

const createVehicle = async (vehicleData) => {
  const existingVehicle =
    await vehicleRepository.findVehicleByRegistrationNumber(
      vehicleData.registrationNumber
    );

  if (existingVehicle) {
    throw new ApiError(
      409,
      "Vehicle with this registration number already exists"
    );
  }

  return vehicleRepository.createVehicle(vehicleData);
};

// ========================================
// GET VEHICLE BY ID
// ========================================

const getVehicleById = async (vehicleId) => {
  const vehicle =
    await vehicleRepository.findVehicleById(vehicleId);

  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }

  return vehicle;
};

// ========================================
// GET ALL VEHICLES
// ========================================

const getAllVehicles = async (filters) => {
  return vehicleRepository.getVehicles(filters);
};

// ========================================
// UPDATE VEHICLE
// ========================================

const updateVehicle = async (vehicleId, data) => {
  const vehicle =
    await vehicleRepository.findVehicleById(vehicleId);

  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }

  if (
    data.registrationNumber &&
    data.registrationNumber !==
      vehicle.registrationNumber
  ) {
    const existingVehicle =
      await vehicleRepository.findVehicleByRegistrationNumber(
        data.registrationNumber
      );

    if (existingVehicle) {
      throw new ApiError(
        409,
        "Registration number already exists"
      );
    }
  }

  return vehicleRepository.updateVehicle(
    vehicleId,
    data
  );
};

// ========================================
// UPDATE AVAILABILITY STATUS
// ========================================

const updateAvailabilityStatus = async (
  vehicleId,
  availabilityStatus
) => {
  const vehicle =
    await vehicleRepository.findVehicleById(vehicleId);

  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }

  return vehicleRepository.updateAvailabilityStatus(
    vehicleId,
    availabilityStatus
  );
};

// ========================================
// UPDATE OPERATIONAL STATUS
// ========================================

const updateOperationalStatus = async (
  vehicleId,
  operationalStatus
) => {
  const vehicle =
    await vehicleRepository.findVehicleById(vehicleId);

  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }

  return vehicleRepository.updateOperationalStatus(
    vehicleId,
    operationalStatus
  );
};

export default {
  createVehicle,
  getVehicleById,
  getAllVehicles,
  updateVehicle,
  updateAvailabilityStatus,
  updateOperationalStatus,
};