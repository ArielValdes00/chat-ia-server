import { Column, DataType, Model, Table, Default, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';

@Table({ tableName: 'chats' })
export class Chat extends Model {
  @Default(uuidv4)
  @Column({ type: DataType.UUID, unique: true })
  uuid: string;

  @Column({ type: DataType.INTEGER })
  userId: number;

  @ForeignKey(() => User)
  @Column
  addressId: number;

  @BelongsTo(() => User)
  user: User;
}
