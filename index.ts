import express from "express";
import { Request, Response } from "express";

/* .env configuration */
import dotenv from "dotenv";

/* Controllers */
import { UserController } from "./controllers/usersController";
import { ArtistController } from './controllers/artistController';
import { AlbumController } from './controllers/albumController';

/* Middleware */
import { Middleware } from "./utils/middleware";

/* DB Connection */
import { DatabaseConnection } from "./database/connection";

dotenv.config();

/* Connection to the DB MS SQL */
DatabaseConnection.connect();

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());




/* Direction to Users /login */
app.use("/api", new UserController().router);

/* Direction to Artist */
// app.use('/api/artist', new ProductController().router);
/* API artist with the execution of Middleware Token Auth. Verify Token validation */
app.use(
    "/api/artist",
    Middleware.authenticateJWT,
    new ArtistController().router
);

/* Direction to Album */
app.use(
    "/api/album",
    Middleware.authenticateJWT,
    new AlbumController().router
);

/* Listen port when the app is running. */
app.listen(port, () => {
    console.log("App is running");
});
