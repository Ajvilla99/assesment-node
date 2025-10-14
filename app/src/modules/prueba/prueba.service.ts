// prueba.service.ts
import { PruebaDAO } from './prueba.dao';

export class PruebaService {
  private dao = new PruebaDAO();

  async getAll() {
    return this.dao.findAll();
  }
}
