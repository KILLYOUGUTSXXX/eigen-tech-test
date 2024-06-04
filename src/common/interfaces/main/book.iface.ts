import { Moment } from "moment"


export interface IBooks {
  id: number
  code: string
  title: string
  author: string
  stock: number
  created_at: Moment
  updated_at?: Moment
}

export interface IOnhandBooks {
  id: string
  code: string
  title: string
  author: string
  qty: number
}