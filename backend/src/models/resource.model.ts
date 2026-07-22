import mongoose, { Document, Model, Schema } from "mongoose";

export enum ResourceCategory {
  FOOD = "food",
  WATER = "water",
  MEDICINE = "medicine",
  CLOTHES = "clothes",
  SHELTER = "shelter",
  OTHER = "other",
}

export enum ResourceStatus {
  AVAILABLE = "available",
  RESERVED = "reserved",
  DISTRIBUTED = "distributed",
}

export interface IResource extends Document {
  title: string;
  description: string;
  category: ResourceCategory;
  quantity: number;
  unit: string;
  location: string;
  status: ResourceStatus;
  expiryDate?: Date;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const resourceSchema = new Schema<IResource>(
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
      enum: Object.values(ResourceCategory),
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
      min: 0,
    },

    unit: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      enum: Object.values(ResourceStatus),
      default: ResourceStatus.AVAILABLE,
    },

    expiryDate: {
      type: Date,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Resource: Model<IResource> =
  mongoose.models.Resource ||
  mongoose.model<IResource>("Resource", resourceSchema);

export default Resource;