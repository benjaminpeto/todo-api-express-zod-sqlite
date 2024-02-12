/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
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
                // rename col to descriptions
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

export async function getTasks(limit: number, offset: number): Promise<Task[]> {
    try {
        const tasks: Task[] = await knexInstance.select("*").from("task").limit(limit).offset(offset);
        return tasks;
    } catch (err) {
        handleError(err, "An error occurred while fetching all tasks");
    }
}
export async function getTask(id: number): Promise<TaskIdParam[]> {
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
        const newTask = { ...task, completed: false };
        await taskTable.insert(newTask);
    } catch (err) {
        handleError(err, "An error occurred while adding a task");
    }
}

export async function updateTask(id: number, task: Task): Promise<void> {
    try {
        const existingTask = await taskTable.where({ id });
        if (!existingTask || Object.keys(existingTask).length === 0) {
            throw new Error(`Task with ID ${id} does not exist`);
        } else {
            await taskTable.where({ id }).update(task);
        }
    } catch (err) {
        handleError(err, "An error occurred while updating a task");
    }
}

export async function deleteTask(id: number): Promise<void> {
    try {
        const task = await taskTable.where({ id }).first();
        if (!task || Object.keys(task).length === 0) {
            throw new Error(`Task with ID ${id} does not exist`);
        } else {
            await taskTable.where({ id }).del();
        }
    } catch (err) {
        handleError(err, "An error occurred while deleting a task");
    }
}
