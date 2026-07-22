import { Request, Response } from "express";
import { AuthRequest } from "../middleware/auth.middleware";
import resourceService from "../services/resource.service";

class ResourceController {
  async createResource(
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

      const resource = await resourceService.createResource({
        ...req.body,
        createdBy: req.user.id,
      });

      res.status(201).json({
        success: true,
        message: "Resource created successfully",
        data: resource,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to create resource",
      });
    }
  }

  async getAllResources(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const resources = await resourceService.getAllResources();

      res.status(200).json({
        success: true,
        count: resources.length,
        data: resources,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch resources",
      });
    }
  }

  async getResourceById(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const resource = await resourceService.getResourceById(
        req.params.id
      );

      if (!resource) {
        res.status(404).json({
          success: false,
          message: "Resource not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: resource,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to fetch resource",
      });
    }
  }

  async updateResource(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const resource = await resourceService.updateResource(
        req.params.id,
        req.body
      );

      if (!resource) {
        res.status(404).json({
          success: false,
          message: "Resource not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Resource updated successfully",
        data: resource,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to update resource",
      });
    }
  }

  async deleteResource(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const resource = await resourceService.deleteResource(
        req.params.id
      );

      if (!resource) {
        res.status(404).json({
          success: false,
          message: "Resource not found",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Resource deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to delete resource",
      });
    }
  }
}

export default new ResourceController();