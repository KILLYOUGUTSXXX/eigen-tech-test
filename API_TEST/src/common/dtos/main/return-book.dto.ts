import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { ArrayNotEmpty, IsArray, IsNotEmpty, IsNumber, ValidateNested } from "class-validator"


export class ReturnBookNested {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  borrow_id: number

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  qty: number
}

export class ReturnBookDTO {
  @Type(() => ReturnBookNested)
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayNotEmpty()
  @IsNotEmpty()
  @ApiProperty({ type: ReturnBookNested, isArray: true })
  borrows: Array<ReturnBookNested>

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  member_id: number
}