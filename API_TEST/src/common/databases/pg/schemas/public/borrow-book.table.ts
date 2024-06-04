import { Moment } from 'moment'
import {
  Table, Column, Model, DataType, AllowNull, Default
} from 'sequelize-typescript'

@Table({
  tableName: 'tb_borrow_books',
  timestamps: false,
  freezeTableName: true,
  initialAutoIncrement: 'id'
})
export class BorrowBookSchema extends Model {
  @AllowNull(true)
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number

	@AllowNull(false)
  @Column(DataType.INTEGER)
  member_id: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  book_id: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  qty: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  remaining_return_qty: number

	@AllowNull(false)
  @Column(DataType.DATE)
  expired_at: Moment

	@AllowNull(false)
  @Column(DataType.DATE)
  created_at: Moment
}