import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResopnes.js";

const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation for not empty
  // check if user already exist : by email or username
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user objects - create entry in db
  // remove password and reference token field from response
  // check for user creation
  // return res

  const { fullName, email, username, password } = req.body;
  console.log("fullName: ", fullName);
  console.log("email: ", email);
  console.log("userName: ", username);
  console.log("password: ", password);

  // if (fullName === "") {
  //   throw new APIError(400, "fullName is required");
  // }

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new APIError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new APIError(409, "Username or Email already exist");
  }

  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage[0]?.path;

  if (!avatarLocalPath) {
    return res.status(400).json(new APIError(400, "Avatar file is required"));
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new APIError(400, "Avatar files is required");
  }

  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  const createduser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createduser) {
    throw new APIError(500, "Something went wrong while registering the user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createduser, "User registered successfully"));
});

export { registerUser };
