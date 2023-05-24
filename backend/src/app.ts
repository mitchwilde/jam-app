import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import morgan from "morgan";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import userRoutes from "./routes/users";
import memosRoutes from "./routes/memos";
import createHttpError, { isHttpError } from "http-errors";

const app = express();

app.use(morgan("dev"));

app.use(express.json());

//setup session management/storage to MongoDB
app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}));

app.use("/api/users", userRoutes);

app.use("/api/memos", memosRoutes);

app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    // eslint-disable-next-line prefer-const
    let errorMessage = "An unknown error ocurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;