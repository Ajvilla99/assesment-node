import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDTO, RegisterDTO } from './auth.dto';

export const AuthController = {
  async login(req: Request, res: Response) {
    try {
      const data: LoginDTO = req.body;
      const result = await AuthService.login(data);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },

  async register(req: Request, res: Response) {
    try {
      const data: RegisterDTO = req.body;
      const result = await AuthService.register(data);
      res.status(201).json(result);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  },
};
