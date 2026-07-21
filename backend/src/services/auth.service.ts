import User, { IUser, UserRole } from "../models/user.model";
import { generateToken } from "../utils/jwt";

interface RegisterUserInput {
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  phone?: string;
}

interface LoginUserInput {
  email: string;
  password: string;
}

class AuthService {
  async registerUser(data: RegisterUserInput): Promise<IUser> {
    const existingUser = await User.findOne({ email: data.email });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const user = await User.create(data);

    return user;
  }

  async loginUser(data: LoginUserInput) {
    const user = await User.findOne({ email: data.email });

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordCorrect = await user.comparePassword(data.password);

    if (!isPasswordCorrect) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken({
      id: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    return {
      token,
      user,
    };
  }
}

export default new AuthService();