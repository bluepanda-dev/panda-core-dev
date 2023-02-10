import { useFirebase } from '@core/hooks/useFirebase'
import { useUser } from '@core/hooks/useUser'
import { Profile, USER_DB } from '@core/types'
import { getProfileImage } from '@core/utils/images'
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'

type UserContextType = {
  loading: boolean
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
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | undefined>(undefined)

  const { fetchUser } = useUser()

  useEffect(() => {
    console.log('UserProvider: useEffect')
    setAuth(getAuth(app))
    setLoading(false)
  }, [app])

  useEffect(() => {
    async function setUpUser() {
      if (user) {
        console.log('user', user)
        setProfile(await fetchUser(user!.uid))
      }
    }
    setUpUser()
  }, [user])

  useEffect(() => {
    if (auth) {
      onAuthStateChanged(auth, async (userData) => {
        if (userData) {
          console.log(
            'UserProvider: onAuthStateChanged: userData',
            userData.uid,
          )
          setUser(userData)

          const docRef = doc(db, USER_DB, userData.uid)
          const docSnap = await getDoc(docRef)
          console.log('docSnap user exists??? ', docSnap)

          if (docSnap.exists()) {
            updateDoc(
              doc(db, USER_DB, userData.uid),
              {
                uid: userData.uid,
                email: userData.email,
                emailVerified: userData.emailVerified,
                displayName: userData.displayName,
                photoURL: getProfileImage(userData),
                providerData: {
                  providerId: userData.providerData[0].providerId,
                },
                metadata: {
                  createdAt: (userData.metadata as any).createdAt,
                  creationTime: userData.metadata.creationTime,
                  lastSignInTime: userData.metadata.lastSignInTime,
                  lastLoginAt: (userData.metadata as any).lastLoginAt,
                },
              } as any,
              { merge: true },
            )
          } else {
            setDoc(doc(db, USER_DB, userData.uid), {
              uid: userData.uid,
              email: userData.email,
              emailVerified: userData.emailVerified,
              displayName: userData.displayName,
              photoURL: getProfileImage(userData),
              providerData: {
                providerId: userData.providerData[0].providerId,
              },
              metadata: {
                createdAt: (userData.metadata as any).createdAt,
                creationTime: userData.metadata.creationTime,
                lastSignInTime: userData.metadata.lastSignInTime,
                lastLoginAt: (userData.metadata as any).lastLoginAt,
              },
            })
          }
        } else {
          setUser(undefined)
        }
      })
    }
  }, [auth])

  return (
    <UserContext.Provider
      value={{ user, profile, auth, setProfile, setUser, loading }}
    >
      {children}
    </UserContext.Provider>
  )
}
