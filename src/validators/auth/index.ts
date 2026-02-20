import {z} from "zod";

export const registerSchema = z.object({

 username: z
  .string()
  .min(3,"Username must be more than 2")
  .max(14,"Username must be less than 15")
  .trim(),

 email: z
  .string()
  .email("Invalid Email")
  .trim(),

 password: z
  .string()
  .min(6,"Password must be more than 5")

});

export const loginSchema = z.object({
    email:z.email("Email must be valid"),
    password:z.string().min(6,"Password must be more than 5")
})