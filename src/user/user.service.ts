import { wrap } from "@mikro-orm/core";
import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/postgresql";
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { RoleEnum } from "../commons/enum/role.enum";
import { v4 } from "uuid";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { User } from "./user.entity";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private userRepository: EntityRepository<User>,
        private entityManager: EntityManager
    ) { }

    findAll() {
        return this.userRepository.findAll({ populate: ['events'] })
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

    async updateOneUser(user: User, idUser: string, data: UpdateUserDTO) {
        const userUpdate = await this.findOneUser(idUser)
        if(user.roles.includes(RoleEnum.ADMIN)) {
            wrap(userUpdate).assign(data)
            await this.entityManager.persistAndFlush(userUpdate);
            return userUpdate;
        } else {
            if(user != userUpdate) {
                throw new ForbiddenException("You can't make that !")
            }
            wrap(userUpdate).assign(data)
            await this.entityManager.persistAndFlush(userUpdate);
            return userUpdate;
        }
    }

    async deleteOneUser(user: User, idUser: string) {
        const userDelete = await this.findOneUser(idUser)
        if(user.roles.includes(RoleEnum.ADMIN)) {
            return this.entityManager.removeAndFlush(userDelete)
        } else {
            if(user != userDelete) {
                throw new ForbiddenException("You can't make that !")
            }
            return this.entityManager.removeAndFlush(userDelete)
        }
    }


}

