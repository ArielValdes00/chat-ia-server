import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { User } from './user/entities/user.entity';
import { Chat } from './chat/entities/chat.entity';
import { Message } from './message/entities/message.entity';

dotenv.config(); 
export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize(process.env.DATABASE_URL, {
                dialect: 'postgres',
                dialectOptions: {
                    ssl: {
                        require: true,
                        rejectUnauthorized: false
                    }
                }
            });
            sequelize.addModels([User, Chat, Message]);
            await sequelize.sync();
            return sequelize;
        },
    },
];