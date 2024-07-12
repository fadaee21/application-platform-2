import { z } from "zod";
import { passwordSchema, usernameSchema } from "./allValidations";

export const loginInfoSchema = z.object({
    username: usernameSchema,
    password: passwordSchema,
  });

