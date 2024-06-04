import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from "@nestjs/common";
import { Response } from "@utilities/helper-type.util";
import { MemberService } from "./member.service";
import { BorrowBookDTO } from "@common-dtos/main/borrow-book.dto";
import { ApiBody, ApiParam, ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { DocumentationQueryFindData } from "@utilities/global.util";


@Controller()
export class MemberController {
  constructor (
    private memberService: MemberService
  ) {}

  @ApiTags('02 - Members')
  @ApiQuery({ type: DocumentationQueryFindData })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: '4XX', description: 'Something went wrong' })
  @Get()
  async findSomeMembers (
    @Query() query: any,
    @Res() res: Response
  ) {
    return this.memberService.findSomeMembers(query)
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
        { message: '[C-MBR-01] failed to load data members.' },
        { message: er.message }
      )
    })
  }

  @ApiTags('02 - Members')
  @ApiParam({ name: 'memberID', type: Number })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: '4XX', description: 'Something went wrong' })
  @Get('penalized/:memberID')
  async checkMemberPenalized (
    @Res() res: Response,
    @Param('memberID') memberID: number
  ) {
    return this.memberService.checkMemberPenalized(memberID)
    .then(result => {
      return res.asJson(HttpStatus.OK, {
        message: 'OK',
        data: result
      })
    }).catch(er => {
      return res.asJson(
        er?.httpCode || HttpStatus.BAD_REQUEST,
        { message: '[C-MBR-02] failed to get data member penalized.' },
        { message: er.message }
      )
    })
  }

  @ApiTags('02 - Members')
  @ApiParam({ name: 'memberID', type: Number })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: '4XX', description: 'Something went wrong' })
  @Get('borrow/:memberID')
  async countMemberBorrowedBooks (
    @Res() res: Response,
    @Param('memberID') memberID: number
  ) {
    return this.memberService.countMemberBorrowedBooks(memberID)
    .then(result => {
      return res.asJson(HttpStatus.OK, {
        message: 'OK',
        data: result
      })
    }).catch(er => {
      return res.asJson(
        HttpStatus.BAD_REQUEST,
        { message: '[C-MBR-03] failed to get count of borrowed books.' },
        { message: er.message }
      )
    })
  }
  
  @ApiTags('04 - Borrow Books')
  @ApiBody({ type: BorrowBookDTO })
  @ApiResponse({ status: 200, description: 'Success' })
  @ApiResponse({ status: '4XX', description: 'Something went wrong' })
  @Post('borrow')
  async memberBorrowedBooks (
    @Res() res: Response,
    @Body() body: BorrowBookDTO
  ) {
    return this.memberService.memberBorrowedBooks(body)
    .then(result => {
      return res.asJson(HttpStatus.OK, {
        message: 'OK',
        data: result
      })
    }).catch(er => {
      return res.asJson(
        HttpStatus.BAD_REQUEST,
        { message: '[C-MBR-04] failed to borrowed books.' },
        { message: er.message }
      )
    })
  }
}