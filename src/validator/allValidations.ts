import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, "رمز عبور باید حداقل 8 کاراکتر باشد");
//   .refine(
//     (value) => /[a-z]/.test(value),
//     "رمز عبور باید حداقل یک حرف کوچک داشته باشد"
//   )
//   .refine(
//     (value) => /[A-Z]/.test(value),
//     "رمز عبور باید حداقل یک حرف بزرگ داشته باشد"
//   )
//   .refine(
//     (value) => /[0-9]/.test(value),
//     "رمز عبور باید حداقل یک عدد داشته باشد"
//   );

export const phoneSchema = z
  .string()
  .length(11, "شماره تلفن باید 11 رقم باشد")
  .regex(/^09/, "شماره تلفن باید با 09 شروع شود")
  .refine(
    (value) => !isNaN(Number(value)),
    "شماره تلفن باید فقط شامل اعداد باشد"
  );

export const usernameSchema = z
  .string()
  .min(3, "نام کاربری باید حداقل 3 کاراکتر باشد")
  .max(30, "نام کاربری نباید بیشتر از 30 کاراکتر باشد");
//   .refine((value: string) => /^[a-zA-Z0-9_]+$/.test(value), "نام کاربری باید فقط شامل حروف الفبا، اعداد و زیرخط (_) باشد");
