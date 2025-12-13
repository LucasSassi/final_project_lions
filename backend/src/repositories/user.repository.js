import MUser from "../models/user.model.js";

export default {
  create(data) {
    return MUser.create(data);
  },
  findAll() {
    return MUser.find();
  },
  findById(id) {
    return MUser.findById(id);
  },
  updateById(id, data) {
    return MUser.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  },
  deleteById(id) {
    return MUser.findByIdAndDelete(id);
  },
  findByEmail(email) {
    return MUser.findOne({ email });
  },
};
