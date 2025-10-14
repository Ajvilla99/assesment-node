export interface CreateProductDTO {
  code: string;
  nombre: string;
  descripcion: string;
  stock: number;
}

export interface DeleteProductDTO {
  code: string;
}
