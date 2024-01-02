import {
    Controller,
    Post,
    Body,
    UseGuards,
    Request,
    Get,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "./dtos/create-user.dto";
import { LoginUserDto } from "./dtos/login.dto";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { LocalAuthGuard } from "./local-auth.guard";

@Controller("auth")
export class AuthController {
    constructor(
        public authService: AuthService,
        public jwtService: JwtService
    ) {}

    @Post("/register")
    async register(@Body() body: CreateUserDto) {
        const user = await this.authService.create(body);

        return user;
    }

    @UseGuards(LocalAuthGuard)
    @Post("/login")
    async login(@Body() body: LoginUserDto, @Request() req) {
        const token = this.jwtService.sign({
            id: req.user.id,
            email: req.user.email,
            role: req.user.role
        });
        await this.authService.updateToken(req.user.id, token);

        return {
            token: token,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get("/profile")
    profile(@Request() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Post("/logout")
    async logout(@Request() req) {
        await this.authService.removeToken(req.user.id);

        return { message: "User Logout" };
    }
}
