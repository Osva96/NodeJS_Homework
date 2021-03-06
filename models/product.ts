import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    qty: number;
}