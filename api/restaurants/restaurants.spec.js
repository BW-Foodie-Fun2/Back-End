const request = require("supertest");
const server = require("../server.js");

const router = require("./restaurantRouter");

describe("GET /restaurants", function () {
    it("should return a 200 OK", function () {

        return request(server)
            .get("/api/restaurants")
            .then(res => {
                expect(res.status).toBe(200);
            });

    });

    it("should return a JSON", function () {
        return request(server)
            .get("/api/restaurants")
            .then(res => {
                expect(res.type).toMatch(/json/i);
            });
    });
});