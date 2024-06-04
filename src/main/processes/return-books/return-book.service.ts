import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/sequelize";
import * as moment from "moment";
import { Op, Sequelize, Transaction } from "sequelize";
import { ReturnBookSchema } from "@common-schemas/public/return-book.table";
import { BorrowBookService } from "../borrow-books/borrow-book.service";
import { ReturnBookDTO } from "@common-dtos/main/return-book.dto";
import { MemberService } from "@main/members/member.service";

@Injectable()
export class ReturnBookService {
  constructor (
    @InjectModel(ReturnBookSchema) private returnBookSchema: typeof ReturnBookSchema,

    @InjectConnection() private connection: Sequelize,
    private borrowBookService: BorrowBookService,
    private memberService: MemberService
    
  ) {}

  async createReturnBook (data: ReturnBookDTO) {
    const dateNow = moment()
    const transaction = await this.connection.transaction()
    try {
      const borrows = await this.borrowBookService.findAllBorrowedBooksByMember(data.member_id, transaction)
      let mapExisting: { [P: number]: number } = borrows.reduce((a, b) => ({
        ...a,
        [b.id]: b.remaining_return_qty
      }), {}) 
      let errMsg: string

      let storeDataReturn: Array<any> = []
      for(const x in data.borrows) {
        const items = data.borrows[x]
        const current = mapExisting[items.borrow_id]

        if([null, undefined].indexOf(current) !== -1) {
          errMsg = 'Some of items, was not found !!!'
          break
        } else if (items.qty > current) {
          errMsg = 'The returned book is most than the required.'
          break
        }

        mapExisting[items.borrow_id] -= items.qty
        await this.borrowBookService.decreaseRemainingQty(items.borrow_id, items.qty, transaction)
        storeDataReturn.push({
          borrow_id: items.borrow_id,
          return_qty: items.qty,
          created_at: dateNow
        })
      }

      if(typeof errMsg === 'string')
        throw new Error(errMsg)

      await this.returnBookSchema.bulkCreate(storeDataReturn, { transaction })

      // validate expired date upon effective date of returns the books
      const hadExpiredDate = borrows.reduce((a, b) => moment() > moment(b.expired_at) ? true : a, false)
      if(hadExpiredDate)
        await this.memberService.setPenaltyTime(data.member_id, transaction)
      
      await transaction.commit()
      return true
    } catch (er) {
      await transaction.rollback()
      throw new Error(er.message)
    }
  }
}