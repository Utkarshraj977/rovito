import prisma  from "../../config/prisma.js";

const findUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

const createUser = async (userData) => {
  return prisma.user.create({
    data: userData,
  });
};

const updateUser = async (id, data) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};


const updatePassword = (id, passwordHash) => {
  return prisma.user.update({
    where: { id },
    data: {
      passwordHash,
    },
  });
};

const updateProfile = (id, data) => {
  return prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

export default {
  findUserById,
  findUserByEmail,
  createUser,
  updateUser,
  updatePassword,
  updateProfile,
};