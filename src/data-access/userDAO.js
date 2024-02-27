const { User } = require("./model");

class UserDAO {
  async create({ email, password, user_name, phone_number, address, address_detail, isAdmin }) {
    
    // const user = new User({ email, password, isAdmin });
    const user = await User.create({ email, password, user_name, phone_number, address, address_detail, isAdmin })
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

  async updateById (id, { email, password, user_name, phone_number, address, address_detail, isAdmin }) {
    const updatedUser = await User.findByIdAndUpdate(
        id, 
        {
          email, password, user_name, phone_number, address, address_detail, isAdmin
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

  //admin용 전체 회원내역 get
  async allUsers() {
    const users = await User.find({}).lean();
    return users
  }

}

module.exports = new UserDAO();
