'use strict';
const { app } = require('../../src/server'); 
const supertest = require('supertest');
const mockRequest = supertest(app);
process.env.SECRET = "TEST_SECRET";

const { sequelize } = require('../../src/auth/models/index');

let userData = {
    testUser: { username: 'user', password: 'password' },
  };
  let accessToken = null;

beforeAll(async () => {
    await sequelize.sync();
});

describe('Web server', () => {

    it('create a new user', async () => {

        const res = await mockRequest.post('/signup').send(userData.testUser);
        const user = res.body;
    
        expect(res.status).toBe(201);
        expect(user.username).toEqual(userData.testUser.username);
      });


      it.skip('signin with basic auth', async () => {
        let { username, password } = userData.testUser;
    
        const res = await mockRequest.post('/signin')
          .auth(username, password);
    
        const users = res.body;
        expect(res.status).toBe(200);
        console.log("<<<<<<<<<<<<",res.status);
        expect(users.token).toBeDefined();
        expect(users.username).toEqual(username);
      });
    
      it.skip('signin with bearer', async () => {
        let { username, password } = userData.testUser;
        const res = await mockRequest.post('/signin')
          .auth(username, password);
        accessToken = res.body.token;
        const bearer = await mockRequest
          .get('/User')
          .set('Authorization', `Bearer ${accessToken}`);
        expect(bearer.status).toBe(200);
      });
    
      it('basic fails with known user and wrong password ', async () => {
    
        const res = await mockRequest.post('/signin')
          .auth('test', 'test')
        const { user, token } = res.body;
    
        expect(res.status).toBe(403);
        expect(user).not.toBeDefined();
        expect(token).not.toBeDefined();
      });
    
      it('basic fails with unknown user', async () => {
    
        const res = await mockRequest.post('/signin')
          .auth('test', 'test')
        const { user, token } = res.body;
    
        expect(res.status).toBe(403);
        expect(user).not.toBeDefined();
        expect(token).not.toBeDefined();
      });
    
    
      it('Secret Route fails with invalid token', async () => {
        const res = await mockRequest.get('/test')
          .set('autho', `bearer test`);
    
        expect(res.status).toBe(404);
      });
    });
    
    afterAll(async () => {
      await sequelize.drop();
    });