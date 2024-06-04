import { Moment } from 'moment'
import {
  Table, Column, Model, DataType, AllowNull, Default
} from 'sequelize-typescript'

@Table({
  tableName: 'tb_return_books',
  timestamps: false,
  freezeTableName: true,
  initialAutoIncrement: 'id'
})
export class ReturnBookSchema extends Model {
  @AllowNull(true)
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number

	@AllowNull(false)
  @Column(DataType.INTEGER)
  borrow_id: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  return_qty: number

	@AllowNull(false)
  @Column(DataType.DATE)
  created_at: Moment
}