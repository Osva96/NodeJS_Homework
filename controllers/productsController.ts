import { Router } from "express";
import { Request, Response } from "express-serve-static-core";

/* Model */
import { Product } from "../models/product";

/* Repository */
import ProductRepository from '../repositories/productRepository';

export class ProductController {

    public router: Router;

    /* Repository instancy */
    private repository: ProductRepository

    constructor() {
        this.router = Router();

        this.router.get('/', (req, res) => this.GetAll(req, res));
        this.router.get('/:id', (req, res) => this.Get(req, res));
        this.router.post('/', (req, res) => this.Create(req, res));
        this.router.patch('/:id', (req, res) => this.Update(req, res));
        this.router.delete('/:id', (req, res) => this.Delete(req, res));

        this.repository = new ProductRepository();
    }

    private async GetAll(req: Request, res: Response): Promise<void> {
        // console.log(req["user"]);
        const products = await this.repository.getAllProducts();
        console.log(products);
        res.status(200).json(products);
    }

    // Product
    private async Create(req: Request, res: Response): Promise<void> {


        const product: Product = req.body;

        if (product.name) {
            const newProduct: Product = await this.repository.createProduct(
                product.name,
                product.price,
                product.qty
            );
            res.status(201).json(newProduct);
        } else {
            res.status(400).json({ error: "Error, name cannot be empty." });
        }
    }

    private async Get(req: Request, res: Response): Promise<void> {
        const id = req.params.id;

        if (id) {


            // products.findIndex(p => p.id === id);
            const product = await this.repository.getProduct(id);

            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ message: 'No product found' });
            }
        } else {
            res.status(400).json({ message: 'Bad request' });
        }
    }

    private async Update(req: Request, res: Response): Promise<void> {


        const id = req.params.id;
        let product = req.body;

        if (id && product.name) {
            const p = await this.repository.updateProduct(
                id,
                product.name,
                product.price,
                product.qty
            );

            res.status(200).json(p);
        } else {
            res.status(400).json({ error: "Error, name or ID empty" });
        }
    }

    private async Delete(req: Request, res: Response): Promise<void> {


        const id = req.params.id;

        try {
            await this.repository.deleteProduct(id);
            res.status(200).json({ message: "Product deleted." });
        } catch (err) {
            res.status(400).json({ message: "Error in the action delete of a product." });
        }
    }
}