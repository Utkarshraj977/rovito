import asyncHandler from "../../utils/asyncHandler.js";
import userService from "./user.service.js";



// ============================
// COMMON
// ============================



// Get logged in user profile
const getUserProfile = asyncHandler(async (req, res) => {


  const user = await userService.getUserProfile(
    req.user.id
  );



  res.status(200).json({

    success: true,

    message: "Profile fetched successfully",

    data: user,

  });


});






// Update logged in user profile
const updateProfile = asyncHandler(async (req, res) => {


  const user = await userService.updateProfile(

    req.user.id,

    req.body

  );



  res.status(200).json({

    success:true,

    message:"Profile updated successfully",

    data:user,

  });


});








// ============================
// OWNER
// ============================



// Get all customers
const getAllCustomers = asyncHandler(async (req,res)=>{


  const result = await userService.getAllCustomers(

    req.query

  );



  res.status(200).json({

    success:true,

    message:"Customers fetched successfully",

    data:result,

  });



});







// Get customer by id
const getCustomerById = asyncHandler(async(req,res)=>{


  const customer = await userService.getCustomerById(

    req.params.id

  );



  res.status(200).json({

    success:true,

    message:"Customer fetched successfully",

    data:customer,

  });



});







// Enable / Disable customer
const updateCustomerStatus = asyncHandler(async(req,res)=>{


  const { isActive } = req.body;



  const customer = await userService.updateCustomerStatus(

    req.params.id,

    isActive

  );



  res.status(200).json({

    success:true,

    message:"Customer status updated successfully",

    data:customer,

  });



});








export default {

  // Common
  getUserProfile,

  updateProfile,

  // Owner
  getAllCustomers,

  getCustomerById,

  updateCustomerStatus,


};