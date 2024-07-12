import { z } from "zod";

export const createBannerSchema = (
  allowedHeight: number,
  allowedWidth: number
) =>
  z.object({
    size: z.number().max(200000, "حجم تصویر باید کمتر از 200 کیلوبایت باشد"),
    type: z
      .string()
      .refine((type) => ["image/jpeg", "image/png"].includes(type), {
        message: "فقط تصاویر JPEG و PNG مجاز هستند",
      }),
    height: z
      .number()
      .refine(
        (height) =>
          height >= allowedHeight - 10 && height <= allowedHeight + 10,
        {
          message: `ارتفاع تصویر باید بین ${allowedHeight - 10} تا ${
            allowedHeight + 10
          } پیکسل باشد`,
        }
      ),
    width: z
      .number()
      .refine(
        (width) => width >= allowedWidth - 10 && width <= allowedWidth + 10,
        {
          message: `طول تصویر باید بین ${allowedWidth - 10} تا ${
            allowedWidth + 10
          } پیکسل باشد`,
        }
      ),
  });
