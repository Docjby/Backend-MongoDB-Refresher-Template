import express from "express";

const app = express();

app.use(express.json());

import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js"

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);



export default app;