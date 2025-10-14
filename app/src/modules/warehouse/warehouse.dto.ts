export interface CreateWarehouseDTO {
  name: string;
  isActive?: boolean;
}

export interface UpdateWarehouseStatusDTO {
  id: number;
  isActive: boolean;
}
