export interface LoginDTO {
  usernameOrEmail: string;
  password: string;
}

export interface RegisterDTO {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponseDTO {
  token: string;
  message?: string;
  user: {
    id: number;
    username: string;
    email: string;
  };
}
