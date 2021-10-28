import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Album } from './album';

@Entity()
export class Artist {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    members: string;

    @Column()
    activeyears: string;

    @Column()
    popularity: string;

    @Column()
    genres: string;

    @OneToMany(() => Album, album => album.id)
    album: number;
}
