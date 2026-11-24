const request = require('supertest');
const app = require('../app');

describe('Web app API', () => {
  test('GET /api/info returns welcome message', async () => {
    const res = await request(app).get('/api/info');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('CODERWANDA');
  });

  test('register a new user', async () => {
    const res = await request(app).post('/api/register')
      .send({ username: 'alice', password: '1234' });
    expect(res.statusCode).toBe(201);
  });

  test('duplicate registration is rejected', async () => {
    const res = await request(app).post('/api/register')
      .send({ username: 'alice', password: '1234' });
    expect(res.statusCode).toBe(409);
  });

  test('login works with correct credentials', async () => {
    const res = await request(app).post('/api/login')
      .send({ username: 'alice', password: '1234' });
    expect(res.statusCode).toBe(200);
  });

  test('login fails with wrong password', async () => {
    const res = await request(app).post('/api/login')
      .send({ username: 'alice', password: 'wrong' });
    expect(res.statusCode).toBe(401);
  });
});