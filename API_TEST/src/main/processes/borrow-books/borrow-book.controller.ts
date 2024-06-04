import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from "@nestjs/common";
import { Response } from "@utilities/helper-type.util";
import { ReturnBookDTO } from "@common-dtos/main/return-book.dto";
import { BorrowBookService } from "./borrow-book.service";
import { ApiBody, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";


@Controller()
export class BorrowBookController {
  constructor (
    private borrowBookService: BorrowBookService
  ) {}

  @ApiTags('05 - Get list Remaining Borrowed Books')
  @ApiParam({ name: 'memberID', type: Number })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: '4XX', description: 'Something went wrong' })
  @Get('remaining/:memberID')
  async getListRemainingBorrowedBook (
    @Param('memberID') memberID: number,
    @Res() res: Response
  ) {
    return this.borrowBookService.getListRemainingBorrowedBook(memberID)
    .then(result => {
      return res.asJson(HttpStatus.OK, {
        message: 'OK',
        data: result,
        total: result.length
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