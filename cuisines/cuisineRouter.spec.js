const request = require("supertest");
const server = require("../api/server.js");

const db = require("../database/db-config");

describe('cuisines router', function() {
    it('should return an array of cuisines', function() {
        return request(server)
        .get('/api/cuisines')
        .then(res => {
            expect(Array.isArray(res.body)).toBe(true);
        })
    })
    it('should return status 200', function() {
        return request(server)
            .get('/api/cuisines')
            .then(res => {
                expect(res.status).toBe(200);
            })
    })
})