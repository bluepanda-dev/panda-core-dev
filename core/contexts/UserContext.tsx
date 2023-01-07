import { useFirebase } from '@core/hooks/useFirebase'
import { useUser } from '@core/hooks/useUser'
import { Profile } from '@core/types'
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth'
import { setDoc, doc } from 'firebase/firestore/lite'
import { createContext, useContext, useEffect, useState } from 'react'

type UserContextType = {
  user?: any
  profile?: Profile
  auth?: Auth
  setUser: (user: any) => void
  setProfile: (profile: Profile | undefined) => void
}

const UserContext = createContext({} as UserContextType)

export function useUserContext() {
  return useContext(UserContext)
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { db, app } = useFirebase()
  const [auth, setAuth] = useState<Auth | undefined>(undefined)
  const [user, setUser] = useState<any>(undefined)
  const [profile, setProfile] = useState<Profile | undefined>(undefined)

  const { fetchUser } = useUser()

  useEffect(() => {
    setAuth(getAuth(app))
  }, [app])

  useEffect(() => {
    async function setUpUser() {
      if (user) {
        setProfile(await fetchUser(user!.uid))
      }
    }
    setUpUser()
  }, [user])

  useEffect(() => {
    if (auth) {
      onAuthStateChanged(auth, async (userData) => {
        console.log('onAuthStateChanged', userData)
        if (userData) {
          setUser(userData)
          setDoc(
            doc(db, 'users', userData.uid),
            {
              uid: userData.uid,

              email: userData.email,
              emailVerified: userData.emailVerified,
              displayName: userData.displayName,
              photoURL: userData.photoURL,
              providerData: {
                providerId: userData.providerData[0].providerId,
              },
              metadata: {
                createdAt: (userData.metadata as any).createdAt,
                creationTime: userData.metadata.creationTime,
                lastSignInTime: userData.metadata.lastSignInTime,
                lastLoginAt: (userData.metadata as any).lastLoginAt,
              },
            },
            { merge: true },
          )
        } else {
          console.log('loging out')
          setUser(undefined)
        }
      })
    }
  }, [auth])

  return (
    <UserContext.Provider value={{ user, profile, auth, setProfile, setUser }}>
      {children}
    </UserContext.Provider>
  )
}
