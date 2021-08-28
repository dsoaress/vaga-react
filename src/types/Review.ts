import { UserType } from './User'

export type ReviewType = {
  id: number
  users: UserType
  review: string
}
