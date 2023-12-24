import { Injectable } from '@nestjs/common';

@Injectable()
export class PostService {
    getPosts() {
        return "Posts From PostService"
    }

    postForAppModule() {
        return "Posts From AppModule"
    }
}
