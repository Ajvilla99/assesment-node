export interface CreateWarehouseDTO {
  nombre: string;
  activa?: boolean;
}

export interface UpdateWarehouseStatusDTO {
  id: number;
  activa: boolean;
}
