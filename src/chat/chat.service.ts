import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChatDto } from './dto/create-chat.dto';
import { UpdateChatDto } from './dto/update-chat.dto';
import { Chat } from './entities/chat.entity';
import { Message } from 'src/message/entities/message.entity';

@Injectable()
export class ChatService {
    async create(userId: number): Promise<Chat> {
        const chat = await Chat.create({
            userId: userId,
        });
        return chat;
    }

    async findAll(): Promise<Chat[]> {
        return await Chat.findAll({
            include: [{
                model: Message,
                as: 'messages',
            }],
        });
    }

    async findAllByUserId(userId: number): Promise<Chat[]> {
        return await Chat.findAll({
            where: { userId: userId },
            include: [Message]
        });
    }

    update(id: number, updateChatDto: UpdateChatDto) {
        return `This action updates a #${id} chat`;
    }

    async remove(id: number): Promise<void> {
        const chat = await Chat.findByPk(id);
        if (!chat) {
            throw new NotFoundException(`Chat with ID ${id} not found`);
        }
        await Chat.destroy({
            where: { id: id },
        });
    }
}
