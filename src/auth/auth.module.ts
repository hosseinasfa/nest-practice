import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { PrismaModule } from "prisma/prisma.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./local.strategy";
import { JwtStrategy } from "./jwt.strategy";

@Module({
    controllers: [AuthController],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    imports: [
        PrismaModule,
        PassportModule,
        JwtModule.register({
            secret: "secretKey",
            signOptions: { expiresIn: "1d" },
        }),
    ],
})
export class AuthModule {}
