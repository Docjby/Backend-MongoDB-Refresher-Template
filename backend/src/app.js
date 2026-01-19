import express from "express";

const app = express();

app.use(express.json());

import userRouter from "./routes/user.route.js";
// import PostRouter from "./routes/post.routes"

app.use("/api/users", userRouter);
// app.use("/api/post", PostRouter);



export default app;