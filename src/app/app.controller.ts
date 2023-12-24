import { Controller, Get } from '@nestjs/common';
import { PostService } from 'src/post/post.service';

@Controller('app')
export class AppController {
    constructor(private postService: PostService) {}

    @Get()
    roorRoute() {
        return this.postService.postForAppModule()
    }
}
