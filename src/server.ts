import express, { type Request, type Response, type Application, type Router } from "express";
import { validate } from "./middlewares/zod.middleware";
import getAllUsersRouter from "./routes/users/getAllUsers";
import getAllTasksRouter from "./routes/tasks/getAllTasks";
import getSingleTaskRouter from "./routes/tasks/getSingleTask";
import createTaskRouter from "./routes/tasks/createTask";
import updateTaskRouter from "./routes/tasks/updateTask";
import deleteTaskRouter from "./routes/tasks/deleteTask";
import createUserRouter from "./routes/users/createUser";
import getSingleUserRouter from "./routes/users/getSingleUser";
import updateUserRouter from "./routes/users/updateUser";
import deleteUserRouter from "./routes/users/deleteUser";

const app: Application = express();

app.use(express.json());
app.use("/users", getAllUsersRouter, getSingleUserRouter, createUserRouter, updateUserRouter, deleteUserRouter as Router);
app.use("/tasks", getAllTasksRouter, getSingleTaskRouter, createTaskRouter, updateTaskRouter, deleteTaskRouter as Router);

app.get("/", (_req: Request, res: Response) => {
    res.send("Home page");
});

app.use(validate);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
