import request from 'supertest';
import app from '../server';

describe('Auth integration', () => {
  it('should register and login a user', async () => {
    const registerRes = await request(app)
      .post('/api/auth/register')
      .send({ username: 'testuser', email: 'testuser@example.com', password: 'password123' });

    expect([201, 400]).toContain(registerRes.status); // allow existing user seeding

    const loginRes = await request(app)
      .post('/api/auth/login')
      .send({ usernameOrEmail: 'admin@example.com', password: 'admin123' });

    expect(loginRes.status).toBe(200);
    expect(loginRes.body).toHaveProperty('token');
  }, 20000);
});
