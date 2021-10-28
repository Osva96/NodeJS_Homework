import { DeleteResult, getRepository, Repository } from "typeorm";
import { User } from '../models/user';

export default class UserRepository {
    private repository_: Repository<User>;

    private get repository(): Repository<User> {
        if (!this.repository_) {
            this.repository_ = getRepository(User);
        }

        return this.repository_;
    }

    async CreateUser(user: string, pass: string, name: string, lastname: string, age: number) {
        let u = new User();

        u.user = user;
        u.pass = pass;
        u.name = name;
        u.lastname = lastname;
        u.age = age;

        /* Insert (without query) */
        return await this.repository.save(u);
    }

    async GetUser(id: string): Promise<User> {
        return await this.repository.findOne(id);
    }

    async DeleteUser(id: string): Promise<DeleteResult> {
        return await this.repository.delete(id);
    }

    async UpdateUser(id: string, user: string, pass: string, name: string, lastname: string, age: number): Promise<User> {
        let uOld = await this.repository.findOne(id);

        uOld.user = user;
        uOld.pass = pass;
        uOld.name = name;
        uOld.lastname = lastname;
        uOld.age = age;

        return await this.repository.save(uOld);
    }

    async GetAllUsers(): Promise<User[]> {
        return await this.repository.find();
    }

    async LoginUser(userL: string, passL: string): Promise<any> {
        let flaw = false;
        let userLogin = '';

        let searchUser = await this.repository.query(
            "SELECT user, pass FROM user WHERE user = '" + userL + "' AND pass = '" + passL + "'",
            [userL, passL]
        );

        /* searchUser.forEach(element => {
            userLogin = element.user
        });

        console.log("Esto es data: ", userLogin); */

        if (searchUser != '') {
            flaw = true;
        } else {
            flaw = false;
        }

        return flaw;
    }
}
