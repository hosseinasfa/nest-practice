import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Param,
    ParseIntPipe,
    NotFoundException,
    UseInterceptors,
    UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Roles } from "./decorators/role.decorator";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { RoleGuard } from "./guards/role.guard";
import { TransformInterceptor } from "./interceptors/transform.interceptor";
import { UserService } from "./user.service";

@Roles('XXXX')
@Controller("users")
export class UserController {
    constructor(public userService: UserService) {}

    @Roles('ADMIN','EDITOR')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @Get()
    async getUsers() {
        const users = await this.userService.findMany();
        return users;
    }

    @Get("/:id")
    @UseInterceptors(TransformInterceptor)
    async getUser(@Param("id", ParseIntPipe) id: number) {
        const user = await this.userService.findUnique(id);

        if (!user) {
            throw new NotFoundException("User Not Found!");
        }
        return user;
    }


    @Put("/:id")
    async updateUser(
        @Body() body: UpdateUserDto,
        @Param("id", ParseIntPipe) id: number
    ) {
        const user = await this.userService.update(body, id);
        return user;
    }

    @Delete("/:id")
    async deleteUser(@Param("id", ParseIntPipe) id: number) {
        await this.userService.delete(id);

        return 'User Deleted';
    }
}
