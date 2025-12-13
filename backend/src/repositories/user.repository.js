import MUser from "../models/user.model.js";

export default {
  async create(data) {
    return MUser.create(data);
  },

  async findAll() {
    return MUser.find().select("-password");
  },

  async findById(id) {
    return MUser.findById(id).select("-password");
  },

  async updateById(id, data) {
    return MUser.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    }).select("-password");
  },

  async deleteById(id) {
    return MUser.findByIdAndDelete(id);
  },

  async findByEmail(email) {
    return MUser.findOne({ email }).select("+password"); // Inclui senha para login
  },
};
