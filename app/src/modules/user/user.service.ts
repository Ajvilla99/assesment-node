import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthDAO } from './user.dao';
import { env } from '../../config/env';
import { LoginDTO, RegisterDTO, AuthResponseDTO } from './user.dto';

export const AuthService = {
  async login(data: LoginDTO): Promise<AuthResponseDTO> {
    const user = await AuthDAO.findByUsernameOrEmail(data.usernameOrEmail);
    if (!user) throw new Error('User not found');

    const validPassword = await bcrypt.compare(data.password, user.password);
    if (!validPassword) throw new Error('Invalid credentials');

    // Include role in the JWT payload
    const token = jwt.sign(
      { id: user.id, role: user.role },
      env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return {
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    };
  },

  async register(data: RegisterDTO): Promise<AuthResponseDTO> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await AuthDAO.createUser({
      username: data.username,
      email: data.email,
      password: hashedPassword,
      role: data.role || 'analyst',
    });

    const token = jwt.sign(
      { id: newUser.id, role: newUser.role },
      env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    return {
      token,
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      },
    };
  },
};
