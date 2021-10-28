import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    user: string;

    @Column()
    pass: string;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    age: number;
}
