import * as dao from './product.dao';
import { CreateProductDTO } from './product.dto';

export const ProductService = {
  async createProduct(data: CreateProductDTO) {
    return dao.createProduct(data);
  },

  async getProductByCode(code: string) {
    return dao.findProductByCode(code);
  },

  async getAllProducts() {
    return dao.findAllProducts();
  },

  async deleteProduct(code: string) {
    const product = await dao.findProductByCode(code);
    if (!product) throw new Error('Product not found');
    await dao.logicalDeleteProduct(code);
    return { ...product.toJSON(), deleted: true };
  },
};
