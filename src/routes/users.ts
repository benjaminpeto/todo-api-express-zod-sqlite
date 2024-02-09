import express, { type Request, type Response } from "express";

const router = express.Router();

router.get("/", (_req: Request, res: Response) => {
    res.send("All users in the application");
});

router.get("/register", (_req: Request, res: Response) => {
    res.send("Register form for new users");
});

export default router;
