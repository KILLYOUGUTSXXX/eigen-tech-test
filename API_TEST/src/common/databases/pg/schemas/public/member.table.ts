import { Moment } from 'moment'
import {
  Table, Column, Model, DataType, AllowNull, Default
} from 'sequelize-typescript'

@Table({
  tableName: 'tb_members',
  timestamps: false,
  freezeTableName: true,
  initialAutoIncrement: 'id'
})
export class MemberSchema extends Model {
  @AllowNull(true)
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number

	@AllowNull(false)
  @Column(DataType.STRING(8))
  code: string

	@AllowNull(false)
  @Column(DataType.STRING(70))
  name: string
  
  @Default(null)
  @AllowNull(true)
  @Column(DataType.DATE)
  penalty_exp_at?: Moment

	@AllowNull(false)
  @Column(DataType.DATE)
  created_at: Moment

	@AllowNull(true)
  @Column(DataType.DATE)
  updated_at?: Moment
}