const request = require('supertest');

const server = require('./server');

const db = require('./database/connection');

describe('Server.js', () => {
    describe('Server Up and running', () => {
        it('should return 200 that server is up', async () => {
            const expectedStatusCode = 200;

            const response = await request(server).get('/');
            
            expect(response.status).toEqual(expectedStatusCode);
        });
    });
    /*
    describe('Registration', () =>{
        it('Should Register a user with a username and password', async () =>{
            const expectedStatusCode = 201;

            const response = await request(server).post('/api/auth/register').send({username: 'Nathan1', password: 'password'});

            expect(response.status).toEqual(expectedStatusCode)
        })

        it('should return 400 if paramaters not passed', async () => {
            const expectedStatusCode = 400;

            const response = await request(server).post('/api/auth/register')

            expect(response.status).toEqual(expectedStatusCode);
        });
        it('should return 400 if paramater is empty string', async () => {
            const expectedStatusCode = 400;

            const response = await request(server).post('/api/auth/register').send({username: '', password: 'password'})

            expect(response.status).toEqual(expectedStatusCode);
        });
    })

    describe('login', () =>{
        it('Should return 200 if provided with valid user and data', async () =>{
            const expectedStatusCode = 200;

            await request(server).post('/api/auth/register').send({username: 'Nathan1', password: 'password'})

            const response = await request(server).post('/api/auth/login').send({username: 'Nathan1', password: 'password'})

            expect(response.status).toEqual(expectedStatusCode);
        });

        it('Should return 400 if paramaters not passed', async () =>{
            const expectedStatusCode = 400;

            await request(server).post('/api/auth/register').send({username: 'Nathan1', password: 'password'})

            const response = await request(server).post('/api/auth/login')

            expect(response.status).toEqual(expectedStatusCode);
        })
        it('Should return 400 if paramaters are empty string', async () =>{
            const expectedStatusCode = 400;

            await request(server).post('/api/auth/register').send({username: 'Nathan1', password: 'password'})

            const response = await request(server).post('/api/auth/login').send({username: '', password: 'password'})

            expect(response.status).toEqual(expectedStatusCode);
        })
    })
    */
});