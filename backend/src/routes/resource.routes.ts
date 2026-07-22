import { Router } from "express";
import resourceController from "../controllers/resource.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Create Resource (Protected)
router.post(
  "/",
  authenticate,
  resourceController.createResource
);

// Get All Resources (Public)
router.get(
  "/",
  resourceController.getAllResources
);

// Get Resource By ID (Public)
router.get(
  "/:id",
  resourceController.getResourceById
);

// Update Resource (Protected)
router.put(
  "/:id",
  authenticate,
  resourceController.updateResource
);

// Delete Resource (Protected)
router.delete(
  "/:id",
  authenticate,
  resourceController.deleteResource
);

export default router;