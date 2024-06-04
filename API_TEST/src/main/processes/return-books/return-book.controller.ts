import { Body, Controller, Get, HttpStatus, Post, Query, Res } from "@nestjs/common";
import { Response } from "@utilities/helper-type.util";
import { ReturnBookService } from "./return-book.service";
import { ReturnBookDTO } from "@common-dtos/main/return-book.dto";
import { ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";


@Controller()
export class ReturnBookController {
  constructor (
    private returnBookService: ReturnBookService
  ) {}

  @ApiTags('06 - Return the books')
  @ApiBody({ type: ReturnBookDTO })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: '4XX', description: 'Something went wrong' })
  @Post()
  async createReturnBook (
    @Body() body: ReturnBookDTO,
    @Res() res: Response
  ) {
    return this.returnBookService.createReturnBook(body)
    .then(result => {
      return res.asJson(HttpStatus.OK, {
        message: 'OK',
        data: result
      })
    }).catch(er => {
      return res.asJson(
        HttpStatus.BAD_REQUEST,
        { message: '[C-RBOK-01] Failed to return books.' },
        { message: er.message }
      )
    })
  }
}