import prisma from "../../config/prisma.js";


// ============================
// COMMON
// ============================

// Get logged in user profile
const findUserById = (id) => {
  return prisma.user.findUnique({
    where: { id },

    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      countryCode: true,
      phone: true,
      role: true,
      isActive: true,
      isEmailVerified: true,
      isPhoneVerified: true,
      lastLoginAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });
};



// Update own profile
const updateProfile = (id, data) => {
  return prisma.user.update({
    where: { id },

    data,

    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      countryCode: true,
      phone: true,
      role: true,
      isActive: true,
      isEmailVerified: true,
      isPhoneVerified: true,
      updatedAt: true,
    },
  });
};





// ============================
// OWNER
// ============================



// Get all customers only
const getAllCustomers = async ({
  page = 1,
  limit = 10,
  search,
  isActive,
}) => {


  const skip = (page - 1) * limit;



  const where = {

    // Owner ko list me nahi dikhana
    role: "CUSTOMER",


    ...(search && {

      OR: [

        {
          firstName:{
            contains:search,
            mode:"insensitive",
          },
        },


        {
          lastName:{
            contains:search,
            mode:"insensitive",
          },
        },


        {
          email:{
            contains:search,
            mode:"insensitive",
          },
        },


        {
          phone:{
            contains:search,
            mode:"insensitive",
          },
        },

      ],

    }),



    ...(isActive !== undefined && {
      isActive,
    }),


  };




  const [customers,total] = await prisma.$transaction([


    prisma.user.findMany({

      where,

      skip,

      take:Number(limit),


      orderBy:{
        createdAt:"desc",
      },


      select:{

        id:true,

        firstName:true,

        lastName:true,

        email:true,

        countryCode:true,

        phone:true,

        role:true,

        isActive:true,

        createdAt:true,

        updatedAt:true,

      },


    }),



    prisma.user.count({
      where,
    }),


  ]);




  return {

    customers,

    total,

    page:Number(page),

    limit:Number(limit),

    totalPages:Math.ceil(total / limit),

  };


};








// Get single customer details
const findCustomerById = (id) => {


  return prisma.user.findFirst({

    where:{

      id,

      role:"CUSTOMER",

    },


    select:{

      id:true,

      firstName:true,

      lastName:true,

      email:true,

      countryCode:true,

      phone:true,

      role:true,

      isActive:true,

      isEmailVerified:true,

      isPhoneVerified:true,

      createdAt:true,

      updatedAt:true,

    },

  });


};







// Enable / Disable customer
const updateCustomerStatus = (id,isActive)=>{


  return prisma.user.update({

    where:{
      id,
    },


    data:{
      isActive,
    },


    select:{

      id:true,

      firstName:true,

      lastName:true,

      email:true,

      phone:true,

      isActive:true,

      updatedAt:true,

    },

  });


};





export default {

  // Common
  findUserById,
  updateProfile,


  // Owner
  getAllCustomers,
  findCustomerById,
  updateCustomerStatus,

};