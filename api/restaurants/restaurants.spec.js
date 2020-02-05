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
// describe("POST /restaurants", function () {
//     it("should return a 200 OK", function () {

//         return request(server)
//             .post("/api/restaurants")
//             .send({ username: "nicole1", password: "pass", })
//             .send({ name: "IHOP2", "cuisine_id": 1, "location": "San Diego, CA", "hours_of_operation": "9:00AM - 9:00PM", "img_url": "https://koreatownladirectory.com/wp-content/uploads/2015/02/nicoles-cafe-koreatown-plaza.jpg", "created_by": "nicole" })
//             .then(res => {
//                 expect(res.status).toBe(200);
//             });
//     });
// });