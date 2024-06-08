import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { MessageService } from 'src/message/message.service';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
    constructor(
        private readonly chatService: ChatService,
        private readonly messageService: MessageService
    ) { }

    @Post()
    async createChat(
        @Body('userId') userId: number
    ) {
        const chat = await this.chatService.create(userId);

        return chat;
    }

    @Post(':id/messages')
    async addMessage(
        @Param('id') chatId: number,
        @Body('content') content: string,
        @Body('sender') sender: 'user' | 'ai'
    ) {
        const createMessageDto: CreateMessageDto = {
            chatId: chatId,
            content: content,
            sender: sender,
        };
        const message = await this.messageService.create(createMessageDto);

        return message;
    }

    @Get()
    findAll() {
        return this.chatService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.chatService.findAllByUserId(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateChatDto: UpdateChatDto) {
        return this.chatService.update(+id, updateChatDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.chatService.remove(+id);
    }
}
