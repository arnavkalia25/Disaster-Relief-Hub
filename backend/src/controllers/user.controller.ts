import { Response } from "express";
import User from "../models/user.model";
import { AuthRequest } from "../middleware/auth.middleware";

class UserController {
  async getProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const user = await User.findById(req.user.id).select("-password");

      if (!user) {
        res.status(404).json({
          success: false,
          message: "User not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch profile",
      });
    }
  }
}

export default new UserController();