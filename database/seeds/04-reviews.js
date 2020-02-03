
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reviews')
    .then(function () {
      // Inserts seed entries
      return knex('reviews').insert([
        {
          "menu_item": "Mushroom Burger",
          "item_price": 8.00,
          "item_rating": 5,
          "restaurant_id": 1,
          "reviewed_by": "ethan",
          "item_review": "Nice well cooked shroom burger!",
          "item_image_url": "https://www.simplyrecipes.com/wp-content/uploads/2011/06/grilled-beef-mushroom-burgers-verrtical-a-1800.jpg",
          "date_visited": "2020-1-20"
        },
        {
          "menu_item": "Cheesy Bean Burrito",
          "item_price": 7.00,
          "item_rating": 3,
          "restaurant_id": 3,
          "reviewed_by": "kelly",
          "item_review": "Okay burrito, too cheesy.",
          "item_image_url": "https://images-gmi-pmc.edge-generalmills.com/074a3680-3adc-4aae-85f5-1e3a4f2caa34.jpg",
          "date_visited": "2020-1-10"
        },
        {
          "menu_item": "Cheesy eggs",
          "item_price": 6.50,
          "item_rating": 4,
          "restaurant_id": 2,
          "reviewed_by": "josh",
          "item_review": "Yeah it was okay.",
          "item_image_url": "https://www.mrbreakfast.com/images/1077_spicy_cheesy_eggs.jpg",
          "date_visited": "2020-1-05"
        },
      ]);
    });
};
