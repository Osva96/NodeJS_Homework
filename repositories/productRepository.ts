import { DeleteResult, getRepository, Repository } from "typeorm";
import { Product } from "../models/product";

export default class ProductRepository {
    private repository_: Repository<Product>;

    private get repository(): Repository<Product> {
        if (!this.repository_) {
            this.repository_ = getRepository(Product);
        }

        return this.repository_;
    }

    async createProduct(name: string, price: number, qty: number) {
        let product = new Product();

        product.name = name;
        product.price = price;
        product.qty = qty;

        /* Insert (without query) */
        return await this.repository.save(product);
    }

    async getProduct(id: string): Promise<Product> {
        return await this.repository.findOne(id);
    }

    async deleteProduct(id: string): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }

    async updateProduct(
        id: string,
        name: string,
        price: number,
        qty: number
    ): Promise<Product> {
        let productOld = await this.repository.findOne(id);
        productOld.name = name;
        productOld.price = price;
        productOld.qty = qty;

        return await this.repository.save(productOld);
    }

    async getAllProducts(): Promise<Product[]> {
        return await this.repository.find();
    }
}
