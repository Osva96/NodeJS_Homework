import { Router } from "express";
import { Request, Response } from "express";

import ArtistRepository from '../repositories/artistRepository';

import { Artist } from '../models/artist';

export class ArtistController {
    public router: Router;
    /* Repository instancy */
    private repository: ArtistRepository;

    constructor() {
        this.router = Router();

        this.router.get("/", (req, res) => this.GetAll(req, res));
        this.router.get("/:id", (req, res) => this.GetById(req, res));
        this.router.post("/", (req, res) => this.Create(req, res));
        this.router.patch("/:id", (req, res) => this.Update(req, res));
        this.router.delete("/:id", (req, res) => this.Delete(req, res));

        this.repository = new ArtistRepository();
    }

    /**
     * Get all the users of the DB.
     * @param req Request data send to this method.
     * @param res Response data of operation.
     */
    private async GetAll(req: Request, res: Response): Promise<void> {
        const artist = await this.repository.GetAllArtist();
        res.status(200).json(artist);
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
            const artist = await this.repository.GetArtist(id);

            if (artist) {
                res.status(200).json(artist);
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
        const artist: Artist = req.body;

        if (artist.name) {
            const newArtist: Artist = await this.repository.CreateArtist(
                artist.name,
                artist.members,
                artist.activeyears,
                artist.popularity,
                artist.genres
            );
            res.status(201).json(newArtist);
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
        let artist = req.body;

        if (id && artist.name) {
            const a = await this.repository.UpdateArtist(
                id,
                artist.name,
                artist.members,
                artist.activeyears,
                artist.popularity,
                artist.genres
            );

            res.status(200).json(a);
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
            await this.repository.DeleteArtist(id);
            res.status(200).json({ message: "Artist deleted." });
        } catch (err) {
            res.status(400).json({ message: "Error in the action delete of the artist." });
        }
    }
}
