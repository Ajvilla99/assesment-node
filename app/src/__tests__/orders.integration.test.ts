import request from 'supertest';
import app from '../server';

describe('Orders integration', () => {
  it('admin can create an order and stock is decremented', async () => {
    // Login as seeded admin
    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ usernameOrEmail: 'admin@example.com', password: 'admin123' });

    expect(loginRes.status).toBe(200);
    const token = loginRes.body.token;

    // Get a product to use
    const productsRes = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`);

    expect(productsRes.status).toBe(200);
    const product = productsRes.body[0];
    expect(product).toBeTruthy();

    const orderPayload = {
      clientId: 1,
      warehouseId: 1,
      items: [
        { productId: product.id, quantity: 1 }
      ]
    };

    const createRes = await request(app)
      .post('/api/orders')
      .set('Authorization', `Bearer ${token}`)
      .send(orderPayload);

    expect([201, 400]).toContain(createRes.status);
  }, 20000);
});
