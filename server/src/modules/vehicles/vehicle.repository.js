import  prisma  from "../../config/prisma.js";

const createVehicle = async (vehicleData) => {
  return prisma.vehicle.create({
    data: vehicleData,
  });
};

const findVehicleById = async (id) => {
  return prisma.vehicle.findUnique({
    where: { id },
  });
};

const getVehicles = async (skip, take) => {
  return prisma.vehicle.findMany({
    skip,
    take,
    orderBy: {
      createdAt: "desc",
    },
  });
};

const updateVehicle = async (id, data) => {
  return prisma.vehicle.update({
    where: { id },
    data,
  });
};

const deleteVehicle = async (id) => {
  return prisma.vehicle.delete({
    where: { id },
  });
};

const findVehicleByNumber = async (vehicleNumber) => {
  return prisma.vehicle.findUnique({
    where: { vehicleNumber },
  });
};

export default {
  createVehicle,
  findVehicleById,
  getVehicles,
  updateVehicle,
  deleteVehicle,
  findVehicleByNumber,
};