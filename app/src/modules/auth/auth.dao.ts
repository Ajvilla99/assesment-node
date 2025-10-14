import { User } from './auth.model';

export const AuthDAO = {
  async findByUsernameOrEmail(usernameOrEmail: string) {
    return await User.findOne({
      where: {
        [User.sequelize!.Op.or]: [
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
