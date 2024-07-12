import { ZodError } from "zod";
function alertErr(err: unknown) {
  if (err instanceof ZodError) {
    return err.issues.map((issue) => issue.message);
  }
}

export default alertErr;

// schema example:
// ZodError: [
//     {
//       "code": "too_small",
//       "minimum": 12,
//       "type": "string",
//       "inclusive": true,
//       "exact": true,
//       "message": "Phone number should be 12 digits long",
//       "path": []
//     },
//     {
//       "validation": "regex",
//       "code": "invalid_string",
//       "message": "Phone number should start with 09",
//       "path": []
//     }
//   ]
