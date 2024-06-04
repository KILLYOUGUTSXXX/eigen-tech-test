import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator"


export class BorrowBookNested {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  book_id: number

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  qty: number
}

export class BorrowBookDTO {
  @Type(() => BorrowBookNested)
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  @ApiProperty({ type: BorrowBookNested, isArray: true })
  books: Array<BorrowBookNested>

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  member_id: number
}