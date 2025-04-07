import z from "zod";

export const emailSchema = z.string().min(1).max(255);
export const passwordSchema = z.string().min(6).max(255);
export const verificatioCodeSchema = z.string().min(1).max(255);

export const loginSchema = z.object({
  email: emailSchema,
  userAgent: z.string(),
  ipAddress: z.string(),
  password: passwordSchema,
});

export const registerSchema = () =>
  loginSchema
    .extend({
      firstName: z.string(),
      lastName: z.string(),
      confirmPassword: passwordSchema,
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

export const passwordResetSchema = z.object({
  password: passwordSchema,
  verificationCode: verificatioCodeSchema,
});
