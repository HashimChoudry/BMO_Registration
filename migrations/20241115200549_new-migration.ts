import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("signUpData", (table) => {
    table.increments("id").primary();
    table.string("first_name", 255).notNullable();
    table.string("second_name", 255).notNullable();
    table.string("contact_number", 15).notNullable();
    table.string("business_name", 255).notNullable();
    table.string("business_email", 255).unique().notNullable();
    table.string("business_address_street", 255).notNullable();
    table.string("business_address_city", 255).notNullable();
    table.string("business_address_postcode", 10).notNullable();
    table
      .string("business_address_country", 255)
      .defaultTo("United Kingdom")
      .notNullable();
    table.string("business_website", 255).notNullable();
    table.string("business_logo_url",500).nullable();
    table.boolean("email_consent").notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now()).notNullable().index();
    table.timestamp("updatedAt").defaultTo(knex.fn.now()).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable("signUpData")
}

