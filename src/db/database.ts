import { type Task, type TaskIdParam } from "@/models/tasks.model";
import { type Knex, knex } from "knex";

const config: Knex.Config = {
    client: "sqlite3",
    connection: {
        filename: "src/mydb.sqlite3",
    },
    useNullAsDefault: true,
};

const knexInstance = knex(config);
const taskTable = knexInstance.table("task");

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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((row: any) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (row.count === 0) {
            return knexInstance("task").insert([{ name: "Task 1" }, { name: "Task 2" }, { name: "Task 3" }]);
        }
    })
    .then(() => {
        console.log("Tasks created");
    })
    .catch((err: Error) => {
        console.error(err);
    });

function handleError(err: unknown, message: string): never {
    if (err instanceof Error) {
        throw new Error(err.message);
    } else {
        throw new Error(message);
    }
}

export async function getTasks(): Promise<Task[]> {
    try {
        const tasks: Task[] = await knexInstance.select("*").from("task");
        return tasks;
    } catch (err) {
        handleError(err, "An error occurred while fetching all tasks");
    }
}

export async function getTask(id: string): Promise<TaskIdParam[]> {
    try {
        const task = await knexInstance.select("*").from("task").where({ id });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return task;
    } catch (err) {
        handleError(err, "An error occurred while fetching a task");
    }
}

export async function addTask(task: Task): Promise<void> {
    try {
        await taskTable.insert(task);
    } catch (err) {
        handleError(err, "An error occurred while adding a task");
    }
}

export async function updateTask(id: number, task: Task): Promise<void> {
    try {
        await taskTable.where({ id: id }).update(task);
    } catch (err) {
        handleError(err, "An error occurred while updating a task");
    }
}

export async function deleteTask(id: string): Promise<void> {
    try {
        await taskTable.where({ id }).del();
    } catch (err) {
        handleError(err, "An error occurred while deleting a task");
    }
}
