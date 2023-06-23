import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { RoleEnum } from "src/commons/enum/role.enum";

@Entity()
export class User {

    @PrimaryKey()
    id: string

    @Property()
    firstName: string

    @Property()
    lastName: string

    @Property()
    email: string
    
    @Property()
    password: string

    @Property()
    roles: RoleEnum[]
}