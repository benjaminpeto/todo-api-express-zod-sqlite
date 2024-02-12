import express, { type Request, type Response, type Application, type Router } from "express";
import { validate } from "./middlewares/zod.middleware";
import userRouter from "./routes/users";
import todosRouter from "./routes/tasks";

const app: Application = express();

app.use(express.json());
app.use("/users", userRouter as Router);
app.use("/tasks", todosRouter as Router);

app.get("/", (_req: Request, res: Response) => {
    res.send("Home page");
});

app.use(validate);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
