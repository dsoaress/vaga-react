import { api } from '../services/api'
import { UserType } from '../types/User'

export async function retrieveUserProfile(userId: number) {
  let userProfile: UserType = null

  try {
    const { data } = await api.get<UserType>(`users/${userId}`)

    userProfile = data
  } catch (error) {
    console.log(error)
  }

  return userProfile
}
