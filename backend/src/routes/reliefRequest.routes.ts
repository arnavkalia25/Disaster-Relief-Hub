import { Router } from "express";
import reliefRequestController from "../controllers/reliefRequest.controller";
import { authenticate } from "../middleware/auth.middleware";

const router = Router();

// Create a new relief request (Protected)
router.post(
  "/",
  authenticate,
  reliefRequestController.createRequest
);

// Get all relief requests (Public)
router.get(
  "/",
  reliefRequestController.getAllRequests
);

// Get a single relief request (Public)
router.get(
  "/:id",
  reliefRequestController.getRequestById
);

export default router;