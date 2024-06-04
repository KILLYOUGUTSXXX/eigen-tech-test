import { ONHAND_STOCK_TYPE } from '@common-ifaces/main/onhand.iface'
import { Moment } from 'moment'
import {
  Table, Column, Model, DataType, AllowNull,
  ForeignKey
} from 'sequelize-typescript'
import { BookSchema } from './book.table'

@Table({
  tableName: 'tb_onhands',
  timestamps: false,
  freezeTableName: true,
  initialAutoIncrement: 'id'
})
export class OnhandSchema extends Model {
  @AllowNull(true)
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  book_id: number
  
	@AllowNull(false)
  @Column(DataType.INTEGER)
  ref_id: number

  @AllowNull(false)
  @Column(DataType.INTEGER)
  qty: number

  @AllowNull(false)
  @Column(DataType.ENUM(...ONHAND_STOCK_TYPE))
  stock_type: typeof ONHAND_STOCK_TYPE[number]

  @AllowNull(false)
  @Column(DataType.DATE)
  /** Date of stock: including number (unix of timestamps) */
  date_of_stock: Moment
}