import { Moment } from "moment"


export interface IBorrowBooks {
  id: number
  member_id: number
  book_id: number
  qty: number
  remaining_return_qty: number
  expired_at: Moment
  created_at: Moment
}

export interface IReturnBooks {
  id: number
  borrow_id: number
  return_date: Moment
  created_at: Moment
}