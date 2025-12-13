import MCar from "../models/car.model.js";

export default {
  async create(data) {
    return MCar.create(data);
  },

  async findById(id) {
    return MCar.findById(id)
      .populate("createdBy", "name email")
      .populate("buyer", "name email");
  },

  async updateById(id, data) {
    return MCar.findByIdAndUpdate(id, data, { new: true })
      .populate("createdBy", "name email")
      .populate("buyer", "name email");
  },

  async deleteById(id) {
    return MCar.findByIdAndDelete(id);
  },

  async findByBrand(brand) {
    return MCar.find({ brand: new RegExp(brand, "i") })
      .populate("createdBy", "name email")
      .populate("buyer", "name email");
  },

  async findAvailable() {
    return MCar.find({ available: true })
      .populate("createdBy", "name email")
      .populate("buyer", "name email");
  },
};
