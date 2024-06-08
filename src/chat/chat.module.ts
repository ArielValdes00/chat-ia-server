import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MessageModule } from 'src/message/message.module';

@Module({
    imports: [AuthModule, MessageModule],
    controllers: [ChatController],
    providers: [ChatService],
})
export class ChatModule { }
