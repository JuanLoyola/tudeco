import 'dotenv/config';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { TestAppModule } from './test-app.module.js';

describe('Articles E2E', () => {
  let app: INestApplication;
  let articleId: number;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestAppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('GET /articles should return paginated articles', async () => {
    const response = await request(app.getHttpServer())
      .get('/articles')
      .expect(200);

    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toBeInstanceOf(Array);

    expect(response.body).toHaveProperty('pagination');
    expect(response.body.pagination).toEqual(
      expect.objectContaining({
        page: 1,
        limit: 10,
      }),
    );
  });

  it('GET /articles should support pagination', async () => {
    const response = await request(app.getHttpServer())
      .get('/articles?page=1&limit=2')
      .expect(200);

    expect(response.body.pagination.page).toBe(1);
    expect(response.body.pagination.limit).toBe(2);
    expect(response.body.data.length).toBeLessThanOrEqual(2);
  });

  it('GET /articles should search by name', async () => {
    const response = await request(app.getHttpServer())
      .get('/articles?search=ondulada')
      .expect(200);

    expect(response.body.data).toBeInstanceOf(Array);

    response.body.data.forEach((article: any) => {
      expect(article.name.toLowerCase()).toContain('ondulada');
    });
  });

  it('GET /articles should reject invalid limit', async () => {
    const response = await request(app.getHttpServer())
      .get('/articles?limit=200')
      .expect(400);

    expect(response.body.statusCode).toBe(400);
  });

  it('POST /articles should create an article', async () => {
    const response = await request(app.getHttpServer())
      .post('/articles')
      .send({
        name: 'E2E Test Lamp',
        category: 'Test',
        description: 'Created by E2E test',
        price: 9999,
        stock: 5,
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('E2E Test Lamp');

    articleId = response.body.id;
  });

  it('GET /articles/:id should return the created article', async () => {
    const response = await request(app.getHttpServer())
      .get(`/articles/${articleId}`)
      .expect(200);

    expect(response.body.id).toBe(articleId);
  });

  it('PATCH /articles/:id should update the article', async () => {
    const response = await request(app.getHttpServer())
      .patch(`/articles/${articleId}`)
      .send({
        price: 12000,
        stock: 3,
      })
      .expect(200);

    expect(response.body.stock).toBe(3);
  });

  it('DELETE /articles/:id should delete the article', async () => {
    const response = await request(app.getHttpServer())
      .delete(`/articles/${articleId}`)
      .expect(200);

    expect(response.body.id).toBe(articleId);
  });

  it('GET /articles/:id should return 404 after deletion', async () => {
    const response = await request(app.getHttpServer())
      .get(`/articles/${articleId}`)
      .expect(404);

    expect(response.body.statusCode).toBe(404);
  });

  it('POST /articles should reject invalid data', async () => {
    const response = await request(app.getHttpServer())
      .post('/articles')
      .send({
        name: '',
        category: '',
        price: -100,
        stock: -5,
      })
      .expect(400);

    expect(response.body.statusCode).toBe(400);
    expect(response.body.message).toBeInstanceOf(Array);
  });
});
