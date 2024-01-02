import {
    Injectable,
    BadRequestException,
    UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
    constructor(public prisma: PrismaService) {}

    async create(data: CreateUserDto) {
        const password = await bcrypt.hash(data.password, 10);

        const user = await this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: password,
            },
            select: {
                id: true,
                name: true,
                email: true,
            },
        });

        return user;
    }

    async updateToken(id: number, token: string) {
        await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                token,
            },
        });

        return token;
    }

    async validateUser(email: string, password: string) {
        const user = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!user) {
            throw new BadRequestException();
        }

        if (!(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException();
        }

        return user;
    }

    async validateUserByToken(id: number) {
        const user = await this.prisma.user.findUnique({
            where: {
                id,
            },
        });

        if (!user || user.token === null) {
            throw new UnauthorizedException();
        }

        return user;
    }

    async removeToken(id: number) {
        await this.prisma.user.update({
            where: {
                id,
            },
            data: {
                token: null,
            },
        });

        return "Removed Token";
    }
}
