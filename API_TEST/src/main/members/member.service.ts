import { BorrowBookDTO } from "@common-dtos/main/borrow-book.dto";
import { IMembers } from "@common-ifaces/main/member.iface";
import { BorrowBookService } from "@main/processes/borrow-books/borrow-book.service";
import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectModel } from "@nestjs/sequelize";
import { TAttributes } from "@utilities/helper-type.util";
import { queryGeneratorSql } from "@utilities/query-generator.util";
import { ServiceHelpers } from "@utilities/service-helper.util";
import * as moment from "moment";
import { Op, Sequelize, Transaction } from "sequelize";
import { MemberSchema } from "@common-schemas/public/member.table";

const attributes: TAttributes<IMembers> = {
  mf: [
    'id', 'code', 'name', 'created_at', 'updated_at', 'penalty_exp_at'
  ],
  bf: [
    'code', 'name', 'created_at', 'updated_at', 'penalty_exp_at'
  ],
  mnf: [
    'code', 'name'
  ]
}


@Injectable()
export class MemberService {
  constructor (
    @InjectModel(MemberSchema) private memberSchema: typeof MemberSchema,

    @InjectConnection() private connection: Sequelize,

    private borrowService: BorrowBookService
  ) {}

  private async getOneMember (id: number, checkExists?: boolean): Promise<IMembers> {
    try {
      const member = await this.memberSchema.findOne({
        attributes: attributes.mf,
        where: { id },   
        raw: true
      })

      if(checkExists && !member)
        throw new Error('Member is not exists.')

      return member
    } catch (er) {
      throw new Error(er.message)
    }
  }

  async findSomeMembers (query: any) {
    const tmpAttributes = ServiceHelpers.getAttributes(attributes, query._mode)
    const querying = queryGeneratorSql(attributes.bf, query, true)

    return this.memberSchema.findAndCountAll({
      attributes: tmpAttributes,
      ...querying,
      raw: true
    }).then(a => ({
      data: a.rows,
      total: a.count,
      page: querying.page,
      pageSize: querying.limit
    }))
  }

  async countMemberBorrowedBooks (id: number) {
    try {
      const member = await this.getOneMember(id, true)
      const [counted] = await this.borrowService.getCountBorrowBookByMember(id)

      return {
        ...member,
        count_borrowed_books: (counted?.count || 0)
      }
    } catch (er) {
      throw new Error(er.message)
    }
  }

  async checkMemberPenalized (id: number) {
    try {
      const data = await this.getOneMember(id, true)

      if(!data?.penalty_exp_at)
        return {
          status_penalty: false,
          message: 'This member are free from punishment.',
          penalty_time_until: null
        }
      else
        return {
          status_penalty: true,
          message: 'This member was penalized.',
          penalty_time_until: moment(data.penalty_exp_at).format('DD/MMM/YYYY HH:mm:ss')
        }
    } catch (er) {
      throw new Error(er.message)
    }
  }

  async memberBorrowedBooks (payload: BorrowBookDTO) {
    const transaction = await this.connection.transaction()
    try {
      // check member if exists
      const member = await this.getOneMember(payload.member_id, true)
      // check penalty member
      if(!!member.penalty_exp_at && moment().diff(moment(member.penalty_exp_at), 'hour') < 0)
        throw new Error('This member not able to borrow the books, for the several times.')
      
      // create borrowed books
      await this.borrowService.createBorrowBook(payload, transaction)

      // remove penalty
      await this.memberSchema.update({
        penalty_exp_at: null,
        updated_at: moment()
      }, { where: { id: payload.member_id }, transaction })

      await transaction.commit()
      return true
    } catch (er) {
      await transaction.rollback()
      throw new Error(er.message)
    }
  }

  async setPenaltyTime (id: number, transaction: Transaction) {
    return this.memberSchema.update({
      penalty_exp_at: moment().add(3, 'day'),
      updated_at: moment()
    }, { where: { id }, transaction })
  }
}