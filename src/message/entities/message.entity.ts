import { Column, DataType, Model, Table, BelongsTo, Default, ForeignKey } from 'sequelize-typescript';
import { Chat } from 'src/chat/entities/chat.entity';
import { v4 as uuidv4 } from 'uuid';

@Table({ tableName: 'messages' })
export class Message extends Model {
  @Default(uuidv4)
  @Column({ type: DataType.UUID, unique: true })
  uuid: string;

  @Column({ type: DataType.INTEGER })
  chatId: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  content: string;

  @Column({ type: DataType.INTEGER })
  senderId: number;

  @ForeignKey(() => Chat)
  @Column
  addressId: number;

  @BelongsTo(() => Chat) 
  chat: Chat;
}
