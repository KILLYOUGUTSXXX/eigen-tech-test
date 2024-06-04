import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { MemberService } from "./member.service";
import { MemberController } from "./member.controller";
import { BorrowBookModules } from "@main/processes/borrow-books/borrow-book.module";
import { MemberSchema } from "@common-schemas/public/member.table";

@Module({
  imports: [
    BorrowBookModules,
    SequelizeModule.forFeature([
      MemberSchema
    ])
  ],
  controllers: [MemberController],
  providers: [MemberService],
  exports: [MemberService]
})
export class MemberModules {}