import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";

@Injectable()
export class UserService {
    constructor(public prisma: PrismaService) {}

    async create(data: CreateUserDto) {
        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
            },
        });

        return user;
    }

    async findMany() {
        const users = await this.prisma.user.findMany();
        return users;
    }

    async findUnique(id: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id: id,
            },
        });
        return user;
    }

    async update(data: UpdateUserDto, id: number) {
        const user = await this.prisma.user.update({
            where: {
                id: id,
            },
            data: {
                name: data.name,
            },
        });
        return user;
    }

    async delete(id: number) {
        const user = await this.prisma.user.delete({
            where: {
                id: id,
            }
        });
        return user;
    }
}
