import { Request, Response } from "express";
import reliefRequestService from "../services/reliefRequest.service";
import { AuthRequest } from "../middleware/auth.middleware";

class ReliefRequestController {
  async createRequest(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
        return;
      }

      const request = await reliefRequestService.createRequest({
        ...req.body,
        createdBy: req.user.id,
      });

      res.status(201).json({
        success: true,
        message: "Relief request created successfully",
        data: request,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create relief request",
      });
    }
  }

  async getAllRequests(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const requests = await reliefRequestService.getAllRequests();

      res.status(200).json({
        success: true,
        count: requests.length,
        data: requests,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch relief requests",
      });
    }
  }

  async getRequestById(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const request = await reliefRequestService.getRequestById(
        req.params.id
      );

      if (!request) {
        res.status(404).json({
          success: false,
          message: "Relief request not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: request,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch relief request",
      });
    }
  }
}

export default new ReliefRequestController();