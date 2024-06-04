import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { BorrowBookModules } from "../borrow-books/borrow-book.module";
import { ReturnBookController } from "./return-book.controller";
import { ReturnBookService } from "./return-book.service";
import { MemberModules } from "@main/members/member.module";
import { ReturnBookSchema } from "@common-schemas/public/return-book.table";


@Module({
  imports: [
    BorrowBookModules,
    MemberModules,
    SequelizeModule.forFeature([
      ReturnBookSchema
    ])
  ],
  controllers: [ReturnBookController],
  providers: [ReturnBookService],
  exports: [ReturnBookService]
})
export class ReturnBookModules {}