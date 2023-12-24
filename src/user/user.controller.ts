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
} from "@nestjs/common";
import { CreateUserDto } from "./dtos/create-user.dto";
import { UpdateUserDto } from "./dtos/update-user.dto";
import { UserService } from "./user.service";

@Controller("users")
export class UserController {
    constructor(public userService: UserService) {}

    @Get()
    async getUsers() {
        const users = await this.userService.findMany();
        return users;
    }

    @Get("/:id")
    async getUser(@Param("id", ParseIntPipe) id: number) {
        const user = await this.userService.findUnique(id);

        if (!user) {
            throw new NotFoundException("User Not Found!");
        }
        return user;
    }

    @Post()
    async createUser(@Body() body: CreateUserDto) {
        const user = await this.userService.create(body);
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
