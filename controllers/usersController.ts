import { Router } from "express";
import { Request, Response } from "express";

import UserRepository from "../repositories/userRepository";

import JWT from "jsonwebtoken";

import { User } from '../models/user';

export class UserController {
    public router: Router;
    /* Repository instancy */
    private repository: UserRepository;

    constructor() {
        this.router = Router();
        this.router.post("/login", (req, res) => this.Login(req, res));

        this.router.get("/user", (req, res) => this.GetAll(req, res));
        this.router.get("/user/:id", (req, res) => this.GetById(req, res));
        this.router.post("/user", (req, res) => this.Create(req, res));
        this.router.patch("/user/:id", (req, res) => this.Update(req, res));
        this.router.delete("/user/:id", (req, res) => this.Delete(req, res));

        this.repository = new UserRepository();
    }

    /**
     * Generate a Token if the user is valid and exists.
     * @param req Request data send to this method.
     * @param res Response data of operation.
     */
    private async Login(req: Request, res: Response) {
        const { user, password } = req.body;

        let loginData = await this.repository.LoginUser(user, password);
        // console.log("Resultado de test: ", loginData);

        // user === "usuario" && password === "pass"
        if (loginData == true) {
            const token = JWT.sign(
                {
                    user: user,
                    role: "admin",
                },
                process.env.secret
            );
            res.status(200).json({
                token,
            });
        } else {
            res.status(404).json({
                message: "User or Password doesnt exists.",
            });
        }
    }

    /**
     * Get all the users of the DB.
     * @param req Request data send to this method.
     * @param res Response data of operation.
     */
    private async GetAll(req: Request, res: Response): Promise<void> {
        const users = await this.repository.GetAllUsers();
        res.status(200).json(users);
    }

    /**
     * Get an individual user search by ID in the DB.
     * @param req Request data send to this method.
     * @param res Response data of operation.
     */
    private async GetById(req: Request, res: Response): Promise<void> {
        const id = req.params.id;

        if (id) {
            // products.findIndex(p => p.id === id);
            const user = await this.repository.GetUser(id);

            if (user) {
                res.status(200).json(user);
            } else {
                res.status(404).json({ message: 'No product found' });
            }
        } else {
            res.status(400).json({ message: 'Bad request' });
        }
    }

    /**
     * Create a new user in the DB.
     * @param req Request data send to this method.
     * @param res Response data of operation.
     */
    private async Create(req: Request, res: Response): Promise<void> {
        const user: User = req.body;
        if (user.name) {
            try {
                const newUser: User = await this.repository.CreateUser(
                    user.user,
                    user.pass,
                    user.name,
                    user.lastname,
                    user.age
                );
                res.status(201).json(newUser);
            } catch (err) {
                console.log("El error fue: ", err);
            }
        } else {
            res.status(400).json({ error: "Error, name cannot be empty." });
        }
    }

    /**
     * Update data of a user identified by ID.
     * @param req Request data send to this method.
     * @param res Response data of operation.
     */
    private async Update(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        let user = req.body;

        if (id && user.user) {
            const u = await this.repository.UpdateUser(
                id,
                user.user,
                user.pass,
                user.name,
                user.lastname,
                user.age
            );

            res.status(200).json(u);
        } else {
            res.status(400).json({ error: "Error, name or ID empty" });
        }
    }

    /**
     * Delete a user identified by ID.
     * @param req Request data send to this method.
     * @param res Response data of operation.
     */
    private async Delete(req: Request, res: Response): Promise<void> {
        const id = req.params.id;

        try {
            await this.repository.DeleteUser(id);
            res.status(200).json({ message: "Product deleted." });
        } catch (err) {
            res.status(400).json({ message: "Error in the action delete of a product." });
        }
    }
}
