import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthDAO } from './auth.dao';
import { env } from '../../config/env';
import { LoginDTO, RegisterDTO, AuthResponseDTO } from './auth.dto';

export const AuthService = {
  async login(data: LoginDTO): Promise<AuthResponseDTO> {
    const user = await AuthDAO.findByUsernameOrEmail(data.usernameOrEmail);
    if (!user) throw new Error('User not found');

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user.id }, env.JWT_SECRET, { expiresIn: '1d' });

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };
  },

  async register(data: RegisterDTO): Promise<AuthResponseDTO> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await AuthDAO.createUser({
      username: data.username,
      email: data.email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser.id }, env.JWT_SECRET, { expiresIn: '1d' });

    return {
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    };
  },
};
