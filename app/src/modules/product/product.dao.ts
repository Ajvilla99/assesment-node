import { Product } from './product.model';
import { CreateProductDTO } from './product.dto';

export const createProduct = async (data: CreateProductDTO) => {
  return Product.create({
    code: data.code,
    name: data.name,
    description: data.description,
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
  return Product.update({ isDeleted: true }, { where: { code } });
};
