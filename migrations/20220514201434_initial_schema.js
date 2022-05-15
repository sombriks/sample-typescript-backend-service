/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable('users', (tableBuilder) => {
      // tableBuilder.increments('id');
      tableBuilder.uuid('id').unique();
      tableBuilder.timestamps();
    })
    .createTable('payments', (tableBuilder) => {
      tableBuilder.uuid('id').unique();
      tableBuilder
        .uuid('user_id')
        .unique()
        .notNullable()
        .references('users.id')
        .onDelete('cascade');
      tableBuilder.timestamp('created_at');
      tableBuilder.string('description').notNullable();
      tableBuilder
        .string('currency', 3)
        .notNullable()
        .checkIn(['USD', 'CAD', 'GBP', 'EUR', 'BRL']);
      tableBuilder.decimal('amount', 10, 2).notNullable().checkPositive();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('payments').dropTable('users');
};
