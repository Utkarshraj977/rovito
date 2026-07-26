import userRepository from "./user.repository.js";
import ApiError from "../../utils/apiError.js";



// ============================
// COMMON
// ============================


// Get current user profile
const getUserProfile = async (id) => {
  const user = await userRepository.findUserById(id);
  if (!user) {

    throw new ApiError(
      404,
      "User not found"
    );

  }

  return user;
};

// Update own profile
const updateProfile = async (id, data) => {

  const user = await userRepository.findUserById(id);

  if (!user) {

    throw new ApiError(
      404,
      "User not found"
    );

  }

  return userRepository.updateProfile(
    id,
    data
  );

};

// ============================
// OWNER
// ============================


// Get all customers
const getAllCustomers = async (filters) => {

  return userRepository.getAllCustomers(filters);

};

// Get single customer
const getCustomerById = async (id) => {

  const customer = await userRepository.findCustomerById(id);

  if (!customer) {
    throw new ApiError(
      404,
      "Customer not found"
    );

  }

  return customer;

};

// Enable / Disable customer
const updateCustomerStatus = async (
  id,
  isActive
) => {

  const customer = await userRepository.findCustomerById(id);

  if (!customer) {

    throw new ApiError(
      404,
      "Customer not found"
    );

  }

  return userRepository.updateCustomerStatus(
    id,
    isActive
  );


};

export default {


  // Common

  getUserProfile,

  updateProfile,



  // Owner

  getAllCustomers,

  getCustomerById,

  updateCustomerStatus,


};