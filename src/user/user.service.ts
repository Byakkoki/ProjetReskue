import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityRepository } from "@mikro-orm/postgresql";
import { Injectable, NotFoundException } from "@nestjs/common";
import { v4 } from "uuid";
import { User } from "./user.entity";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: EntityRepository<User>
    ) { }

    findAll() {
        return this.userRepository.findAll()
    }

    async findOneUser(idUser: string) {
        const findUser = await this.userRepository.findOne({
            id: idUser
        })

        if(!findUser) {
            throw new NotFoundException('User not found !')
        }

        return findUser
    }

    async findOneUserByEmail(email: string) {
        const findUser = await this.userRepository.findOne({
            email: email
        })

        if(!findUser) {
            throw new NotFoundException('User not found !')
        }

        return findUser
    }

    async updateOneUser() {
        // TODO WHEN GUARD CREATE
    }

    async deleteOneUser() {
        // TODO WHEN GUARD CREATE
    }


}

