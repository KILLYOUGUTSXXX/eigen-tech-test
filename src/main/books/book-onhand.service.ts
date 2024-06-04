
import { CheckStockMinus } from "@common-dtos/main/book.dto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { queryGeneratorSql } from "@utilities/query-generator.util";
import { Op, Transaction } from "sequelize";
import { ViewOnhandSchema } from "@common-schemas/public/onhand.view";


@Injectable()
export class BookOnhandService {
  constructor (
    @InjectModel(ViewOnhandSchema) private onhandBookSchema: typeof ViewOnhandSchema
  ) {}

  async findSomeBookOnhands (query: any) {
    const querying = queryGeneratorSql(['code', 'title', 'author'], query, true)

    return this.onhandBookSchema.findAndCountAll({
      attributes: ['*'],
      ...querying,
      raw: true
    }).then(a => ({
      data: a.rows,
      total: a.count,
      page: querying.page,
      pageSize: querying.limit
    }))
  }

  async findOnhandByBookIds (ids: Array<number>, transaction?: Transaction) {
    return this.onhandBookSchema.findAll({
      attributes: ['*'],
      where: {
        id: {
          [Op.in]: ids
        }
      },
      raw: true
    })
  }

  async checkStockMinus (books: Array<CheckStockMinus>, transaction?: Transaction): Promise<boolean> {
    try {
      const currents = await this.findOnhandByBookIds(books.map(a => a.book_id))
      let errMsg: string

      for (const x in books) {
        const items = books[x]
        const [existing] = currents.filter(a => a.id === items.book_id)
        const leftStock = (existing?.qty || 0) - items.qty
        
        if(!existing) {
          errMsg = 'Some of book does not exists.'
          break
        } else if(leftStock < 0) {
          errMsg = `Book "${existing.title}" out of stock.`
          break
        }
      }

      if(typeof errMsg === 'string')
          throw new Error(errMsg)

      return true
    } catch (er) {
      throw new Error(er.message)
    }
  }
}