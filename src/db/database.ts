import { type Knex, knex } from "knex";

const config: Knex.Config = {
    client: "sqlite3",
    connection: {
        filename: "src/mydb.sqlite3",
    },
    useNullAsDefault: true,
};

export const knexInstance = knex(config);

knexInstance.schema
    .hasTable("task")
    .then((exists) => {
        if (!exists) {
            return knexInstance.schema
                .createTable("task", (table) => {
                    table.increments("id").primary();
                    table.string("description");
                    table.boolean("completed").defaultTo(false);
                })
                .then(() => {
                    console.log("> Table TASKS created successfully!");

                    return knexInstance("task").insert([{ description: "Task 1" }, { description: "Task 2" }, { description: "Task 3" }]);
                })
                .then(() => {
                    console.log("> Default tasks have been added to the Task table...");
                });
        }
    })
    .catch((error) => {
        console.error("Error creating table or inserting tasks:", error);
    });

knexInstance.schema
    .hasTable("users")
    .then((exists) => {
        if (!exists) {
            return knexInstance.schema
                .createTable("users", (table) => {
                    table.increments("id").primary();
                    table.string("name").notNullable();
                    table.string("email").notNullable().unique();
                    table.string("password").notNullable();
                })
                .then(() => {
                    console.log("> Table USERS created successfully!");

                    return knexInstance("users").insert([
                        { name: "User 1", email: "user1@example.com", password: "password1" },
                        { name: "User 2", email: "user2@example.com", password: "password2" },
                        { name: "User 3", email: "user3@example.com", password: "password3" },
                    ]);
                })
                .then(() => {
                    console.log("> 3 users have been added to the Users table...");
                });
        }
    })
    .catch((error) => {
        console.error("Error creating table or inserting users:", error);
    });
