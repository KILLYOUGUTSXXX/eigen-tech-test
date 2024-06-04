import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { BorrowBookService } from "./borrow-book.service";
import { BookModules } from "@main/books/book.module";
import { BorrowBookController } from "./borrow-book.controller";
import { ViewBorrowBookSchema } from "@common-schemas/public/borrow-book.view";
import { BorrowBookSchema } from "@common-schemas/public/borrow-book.table";

@Module({
  imports: [
    BookModules,
    SequelizeModule.forFeature([
      BorrowBookSchema,
      ViewBorrowBookSchema
    ])
  ],
  controllers: [BorrowBookController],
  providers: [BorrowBookService],
  exports: [BorrowBookService]
})
export class BorrowBookModules {}