import { type Knex, knex } from "knex";
import { getHashedPassword } from "@/utils/hashPassword";

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
                    table.string("confirmPassword").notNullable(); // might have to be optional when user signin for example??
                })
                .then(async () => {
                    console.log("> Table USERS created successfully!");

                    return knexInstance("users").insert([
                        {
                            name: "User 1",
                            email: "user1@example.com",
                            password: await getHashedPassword("password1"),
                            confirmPassword: await getHashedPassword("password1"),
                        },
                        {
                            name: "User 2",
                            email: "user2@example.com",
                            password: await getHashedPassword("password2"),
                            confirmPassword: await getHashedPassword("password2"),
                        },
                        {
                            name: "User 3",
                            email: "user3@example.com",
                            password: await getHashedPassword("password3"),
                            confirmPassword: await getHashedPassword("password3"),
                        },
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
