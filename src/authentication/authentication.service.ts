import { InjectRepository } from "@mikro-orm/nestjs";
import { EntityManager, EntityRepository } from "@mikro-orm/postgresql";
import { BadRequestException, ConflictException, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { User } from "../user/user.entity";
import { RegisterDTO } from "./dto/register.dto";
import * as bcrypt from 'bcrypt';
import { v4 } from "uuid";
import { LoginDTO } from "./dto/login.dto";
import { UserTokenPayload } from "./dto/payload";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthenticationService {

    private logger: Logger = new Logger('AuthenticationService')

    constructor(
        @InjectRepository(User)
        private userRepository: EntityRepository<User>,
        private entityManager: EntityManager,
        private readonly jwtService: JwtService,
    ) {}

    async register(data: RegisterDTO) {
        const getUserByEmail = await this.userRepository.findOne({
            email: data.email
        })
        if(getUserByEmail) {
            throw new ConflictException('This user with this email already exist')
        }

        const hashedPassword = await bcrypt.hash(data.password, 10)
        const newUser = await this.userRepository.create({
            id: v4(),
            ...data,
            password: hashedPassword
        })

        await this.entityManager.persistAndFlush(newUser)
        return newUser
    }

    async login(data: LoginDTO) {
        const verifyUser = await this.userRepository.findOne({
            email: data.email
        })

        if(!verifyUser) {
            throw new NotFoundException('User with this email not found')
        }
        await this.verifyPassword(verifyUser.password, data.password)
        verifyUser.password = undefined
        let token = await this.generateJWT(verifyUser.id)
        return {
            user: verifyUser,
            token: token
        }
    }

    async generateJWT(idUser: string) {
        const payload: UserTokenPayload = { idUser }
        return this.jwtService.sign(payload)
    }


    async verifyPassword(hashedPassword: string, password: string) {
        const isPasswordMatching = await bcrypt.compare(
            password,
            hashedPassword,
        );
        if (!isPasswordMatching) {
            throw new BadRequestException('Password not matching')
        }
    }

}