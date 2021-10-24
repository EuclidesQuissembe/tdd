import request from 'supertest';
import app from '../../src/app';
import connection from '../../src/database'

describe('Register', () => {

  beforeAll(async () => {
    await connection.create()
    await connection.clear()
  })

  afterAll(async () => await connection.close())

  it('should not register with empty body', async () => {
    const response = await request(app).post('/register').send({});

    expect(response.status).toBe(400);
  });

  it('should not register with some property missing', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Euclides',
      lastName: 'Bernardo',
      email: 'euclides@nzooji.com',
      password: '12345678'
    })

    expect(response.status).toBe(400)
  })

  it('should not register with bad email format', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Euclides',
      lastName: 'Bernardo',
      age: 20,
      email: 'euclides@nzooji.com.',
      password: '12345'
    })

    expect(response.status).toBe(400)
  })

  it('should not register with bad password format', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Euclides',
      lastName: 'Bernardo',
      age: 20,
      email: 'euclides@nzooji.com',
      password: '12345'
    })

    expect(response.status).toBe(400)
  })

  it('should register without email registered', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Euclides',
      lastName: 'Bernardo',
      age: 20,
      email: 'euclides@nzooji.com',
      password: '12345678'
    })

    expect(response.status).toBe(201)
  })

  it('should not register with email already registered', async () => {
    const response = await request(app).post('/register').send({
      firstName: 'Euclides',
      lastName: 'Bernardo',
      age: 20,
      email: 'euclides@nzooji.com',
      password: '12345678'
    })

    expect(response.status).toBe(500)
  })
});
