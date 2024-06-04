import { BorrowBookDTO, BorrowBookNested } from "@common-dtos/main/borrow-book.dto";
import { BookOnhandService } from "@main/books/book-onhand.service";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import * as moment from "moment";
import { Op, Sequelize, Transaction } from "sequelize";
import { BorrowBookSchema } from "@common-schemas/public/borrow-book.table";
import { ViewBorrowBookSchema } from "@common-schemas/public/borrow-book.view";

@Injectable()
export class BorrowBookService {
  constructor (
    @InjectModel(BorrowBookSchema) private borrowBookSchema: typeof BorrowBookSchema,
    @InjectModel(ViewBorrowBookSchema) private vwBorrowBookSchema: typeof ViewBorrowBookSchema,

    private onhandService: BookOnhandService
  ) {}

  async createBorrowBook (data: BorrowBookDTO, transaction: Transaction) {
    try {
      // Validating & checking stock minus, upon the out stock
      await this.onhandService.checkStockMinus(data.books, transaction)

      const dateNow = moment()
      const currentBorroweds = await this.findAllBorrowedBooksByMember(data.member_id, transaction)
      
      const {
        sumCurrent,
        someExpired
      } = currentBorroweds.reduce((a, b) => ({
        sumCurrent: a.sumCurrent + b.remaining_return_qty,
        someExpired: moment() > moment(b.expired_at) ? true : a.someExpired
      }), {
        sumCurrent: 0,
        someExpired: false
      })

      // Sum qty & build a bulking data before it inserting to the schema
      const {
        sumQty,
        storeData
      } = data.books.reduce((a, b) => ({
        sumQty: a.sumQty + b.qty,
        storeData: a.storeData.concat([{
          book_id: b.book_id,
          member_id: data.member_id,
          qty: b.qty,
          expired_at: dateNow.add(7, 'day'),
          created_at: dateNow
        }])
      }), {
        sumQty: 0,
        storeData: []
      })
      
      const totalCount = sumCurrent + sumQty
      if(totalCount > 2)
        throw new Error('The limit has been reached, for this member.')
      else if (someExpired)
        throw new Error('Several books that already borrowed by this member, have not been returned.')

      await this.borrowBookSchema.bulkCreate(storeData, { transaction })

      return true
    } catch (er) {
      throw new Error(er.message)
    }
  }

  async findAllBorrowedBooksByMember (memberID: number, transaction?: Transaction) {
    try {
      return this.borrowBookSchema.findAll({
        attributes: ['*'],
        where: {
          remaining_return_qty: { [Op.gt]: 0 },
          member_id: memberID
        },
        raw: true,
        transaction
      })
    } catch (er) {
      throw new Error(er.message)
    }
  }

  async getCountBorrowBookByMember (memberID: number, transaction?: Transaction) {
    try {
      return this.borrowBookSchema.count({
        where: {
          remaining_return_qty: { [Op.gt]: 0 },
          member_id: memberID
        },
        group: ['member_id'],
        transaction
      })
    } catch (er) {
      throw new Error(er.message)
    }
  }

  async decreaseRemainingQty (
    id: number,
    qty: number,
    transaction: Transaction
  ) {
    try {
      return this.borrowBookSchema.update({
        remaining_return_qty: Sequelize.literal(`remaining_return_qty - ${qty}`)
      }, {
        where: {
          id
        },
        transaction
      })
    } catch (er) {
      throw new Error(er.message)
    }
  }

  async getListRemainingBorrowedBook (memberID: number) {
    return this.vwBorrowBookSchema.findAll({
      attributes: ['*'],
      where: {
        member_id: memberID,
        remaining_return_qty: { [Op.gt]: 0 }
      },
      raw: true
    })
  }
  
}