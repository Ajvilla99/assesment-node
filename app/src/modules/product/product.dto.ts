export interface CreateProductDTO {
  code: string;
  name: string;
  description: string;
  stock: number;
}

export interface DeleteProductDTO {
  code: string;
}
