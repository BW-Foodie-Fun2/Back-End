const request = require("supertest");

const server = require("./server.js");

describe("server.js", function () {
    describe("environment", function () {
        it("should set environment to development", function () {
            expect(process.env.DB_ENV).toBe("development");
        });
    });

    describe("GET /", function () {
        it("should return a 200 OK", function () {

            return request(server)
                .get("/")
                .then(res => {
                    expect(res.status).toBe(200);
                });

        });
    })
    describe("POST /register", function () {
        it("should return a 201 OK", function () {

            return request(server)
                .post("/api/auth/register")
                .send({ username: "nicole19", email: "nicole19@email.com", password: "pass", location: "san diego, ca" }) //update with a new username and email for every test
                .then(res => {
                    expect(res.status).toBe(201);
                });

        });
    });
    describe("POST /login", function () {
        it("should return a 201 OK", function () {

            return request(server)
                .post("/api/auth/login")
                .send({ username: "nicole1", password: "pass",  })
                .then(res => {
                    expect(res.status).toBe(200);
                });

        });
    });
});