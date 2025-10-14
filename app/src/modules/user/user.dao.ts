import { Op } from 'sequelize';
import { User } from './user.model';

export const AuthDAO = {
  async findByUsernameOrEmail(usernameOrEmail: string) {
    return await User.findOne({
      where: {
        [Op.or]: [
          { username: usernameOrEmail },
          { email: usernameOrEmail },
        ],
      },
    });
  },

  async createUser(data: Partial<User>) {
    return await User.create(data);
  },
};
