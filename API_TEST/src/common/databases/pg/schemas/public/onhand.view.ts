import {
  Table, Column, Model, DataType, AllowNull
} from 'sequelize-typescript'

@Table({
  tableName: 'vw_onhands',
  timestamps: false,
  freezeTableName: true
})
export class ViewOnhandSchema extends Model {
  @AllowNull(false)
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
  qty: number
}