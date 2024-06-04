import { Moment } from 'moment'
import {
  Table, Column, Model, DataType, AllowNull,
  HasMany
} from 'sequelize-typescript'
import { OnhandSchema } from './onhand.table'

@Table({
  tableName: 'tb_books',
  timestamps: false,
  freezeTableName: true
})
export class BookSchema extends Model {
  @AllowNull(true)
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number

	@AllowNull(false)
  @Column(DataType.STRING(8))
  code: string

	@AllowNull(false)
  @Column(DataType.STRING(100))
  title: string

  @AllowNull(false)
  @Column(DataType.STRING(75))
  author: string

  @AllowNull(false)
  @Column(DataType.INTEGER)
  stock: number

	@AllowNull(false)
  @Column(DataType.DATE)
  created_at: Moment

	@AllowNull(true)
  @Column(DataType.DATE)
  updated_at?: Moment
}