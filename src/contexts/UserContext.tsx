import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from 'react'

import { UserType } from '../types/User'
import { retrieveUserProfile } from '../utils/retrieveUserProfile'

type UserContextData = {
  user: UserType | null
  setUser: Dispatch<SetStateAction<UserType>>
  signOut: () => void
}

const UserContext = createContext({} as UserContextData)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType>(null)

  const userId = localStorage.getItem('userId')

  useEffect(() => {
    if (userId) {
      retrieveUserProfile(Number(userId)).then(data => {
        setUser(data)
      })
    }
  }, [userId])

  async function signOut() {
    setUser(null)
    localStorage.clear()
  }

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        signOut
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
