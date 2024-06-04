import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { BookController } from "./book.controller";
import { BookService } from "./book.service";
import { BookOnhandService } from "./book-onhand.service";
import { BookSchema } from "@common-schemas/public/book.table";
import { OnhandSchema } from "@common-schemas/public/onhand.table";
import { ViewOnhandSchema } from "@common-schemas/public/onhand.view";

@Module({
  imports: [
    SequelizeModule.forFeature([
      BookSchema,
      OnhandSchema,
      ViewOnhandSchema
    ])
  ],
  controllers: [BookController],
  providers: [BookService, BookOnhandService],
  exports: [BookService, BookOnhandService]
})
export class BookModules {}