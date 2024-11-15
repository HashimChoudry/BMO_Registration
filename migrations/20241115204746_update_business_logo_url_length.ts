import type { Knex } from "knex";


exports.up = function(knex:Knex) {
    return knex.schema.alterTable('signUpData', function(table) {
      table.text('business_logo_url').alter();  // Change column type to TEXT
    });
  };
  
  exports.down = function(knex:Knex) {
    return knex.schema.alterTable('signUpData', function(table) {
      table.string('business_logo_url', 255).alter();  // Revert to VARCHAR(255)
    });
  }; 