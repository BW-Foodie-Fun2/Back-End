
exports.up = function(knex) {
    return knex.schema.createTable('cuisines', tbl => {
        tbl.increments();
        tbl.string('name', 255)
          .notNullable()
          .unique();
    })
    .createTable('restaurants', tbl => {
        tbl.increments();
        tbl.string('name', 255)
          .notNullable()
        tbl.integer('cuisine_id')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('cuisines')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        tbl.string('location', 255)
          .notNullable();
        tbl.string('hours_of_operation')
          .notNullable();
        tbl.string('img_url', 255)
          .notNullable();
        tbl.string('created_by')
          .unsigned()
          .notNullable()
          .references('username')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
        tbl.timestamp('created_at').defaultTo(knex.fn.now())
        tbl.timestamp('updated_at').defaultTo(knex.fn.now())
    })
      .createTable('reviews', tbl => {
          tbl.increments();
          tbl.string('menu_item', 255)
          .notNullable();
          tbl.decimal('item_price')
          .notNullable();
          tbl.integer('item_rating')
          .notNullable();
          tbl.string('item_review', 1000)
          .notNullable();
          tbl.integer('restaurant_id')
          .notNullable()
          .references('id')
          .inTable('restaurants')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
          tbl.string('reviewed_by')
          .notNullable()
          .references('username')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
          tbl.string('item_image_url', 255)
          .notNullable()
          tbl.datetime('created_at').defaultTo(knex.fn.now())
          tbl.datetime('updated_at').defaultTo(knex.fn.now())
      })
  };
  
  exports.down = function(knex) {
      return knex.schema
        .dropTableIfExists('reviews')
        .dropTableIfExists('restaurants')
        .dropTableIfExists('cuisines')
        .dropTableIfExists('created_at')
        .dropTableIfExists('updated_at')
  };