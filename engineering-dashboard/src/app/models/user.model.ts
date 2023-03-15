import { BaseUser } from "../interfaces/base-user.interface";

export class User implements BaseUser{
    id!: number;
    username!: string;
    password!: string;
    email!: string;
    firstName!: string;
    lastName!: string;
}
