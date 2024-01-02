import { Controller , Get } from "@nestjs/common";

@Controller()
export class AppController {
    @Get()
    async root() {
        return "Hello to my Nest project"
    }
}