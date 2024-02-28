const { User } = require("./model");

class UserDAO {
  async create({ email, password, user_name, phone_number, address, address_detail, postal_code, isAdmin }) {
    
    // const user = new User({ email, password, isAdmin });
    const user = await User.create({ email, password, user_name, phone_number, address, address_detail, postal_code, isAdmin })
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

  // user용 회원정보 patch
  async updateById (id, { password, user_name, address, address_detail }) {
    const updatedUser = await User.findByIdAndUpdate(
        id, 
        {
          password, user_name, address, address_detail
        }, 
        {
            runValidators: true,
            new: true,
        }
    ).lean();

    return updatedUser;
  }

  // user용 회원정보 delete
  async deleteById(id) {
    const deletedUser = await User.findByIdAndDelete(id);
    return deletedUser;
  }

  //admin용 전체 회원내역 get
  async allUsers() {
    const users = await User.find({}).lean();
    return users
  }

}

module.exports = new UserDAO();
