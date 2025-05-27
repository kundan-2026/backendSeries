import { asyncHandler } from "../utils/asyncHandler.js";
import { APIError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResopnes.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// Utility to generate tokens
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessTocken();
    const refreshToken = user.generateRefreshTocken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new APIError(500, "Failed to generate tokens");
  }
};

// ==================== REGISTER USER ====================
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, username, password } = req.body;

  if ([fullName, email, username, password].some((field) => !field?.trim())) {
    throw new APIError(400, "All fields are required");
  }

  const existedUser = await User.findOne({
    $or: [{ username: username.toLowerCase() }, { email }],
  });
  if (existedUser) {
    throw new APIError(409, "Username or Email already exists");
  }

  // Validate files
  if (!req.files?.avatar || req.files.avatar.length === 0) {
    throw new APIError(400, "Avatar is required");
  }

  const avatarPath = req.files.avatar[0].path;
  const coverPath = req.files?.coverImage?.[0]?.path;

  // Upload to Cloudinary
  let avatar, coverImage;
  try {
    avatar = await uploadOnCloudinary(avatarPath);
    if (!avatar?.url) throw new Error("Avatar upload failed");

    if (coverPath) {
      coverImage = await uploadOnCloudinary(coverPath);
    }
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new APIError(500, "Failed to upload image(s)");
  }

  const user = await User.create({
    fullName,
    email,
    username: username.toLowerCase(),
    password,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
  });

  const sanitizedUser = await User.findById(user._id).select("-password -refreshToken");
  if (!sanitizedUser) throw new APIError(500, "User creation failed");

  return res.status(201).json(
    new ApiResponse(201, sanitizedUser, "User registered successfully")
  );
});

// ==================== LOGIN USER ====================
const loginUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  if (!email && !username) {
    throw new APIError(400, "Email or Username is required");
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) throw new APIError(404, "User not found");

  const isMatch = await user.isPasswordCorrect(password);
  if (!isMatch) throw new APIError(401, "Invalid credentials");

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id);

  const sanitizedUser = await User.findById(user._id).select("-password -refreshToken");

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { user: sanitizedUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

// ==================== LOGOUT USER ====================
const logoutUser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { refreshToken: undefined });

  const cookieOptions = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", cookieOptions)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
});

export { registerUser, loginUser, logoutUser };
