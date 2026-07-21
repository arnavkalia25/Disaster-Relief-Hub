import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

export enum UserRole {
  VICTIM = "victim",
  VOLUNTEER = "volunteer",
  NGO_ADMIN = "ngo_admin",
  SUPER_ADMIN = "super_admin",
}

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;

  comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.VICTIM,
      required: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare entered password with hashed password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;