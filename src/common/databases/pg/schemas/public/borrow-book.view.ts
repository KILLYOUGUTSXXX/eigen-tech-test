import { Moment } from 'moment'
import {
  Table, Column, Model, DataType, AllowNull
} from 'sequelize-typescript'

@Table({
  tableName: 'vw_borrowed_books',
  timestamps: false,
  freezeTableName: true
})
export class ViewBorrowBookSchema extends Model {
  @AllowNull(false)
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  member_id: string

  @AllowNull(false)
  @Column(DataType.STRING(8))
  member_code: string

  @AllowNull(false)
  @Column(DataType.STRING(70))
  member_name: string
  
  @AllowNull(false)
  @Column(DataType.INTEGER)
  book_id: string

	@AllowNull(false)
  @Column(DataType.STRING(8))
  book_code: string

	@AllowNull(false)
  @Column(DataType.STRING(100))
  title: string

  @AllowNull(false)
  @Column(DataType.STRING(75))
  author: string

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