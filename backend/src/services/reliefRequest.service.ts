import ReliefRequest, {
  IReliefRequest,
} from "../models/reliefRequest.model";

interface CreateReliefRequestInput {
  title: string;
  description: string;
  category:
    | "food"
    | "water"
    | "medicine"
    | "shelter"
    | "rescue"
    | "other";
  urgency: "low" | "medium" | "high" | "critical";
  location: string;
  createdBy: string;
}

class ReliefRequestService {
  async createRequest(
    data: CreateReliefRequestInput
  ): Promise<IReliefRequest> {
    const request = await ReliefRequest.create({
      title: data.title,
      description: data.description,
      category: data.category,
      urgency: data.urgency,
      location: data.location,
      createdBy: data.createdBy,
    });

    return request;
  }

  async getAllRequests(): Promise<IReliefRequest[]> {
    return await ReliefRequest.find()
      .populate("createdBy", "fullName email")
      .populate("assignedVolunteer", "fullName email")
      .sort({ createdAt: -1 });
  }

  async getRequestById(id: string): Promise<IReliefRequest | null> {
    return await ReliefRequest.findById(id)
      .populate("createdBy", "fullName email")
      .populate("assignedVolunteer", "fullName email");
  }
}

export default new ReliefRequestService();