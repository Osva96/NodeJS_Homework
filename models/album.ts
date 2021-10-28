import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Artist } from './artist';

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    title: string;

    @Column()
    albumtype: string;

    @Column()
    releasedate: string;
    
    @Column()
    genre: string;
    
    @Column()
    tracks: number;

    @ManyToOne(() => Artist, artist => artist.id)
    artist: number;
}
