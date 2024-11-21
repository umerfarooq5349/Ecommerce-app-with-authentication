import User from "../../model/users_model";
import catchAsync from "../../utils/catchAsync";
import jwt from "jsonwebtoken";
import AppError from "../errors/appErrors";
import { promisify } from "util";
import { NextFunction, Request, Response } from "express";

interface AuthenticatedRequest extends Request {
  user?: any; // Define a more specific user type if available
}

const protectedRoute = catchAsync(async (req, res, next) => {
  //geting token and check it is textUnderlinePosition:
  let cookieToken, bearerToken;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    bearerToken = req.headers.authorization.split(" ")[1];
  }
  cookieToken = req.cookies["jwt"];
  let userId;

  // Use cookieToken (JWT) if available, otherwise fallback to bearerToken
  if (cookieToken) {
    // Verify and decode the JWT token to extract the user ID
    const decoded = jwt.verify(cookieToken, process.env.JWT_SECRET!) as {
      id: string;
    };
    userId = decoded.id;
  } else if (bearerToken) {
    // Bearer token directly represents the user ID
    userId = bearerToken;
  }

  // If no valid token is found, return an error
  if (!userId) {
    return next(
      new AppError("You are not logged in! Please provide a valid token.", 401)
    );
  }

  // check if user still exists

  const logedIn_user = await User.findById(userId);

  if (!logedIn_user) {
    return next(new AppError("User not found", 404));
  }
  req.body.currentUser = logedIn_user;
  // check if user changed password after token issued
  next();
});

const restrictTo = (...roles: string[]) => {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You are not authorized to perform this action", 403)
      );
    }
    next();
  };
};

export { protectedRoute, restrictTo };
