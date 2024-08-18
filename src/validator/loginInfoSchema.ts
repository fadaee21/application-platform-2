import { z } from "zod";
import { passwordSchema, roleSchema, usernameSchema } from "./allValidations";

export const loginInfoSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  role: roleSchema,
});
