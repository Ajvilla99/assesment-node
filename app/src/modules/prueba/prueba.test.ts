// prueba.test.ts
import request from 'supertest';
import app from '../../server';

describe('Prueba Module', () => {
  it('should return 200 on GET /api/prueba', async () => {
    const res = await request(app).get('/api/prueba');
    expect(res.statusCode).toBe(200);
  });
});
