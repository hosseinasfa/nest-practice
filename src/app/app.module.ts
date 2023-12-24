import { Module } from '@nestjs/common';
import { PostModule } from 'src/post/post.module';
import { UserModule } from 'src/user/user.module';
import { AppController } from './app.controller';

@Module({
    imports: [UserModule, PostModule],
    controllers: [AppController]
})
export class AppModule {}
