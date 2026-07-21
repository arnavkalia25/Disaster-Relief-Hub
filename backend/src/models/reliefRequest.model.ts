import mongoose, { Document, Model, Schema } from "mongoose";

export enum RequestCategory {
  FOOD = "food",
  WATER = "water",
  MEDICINE = "medicine",
  SHELTER = "shelter",
  RESCUE = "rescue",
  OTHER = "other",
}

export enum RequestUrgency {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical",
}

export enum RequestStatus {
  PENDING = "pending",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export interface IReliefRequest extends Document {
  title: string;
  description: string;
  category: RequestCategory;
  urgency: RequestUrgency;
  status: RequestStatus;
  location: string;
  createdBy: mongoose.Types.ObjectId;
  assignedVolunteer?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const reliefRequestSchema = new Schema<IReliefRequest>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: Object.values(RequestCategory),
      required: true,
    },

    urgency: {
      type: String,
      enum: Object.values(RequestUrgency),
      default: RequestUrgency.MEDIUM,
    },

    status: {
      type: String,
      enum: Object.values(RequestStatus),
      default: RequestStatus.PENDING,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    assignedVolunteer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const ReliefRequest: Model<IReliefRequest> =
  mongoose.models.ReliefRequest ||
  mongoose.model<IReliefRequest>("ReliefRequest", reliefRequestSchema);

export default ReliefRequest;