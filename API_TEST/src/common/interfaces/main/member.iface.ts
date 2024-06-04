import { Moment } from "moment"

export const StatusMemberPenalized = ['AWAIT', 'OPEN', 'CLOSE'] as const

export interface IMembers {
  id: number
  code: string
  name: string
  penalty_exp_at?: Moment
  created_at: Moment
  updated_at?: Moment
}