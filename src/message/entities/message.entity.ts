import { Column, DataType, Model, Table, BelongsTo, Default, ForeignKey } from 'sequelize-typescript';
import { Chat } from 'src/chat/entities/chat.entity';
import { v4 as uuidv4 } from 'uuid';

@Table({ tableName: 'messages' })
export class Message extends Model {
  @Default(uuidv4)
  @Column({ type: DataType.UUID, unique: true })
  uuid: string;

  @Column({ type: DataType.JSONB, allowNull: false })
  content: any;

  @Column({ type: DataType.STRING })
  sender: 'user' | 'ai';

  @ForeignKey(() => Chat)
  @Column({ type: DataType.INTEGER })
  chatId: number;

  @BelongsTo(() => Chat) 
  chat: Chat;
}
