import { z } from "zod";

export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50),

  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .toLowerCase(),

  phone: z
    .string()
    .trim()
    .min(10, "Invalid phone number")
    .max(15),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      "Password must contain uppercase, lowercase, number and special character"
    ),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .toLowerCase(),

  password: z
    .string()
    .min(1, "Password is required"),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .toLowerCase(),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required"),

  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(32)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
      "Password must contain uppercase, lowercase, number and special character"
    ),
});

export const changePasswordSchema = z.object({
    currentPassword: z
      .string()
      .min(8, "Current password must be at least 8 characters"),

    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .max(32)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
        "Password must contain uppercase, lowercase, number and special character"
      ),
  })
  .refine(
    (data) => data.currentPassword !== data.newPassword,
    {
      message: "New password must be different from current password",
      path: ["newPassword"],
    }
  );

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .max(50),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .max(50),

  phone: z
    .string()
    .trim()
    .min(10, "Invalid phone number")
    .max(15),
});