import { Column, DataType, Model, Table, Default, BelongsTo, ForeignKey, HasMany } from 'sequelize-typescript';
import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Table({ tableName: 'chats' })
export class Chat extends Model {
  @Default(uuidv4)
  @Column({ type: DataType.UUID, unique: true })
  uuid: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @HasMany(() => Message)
  messages: Message[];

  @BelongsTo(() => User)
  user: User;
}
