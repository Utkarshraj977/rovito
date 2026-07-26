import vehicleRepository from "./vehicle.repository.js";
import ApiError from "../../utils/apiError.js";


const createVehicle = async (vehicleData) => {
  const existingVehicle =
    await vehicleRepository.findVehicleByNumber(
      vehicleData.vehicleNumber
    );

  if (existingVehicle) {
    throw new ApiError(409, "Vehicle already exists");
  }

  return vehicleRepository.createVehicle(vehicleData);
};


const getVehicleById = async (vehicleId) => {
  const vehicle = await vehicleRepository.findVehicleById(
    vehicleId
  );

  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }

  return vehicle;
};


const getAllVehicles = async (skip, take) => {
  return vehicleRepository.getVehicles(skip, take);
};


const updateVehicle = async (vehicleId, data) => {
  const vehicle = await vehicleRepository.findVehicleById(
    vehicleId
  );

  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }

  return vehicleRepository.updateVehicle(
    vehicleId,
    data
  );
};


const deleteVehicle = async (vehicleId) => {
  const vehicle = await vehicleRepository.findVehicleById(
    vehicleId
  );

  if (!vehicle) {
    throw new ApiError(404, "Vehicle not found");
  }

  return vehicleRepository.deleteVehicle(vehicleId);
};


export default {
  createVehicle,
  getVehicleById,
  getAllVehicles,
  updateVehicle,
  deleteVehicle,
};