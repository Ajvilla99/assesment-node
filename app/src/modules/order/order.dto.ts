export interface CreateOrderDTO {
  clientId: number;
  warehouseId: number;
  items: { productId: number; quantity: number }[];
}

export interface UpdateOrderStatusDTO {
  id: number;
  status: 'pending' | 'in_comming' | 'delivered';
}
