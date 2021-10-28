import { DeleteResult, getRepository, Repository } from "typeorm";
import { Artist } from '../models/artist';
import { Album } from '../models/album';

export default class ArtistRepository {
    private repository_: Repository<Artist>;

    private get repository(): Repository<Artist> {
        if (!this.repository_) {
            this.repository_ = getRepository(Artist);
        }

        return this.repository_;
    }

    async CreateArtist(name: string, members: string, activeyears: string, popularity: string, genres: string) {
        let a = new Artist();

        a.name = name;
        a.members = members;
        a.activeyears = activeyears;
        a.popularity = popularity;
        a.genres = genres;

        /* Insert (without query) */
        return await this.repository.save(a);
    }

    async GetArtist(id: string): Promise<Artist> {
        return await this.repository.findOne(id);
    }

    async DeleteArtist(id: string): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }

    async UpdateArtist(id: string, name: string, members: string, activeyears: string, popularity: string, genres: string): Promise<Artist> {
        let aOld = await this.repository.findOne(id);

        aOld.name = name;
        aOld.members = members;
        aOld.activeyears = activeyears;
        aOld.popularity = popularity;
        aOld.genres = genres;

        return await this.repository.save(aOld);
    }

    async GetAllArtist(): Promise<Artist[]> {
        return await this.repository.find();
    }
}
