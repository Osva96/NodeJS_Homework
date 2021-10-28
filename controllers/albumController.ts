import { Router } from "express";
import { Request, Response } from "express";

import { Album } from '../models/album';

import AlbumRepository from '../repositories/albumRepository';

export class AlbumController {
    public router: Router;
    /* Repository instancy */
    private repository: AlbumRepository;

    constructor() {
        this.router = Router();

        this.router.get("/", (req, res) => this.GetAll(req, res));
        this.router.get("/:id", (req, res) => this.GetById(req, res));
        this.router.post("/", (req, res) => this.Create(req, res));
        this.router.patch("/:id", (req, res) => this.Update(req, res));
        this.router.delete("/:id", (req, res) => this.Delete(req, res));

        this.repository = new AlbumRepository();
    }

    /**
     * Get all the users of the DB.
     * @param req Request data send to this method.
     * @param res Response data of operation.
     */
    private async GetAll(req: Request, res: Response): Promise<void> {
        try {
            const album = await this.repository.GetAllAlbum();
            res.status(200).json(album);
        } catch (err) {
            console.log("Error en Controller: ", err);
        }
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
            const album = await this.repository.GetAlbum(id);

            if (album) {
                res.status(200).json(album);
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
        const album: Album = req.body;

        if (album.title) {
            const newAlbum: Album = await this.repository.CreateAlbum(
                album.title,
                album.albumtype,
                album.releasedate,
                album.genre,
                album.tracks,
                album.artist
            );
            res.status(201).json(newAlbum);
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
        let album = req.body;

        if (id && album.title) {
            const a = await this.repository.UpdateAlbum(
                id,
                album.title,
                album.albumtype,
                album.releasedate,
                album.genre,
                album.tracks,
                album.artist
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
            await this.repository.DeleteAlbum(id);
            res.status(200).json({ message: "Artist deleted." });
        } catch (err) {
            res.status(400).json({ message: "Error in the action delete of the artist." });
        }
    }
}
