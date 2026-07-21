import { Request, Response } from "express";
import authService from "../services/auth.service";

class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const user = await authService.registerUser(req.body);

      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          phone: user.phone,
          isVerified: user.isVerified,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error ? error.message : "Registration failed",
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { token, user } = await authService.loginUser(req.body);

      res.status(200).json({
        success: true,
        message: "Login successful",
        token,
        user: {
          id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
          phone: user.phone,
          isVerified: user.isVerified,
        },
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error instanceof Error ? error.message : "Login failed",
      });
    }
  }
}

export default new AuthController();