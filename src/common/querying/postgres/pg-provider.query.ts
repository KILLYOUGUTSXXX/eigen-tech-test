import { InjectConnection } from "@nestjs/sequelize";
import { Moment } from "moment";
import { QueryTypes, Sequelize, Transaction } from "sequelize";

const CustomQuery = {
  generalLedger: 'select v.* from sc_transaction.fn_general_ledger_reports($company, $branch, $year, $month, $to_date) v',
  detailBalanceSheet: 'select v.* from sc_transaction.fn_balance_sheet_detail_reports($company, $branch, $year, $month, $to_date) v',
  detailProfitLoss: 'select v.* from sc_transaction.fn_balance_profit_loss_detail_reports($company, $branch, $year, $month, $to_date) v'
}


export class PgNativeQuery {
  constructor (
    @InjectConnection() private connection: Sequelize
  ) {}
  
  async getSequence (data: { seqCode: string, company?: string, branch?: string }, transaction: Transaction = null): Promise<string> {
    try {
      const [result]: Array<{ v: string }> = await this.connection.query(
        `select v from sc_utils.fn_get_sequences(:seqCode, :company, :branch) v`,
        { 
          replacements: { seqCode: data.seqCode, company: data.company || '@', branch: data.branch || '@' },
          type: QueryTypes.SELECT,
          transaction: transaction
        })
      return result?.v
    } catch (er) {
      throw new Error(`Failed to generate sequence, cause: ${er.message}.`)
    }
  }

  async execCustomQuery<T = any>(queryType: keyof typeof CustomQuery, replacements: {[P: string]: any}, transaction: Transaction = null)
    : Promise<Array<T>> {
    try {
      const mappingQuery = CustomQuery[queryType].replace(/(\$)+([a-zA-Z_-]+)/g, m => {
        const current = replacements[m.replace(/\$/g, '')] || null

        if(typeof current === 'string')
          return `'${current}'`
        else if(typeof current === 'number')
          return current
        return current
      })
      
      const result = await this.connection.query(
        mappingQuery,
        { 
          // replacements,
          type: QueryTypes.SELECT,
          transaction: transaction
        })

      return result as any
    } catch (er) {
      throw new Error(`Failed to generate data, cause: ${er.message}.`)
    }
  }

}