import { Connection, createConnection } from "typeorm";

import { User } from "../models/user";
import { Artist } from '../models/artist';
import { Album } from '../models/album';

/* Entity import */

export class DatabaseConnection {
    public static connection: Connection = null;

    static async connect() {
        if (!this.connection) {
            try {
                this.connection = await createConnection({
                    type: "mysql",
                    host: "localhost",
                    port: 3306,
                    username: process.env.database_username,
                    password: process.env.database_password,
                    database: process.env.database,
                    synchronize: true, // true sinchronize and delete data from DB.
                    logging: false,
                    dropSchema: true, // true sinchronize and delete data drom DB.
                    entities: [User, Artist, Album],
                });

                console.log("Connection DB successful");
            } catch (err) {
                console.log("Error in connect to DB", err);
            }
        }
        return this.connection;
    }
}