import Resource, { IResource } from "../models/resource.model";

interface CreateResourceInput {
  title: string;
  description: string;
  category:
    | "food"
    | "water"
    | "medicine"
    | "clothes"
    | "shelter"
    | "other";
  quantity: number;
  unit: string;
  location: string;
  expiryDate?: Date;
  createdBy: string;
}

class ResourceService {
  async createResource(
    data: CreateResourceInput
  ): Promise<IResource> {
    const resource = await Resource.create({
      title: data.title,
      description: data.description,
      category: data.category,
      quantity: data.quantity,
      unit: data.unit,
      location: data.location,
      expiryDate: data.expiryDate,
      createdBy: data.createdBy,
    });

    return resource;
  }

  async getAllResources(): Promise<IResource[]> {
    return await Resource.find()
      .populate("createdBy", "fullName email")
      .sort({ createdAt: -1 });
  }

  async getResourceById(id: string): Promise<IResource | null> {
    return await Resource.findById(id).populate(
      "createdBy",
      "fullName email"
    );
  }

  async updateResource(
    id: string,
    data: Partial<CreateResourceInput>
  ): Promise<IResource | null> {
    return await Resource.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).populate("createdBy", "fullName email");
  }

  async deleteResource(id: string): Promise<IResource | null> {
    return await Resource.findByIdAndDelete(id);
  }
}

export default new ResourceService();