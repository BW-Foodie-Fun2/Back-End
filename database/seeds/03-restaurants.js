
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('restaurants')
    .then(function () {
      // Inserts seed entries
      return knex('restaurants').insert([
        {
          "name": "Five Guys",
          "cuisine_id": 1,
          "location": "Las Vegas, NV",
          "hours_of_operation": "11:00AM - 9:00PM",
          "img_url": "https://www.rd.com/wp-content/uploads/2019/02/five-guys.jpg",
          "created_by": "ethan"
        },
        {
          "name": "Egg Works",
          "cuisine_id": 3,
          "location": "Las Vegas, NV",
          "hours_of_operation": "7:00AM - 1PM",
          "img_url": "https://media-cdn.tripadvisor.com/media/photo-s/08/1b/0a/26/egg-works.jpg",
          "created_by": "josh"
        },
        {
          "name": "Zabas",
          "cuisine_id": 2,
          "location": "Las Vegas, NV",
          "hours_of_operation": "11:00AM - 9PM",
          "img_url": "https://s3-media2.fl.yelpcdn.com/bphoto/K5Y2LW7ayGM_InqMtXRNPg/o.jpg",
          "created_by": "kelly"
        },
      ]);
    });
};
