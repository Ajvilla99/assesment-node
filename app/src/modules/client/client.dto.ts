export interface CreateClientDTO {
  dni: string;
  name: string;
  email: string;
}

export interface FindClientByDniDTO {
  dni: string;
}
