const request = require('supertest');
const server = require('../api/server');

const db = require('../database/db-config');

describe('users router', function() {
    it("GET /api/users/:username/reviews should return an array", function() {
          return request(server)
            .get('/api/users/ethan00/reviews')
            .then(res => {
              console.log(res.body)
              expect(Array.isArray(res.body)).toBe(true);
          })
      })
      it("GET /api/users/:username/restaurants should return status 200", function() {
        return request(server)
          .get('/api/users/ethan/restaurants')
          .then(res => {
            expect(res.status).toBe(200);
        })
        .catch(err => console.log(err))
      })
  it("GET /api/users/:username/restaurants should return an array", function() {
        return request(server)
          .get('/api/users/ethan/restaurants')
          .then(res => {
            expect(Array.isArray(res.body)).toBe(true);
        })
        .catch(err => console.log(err))
    })
  })