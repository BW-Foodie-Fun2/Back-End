const request = require('supertest');
const server = require('../api/server');

const db = require('../database/db-config');

describe('reviews router', function() {
  // beforeAll(async () => {
  //   await db.raw('TRUNCATE TABLE restaurants RESTART IDENTITY CASCADE');
  //   await db.raw('TRUNCATE TABLE users RESTART IDENTITY CASCADE');
  // });
  describe('POST requests', function() {
    it("should create a review", function() {
      let restaurantID = "";
      return request(server)
        .post("/api/auth/register")
        .send({ username: "username", password: "12345", location: "location", email: "email@something.com"})
        .then((res) => {
          console.log(res.body.token)
        const token = res.body.token;
        console.log(token)

        return request(server)
        .post("/api/restaurants")
        .set("authorization", token)
        .send({
          name: "Restaurant",
          cuisine_id: "23",
          location: "New York, NY",
          hours_of_operation: "11:00AM - 11:00PM",
          image_url: "some url",
        })
        .then(res => {
          restaurantID = res.body.id
          return request(server)
            .post('/api/reviews')
            .set("authorization", token)
            .send({
              menu_item: "Rigatoni",
              item_price: "26.00",
              item_rating: 5,
              item_review: "Oil heat slowly. slices natural delicious, set aside magic tbsp skillet, bay leaves brown centerpiece. fruit soften edges frond slices onion snack pork steem on wines excess technique cup; Cover smoker soy sauce fruit snack. Sweet one-dozen scrape delicious, non sheet raw crunch mustard. Minutes clever slotted tongs scrape, brown steem undisturbed rice.",
              restaurant_id: `${restaurantID}`,
              item_image_url: "https://s3-media0.fl.yelpcdn.com/bphoto/fJTW1D_i6uWchht9Ev4WPQ/o.jpg",
              date_visited: "2020-02-4"
            })
            .then(res => {
              expect(res.status).toBe(201);
        })
      })
    })
    .catch(err => console.log(err))
  })
  it("creating a review should return status 400 without auth", function() {
        return request(server)
          .get('/api/restaurants')
          .then(res => {
            restaurantID = res.body[0]
        return request(server)
          .post('/api/reviews')
          .send({
            menu_item: "Rigatoni",
            item_price: "26.00",
            item_rating: 5,
            item_review: "Oil heat slowly. slices natural delicious, set aside magic tbsp skillet, bay leaves brown centerpiece. fruit soften edges frond slices onion snack pork steem on wines excess technique cup; Cover smoker soy sauce fruit snack. Sweet one-dozen scrape delicious, non sheet raw crunch mustard. Minutes clever slotted tongs scrape, brown steem undisturbed rice.",
            restaurant_id: `${restaurantID}`,
            item_image_url: "https://s3-media0.fl.yelpcdn.com/bphoto/fJTW1D_i6uWchht9Ev4WPQ/o.jpg",
            date_visited: "2020-02-4"
          })
          .then(res => {
            expect(res.status).toBe(400);
          })
      })
    })
    it('post request with missing data should return status 400', function() {
          return request(server)
          .post('/api/reviews')
          .send({
            menu_item: "Rigatoni",
            item_price: "26.00",
            item_rating: 5,
            item_review: "Oil heat slowly. slices natural delicious, set aside magic tbsp skillet, bay leaves brown centerpiece. fruit soften edges frond slices onion snack pork steem on wines excess technique cup; Cover smoker soy sauce fruit snack. Sweet one-dozen scrape delicious, non sheet raw crunch mustard. Minutes clever slotted tongs scrape, brown steem undisturbed rice.",
          })
          .then(res => {
            expect(res.status).toBe(400);
          })
        })
  })
    describe('GET requests', function() {
      it("GET /api/reviews should return an array of reviews", function() {
        return request(server)
        .get('/api/reviews')
        .then(res => {
          console.log(res.body)
          expect(Array.isArray(res.body)).toBe(true);
        })
      })
      it("GET /api/reviews should return status 200", function() {
        return request(server)
          .get('/api/reviews')
          .then(res => {
            expect(res.status).toBe(200);
        })
      })
      it("GET /api/reviews/:id should return status 200", function() {
        return request(server)
          .get('/api/reviews/1')
          .then(res => {
            expect(res.status).toBe(200);
        })
      })
      it("GET /api/reviews/:invalidId should return status 404", function() {
        return request(server)
          .get('/api/reviews/200')
          .then(res => {
            expect(res.status).toBe(404);
        })
      })
    })
    describe('PUT requests', function() {
      let reviewID = '';

      it("you need to be logged in to edit a review", function() {
        return request(server)
        .get('/api/reviews')
        .then(res => {
          reviewID = res.body[0].id

        return request(server)
        .put(`/api/reviews/${reviewID}`)
        .send({
          menu_item: "Rigatoni Vodka"
        })
        .then(res => {
          expect(res.status).toBe(400);
        })
      })
    })
    it("should not be able to update reviewed_by, created_at or updated_at", function() {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "username", password: "12345"})
        .then(res => {
          const token = res.body.token;

      return request(server)
        .put(`/api/reviews/${reviewID}`)
        .set("authorization", token)
        .send({
          menu_item: "Rigatoni Vodka",
          reviewed_by: "ethan",
          created_at: "2020-20-15",
          updated_at: "2020-20-15"
        })
        .then(res => {
          expect(res.body.created_by).not.toBe("ethan");
          expect(res.body.created_at).not.toBe("2020-20-15");
          expect(res.body.updated_at).not.toBe("2020-20-15");
        })
      })
    })
    it("PUT /api/reviews/:invalidId should return status 404", function() {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "username", password: "12345"})
        .then(res => {
          const token = res.body.token;

      return request(server)
        .put('/api/reviews/102')
        .set("authorization", token)
        .send({
          menu_item: "Rigatoni Vodka"
        })
        .then(res => {
          expect(res.status).toBe(404);
        })
      })
    })
  })
  describe('DELETE requests', function() {
    it("you need to be logged in to delete a review", function() {
      return request(server)
      .delete('/api/reviews/1')
      .then(res => {
        expect(res.status).toBe(400);
      })
    })
  
    it("DELETE /api/reviews/:invalidId should return status 404", function() {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "username", password: "12345"})
        .then(res => {
          const token = res.body.token;

      return request(server)
        .delete('/api/reviews/102')
        .set("authorization", token)
        .then(res => {
          expect(res.status).toBe(404);
        })
      })
    })
  })
})