const mongoose = require("mongoose");
const { User } = require("./model");
const utils = require("../misc/utils");

class UserDAO {
  async create({ email, password, isAdmin }) {
    
    // const user = new User({ email, password, isAdmin });
    const user = await User.create({ email, password, isAdmin })
    await user.save();

    return user.toObject();
  }
  
  async findById(id) {
    const user = await User.findById(id).lean();
    return user;
  }

  async findByEmail(email) {
    const users = await User.find({ email }).lean();
    if (users.length === 0) {
      return null;
    }
    return users[0];
  }

  async updateById (id, { email, password, isAdmin }) {
    const updatedUser = await User.findByIdAndUpdate(
        id, 
        {
            email,
            password,
            isAdmin,
        }, 
        {
            runValidators: true,
            new: true,
        }
    ).lean();

    return updatedUser;
  }

  async deleteById(id) {
    const deletedUser = await User.findByIdandDelete(id);
    return deletedUser;
  }

}

module.exports = new userDAO();
