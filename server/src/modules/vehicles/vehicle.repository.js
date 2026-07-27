import prisma from "../../config/prisma.js";

// ========================================
// CREATE VEHICLE
// ========================================

const createVehicle = (vehicleData) => {
  return prisma.vehicle.create({
    data: vehicleData,

    select: {
      id: true,
      displayName: true,
      make: true,
      model: true,
      modelYear: true,
      registrationNumber: true,
      vehicleType: true,
      transmissionType: true,
      fuelType: true,
      passengerCapacity: true,
      luggageCapacity: true,
      color: true,
      operationalStatus: true,
      availabilityStatus: true,
      notes: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};

// ========================================
// FIND VEHICLE BY ID
// ========================================

const findVehicleById = (id) => {
  return prisma.vehicle.findUnique({
    where: {
      id,
    },

    include: {
      images: true,
    },
  });
};

// ========================================
// FIND VEHICLE BY REGISTRATION NUMBER
// ========================================

const findVehicleByRegistrationNumber = (
  registrationNumber
) => {
  return prisma.vehicle.findUnique({
    where: {
      registrationNumber,
    },
  });
};

// ========================================
// GET ALL VEHICLES
// ========================================

const getVehicles = async ({
  page = 1,
  limit = 10,
  search,
  vehicleType,
  availabilityStatus,
  operationalStatus,
}) => {
  const skip = (page - 1) * limit;

  const where = {
    ...(search && {
      OR: [
        {
          displayName: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          make: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          model: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          registrationNumber: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    }),

    ...(vehicleType && {
      vehicleType,
    }),

    ...(availabilityStatus && {
      availabilityStatus,
    }),

    ...(operationalStatus && {
      operationalStatus,
    }),
  };

  const [vehicles, total] = await prisma.$transaction([
    prisma.vehicle.findMany({
      where,

      skip,

      take: Number(limit),

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        displayName: true,
        make: true,
        model: true,
        modelYear: true,
        registrationNumber: true,
        vehicleType: true,
        passengerCapacity: true,
        availabilityStatus: true,
        operationalStatus: true,
        createdAt: true,
      },
    }),

    prisma.vehicle.count({
      where,
    }),
  ]);

  return {
    vehicles,
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / limit),
  };
};

// ========================================
// UPDATE VEHICLE
// ========================================

const updateVehicle = (id, data) => {
  return prisma.vehicle.update({
    where: {
      id,
    },

    data,

    select: {
      id: true,
      displayName: true,
      make: true,
      model: true,
      modelYear: true,
      registrationNumber: true,
      vehicleType: true,
      transmissionType: true,
      fuelType: true,
      passengerCapacity: true,
      luggageCapacity: true,
      color: true,
      availabilityStatus: true,
      operationalStatus: true,
      notes: true,
      updatedAt: true,
    },
  });
};

// ========================================
// UPDATE AVAILABILITY STATUS
// ========================================

const updateAvailabilityStatus = (
  id,
  availabilityStatus
) => {
  return prisma.vehicle.update({
    where: {
      id,
    },

    data: {
      availabilityStatus,
    },
  });
};

// ========================================
// UPDATE OPERATIONAL STATUS
// ========================================

const updateOperationalStatus = (
  id,
  operationalStatus
) => {
  return prisma.vehicle.update({
    where: {
      id,
    },

    data: {
      operationalStatus,
    },
  });
};

export default {
  createVehicle,
  findVehicleById,
  findVehicleByRegistrationNumber,
  getVehicles,
  updateVehicle,
  updateAvailabilityStatus,
  updateOperationalStatus,
};