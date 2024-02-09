/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Task } from "@/models/tasks.model";
import { type Knex, knex } from "knex";

const config: Knex.Config = {
    client: "sqlite3",
    connection: {
        filename: "src/mydb.sqlite3",
    },
    useNullAsDefault: true,
};

const knexInstance = knex(config);

knexInstance.schema
    .hasTable("task")
    .then(function (exists) {
        if (!exists) {
            return knexInstance.schema.createTable("task", function (table) {
                table.increments("id");
                table.string("name");
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
    .then((row: any) => {
        if (row.count === 0) {
            return knexInstance("task").insert([{ name: "Task 1" }, { name: "Task 2" }, { name: "Task 3" }]);
        }
    })
    .then(() => {
        console.log("Tasks created");
    })
    .catch((err: any) => {
        console.error(err);
    });

export async function getTasks() {
    try {
        const tasks: Task[] = await knexInstance.select("*").from("task");
        return tasks;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(err.message);
        } else {
            throw new Error("An error occurred while fetching tasks");
        }
    }
}
