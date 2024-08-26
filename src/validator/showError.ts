import { ZodError } from "zod";
import axios from "axios";
import { toast } from "react-toastify";
function alertErr(err: ZodError) {
  return err.issues.map((issue) => issue.message);
}

function handleError(error: unknown) {
  if (error instanceof ZodError) {
    const err = alertErr(error);
    toast.error(err?.[0]);
    console.log("Validation Error:", err);
  } else if (axios.isAxiosError(error)) {
    //TODO: for this block you need the backend to handle errors properly
    // const errResMsg = error.response?.data.body.message;
    // toast.error(errResMsg || error.message);
    toast.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    console.log("Axios Error:", error);
  } else {
    toast.error("خطایی رخ داد. لطفاً دوباره تلاش کنید.");
    console.log("Unexpected Error:", error);
  }
}

export default handleError;
