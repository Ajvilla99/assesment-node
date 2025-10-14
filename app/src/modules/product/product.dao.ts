import { Product } from './product.model';
import { CreateProductDTO } from './product.dto';

export const createProduct = async (data: CreateProductDTO) => {
  return Product.create({
    code: data.code,
    nombre: data.nombre,
    descripcion: data.descripcion,
    stock: data.stock,
  });
};

export const findProductByCode = async (code: string) => {
  return Product.findOne({ where: { code } });
};

export const findAllProducts = async () => {
  return Product.findAll();
};

export const logicalDeleteProduct = async (code: string) => {
  return Product.update({ deleted: true }, { where: { code } });
};
