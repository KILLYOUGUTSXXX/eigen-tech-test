import { Moment } from "moment"


export const ONHAND_STOCK_TYPE = ['BORROW', 'RETURN', 'BEGIN'] as const

export class IOnhands {
  id: number
  ref_id: number
  book_id: number
  stock_type: string
  /** Date of stock: including number (unix of timestamps) */
  date_of_stock: number
  qty: string
}
