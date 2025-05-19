import { asyncHandler } from "../utils/asyncHandler.js";

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Hey Kundan, Your api is working perfectly !!!",
  });
});

export { registerUser };
