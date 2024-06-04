import { Transform } from "class-transformer"
import { IsDateString, IsNotEmpty, IsNumber, IsString, Matches, Max, MaxLength, Min } from "class-validator"


export class CheckStockMinus {
  @IsNumber()
  @IsNotEmpty()
  book_id: number

  @IsNumber()
  @IsNotEmpty()
  qty: number
}