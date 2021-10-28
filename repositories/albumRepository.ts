import { DeleteResult, getRepository, Repository } from "typeorm";
import { Artist } from '../models/artist';
import { Album } from '../models/album';

export default class AlbumRepository {
    private repository_: Repository<Album>;

    private get repository(): Repository<Album> {
        if (!this.repository_) {
            this.repository_ = getRepository(Album);
        }

        return this.repository_;
    }

    async CreateAlbum(title: string, albumtype: string, releasedate: string, genre: string, tracks: number, artist: number) {
        let a = new Album();

        a.title = title;
        a.albumtype = albumtype;
        a.releasedate = releasedate;
        a.genre = genre;
        a.tracks = tracks;
        a.artist = artist;

        /* Insert (without query) */
        return await this.repository.save(a);
    }

    async GetAlbum(id: string): Promise<Album> {
        return await this.repository.findOne(id);
    }

    async DeleteAlbum(id: string): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }

    async UpdateAlbum(id: string, title: string, albumtype: string, releasedate: string, genre: string, tracks: number, artist: number): Promise<Album> {
        let aOld = await this.repository.findOne(id);

        aOld.title = title;
        aOld.albumtype = albumtype;
        aOld.releasedate = releasedate;
        aOld.genre = genre;
        aOld.tracks = tracks;
        aOld.artist = artist;

        return await this.repository.save(aOld);
    }

    async GetAllAlbum(): Promise<Album[]> {
        try {
            return await this.repository.find();
        } catch (err) {
            console.log("Error en repository: ", err);
        }
    }
}
