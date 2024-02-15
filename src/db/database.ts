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
    .then(function (exists) {
        if (!exists) {
            return knexInstance.schema.createTable("task", function (table) {
                table.increments("id");
                table.string("description");
                table.boolean("completed").defaultTo(false);
            });
        }
    })
    .then(() => {
        console.log("Table created");
    })
    .catch((err: unknown) => {
        console.log(err);
    });

knexInstance("task")
    .count("* as count")
    .first()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((row: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (row.count === 0) {
            return knexInstance("task").insert([{ description: "Task 1" }, { description: "Task 2" }, { description: "Task 3" }]);
        }
    })
    .then(() => {
        console.log("Tasks created");
    })
    .catch((err: Error) => {
        console.error(err);
    });
