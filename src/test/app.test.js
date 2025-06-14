const request = require('supertest');
const app = require('../app');

describe('Enterprise API Tests', () => {
  it('GET /health should return 200 and healthy status', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('healthy');
    expect(res.body.timestamp).toBeDefined();
  });

  it('GET /api/v1/hello should return welcome message', async () => {
    const res = await request(app).get('/api/v1/hello');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toContain('Enterprise');
    expect(res.body.version).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('GET /nonexistent should return 404', async () => {
    const res = await request(app).get('/nonexistent');
    expect(res.statusCode).toBe(404);
  });
});
