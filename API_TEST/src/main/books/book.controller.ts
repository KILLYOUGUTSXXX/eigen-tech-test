import { Controller, Get, HttpStatus, Query, Res } from "@nestjs/common";
import { BookService } from "./book.service";
import { Response } from "@utilities/helper-type.util";
import { BookOnhandService } from "./book-onhand.service";
import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DocumentationQueryFindData } from "@utilities/global.util";


@Controller()
export class BookController {
  constructor (
    private bookService: BookService,
    private bookOnhandService: BookOnhandService
  ) {}

  @ApiTags('01 - Books')
  @ApiQuery({ type: DocumentationQueryFindData })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: '4XX', description: 'Something went wrong' })
  @Get()
  async findSomeBooks (
    @Query() query: any,
    @Res() res: Response
  ) {
    return this.bookService.findSomeBooks(query)
    .then(result => {
      return res.asJson(HttpStatus.OK, {
        message: 'OK',
        data: result.data,
        total: result.total,
        page: result.page,
        pageSize: result.pageSize
      })
    }).catch(er => {
      return res.asJson(
        HttpStatus.BAD_REQUEST,
        { message: '[C-BOK-01] Failed to load data books.' },
        { message: er.message }
      )
    })
  }
  
  @ApiTags('01 - Books')
  @ApiQuery({ type: DocumentationQueryFindData })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: '4XX', description: 'Something went wrong' })
  @Get('onhand')
  async findSomeBookOnhands (
    @Query() query: any,
    @Res() res: Response
  ) {
    return this.bookOnhandService.findSomeBookOnhands(query)
    .then(result => {
      return res.asJson(HttpStatus.OK, {
        message: 'OK',
        data: result.data,
        total: result.total,
        page: result.page,
        pageSize: result.pageSize
      })
    }).catch(er => {
      return res.asJson(
        HttpStatus.BAD_REQUEST,
        { message: '[C-BOK-02] Failed to load data onhand books.' },
        { message: er.message }
      )
    })
  }
}