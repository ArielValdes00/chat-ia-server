import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MessageModule } from 'src/message/message.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
    imports: [AuthModule, MessageModule, CloudinaryModule],
    controllers: [ChatController],
    providers: [ChatService],
})
export class ChatModule { }
