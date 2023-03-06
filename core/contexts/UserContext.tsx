import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFirebase } from '@core/hooks/useFirebase'
import { useUser } from '@core/hooks/useUser'
import { Profile, USER_DB } from '@core/types'
import { getProfileImage } from '@core/utils/images'

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
  const { i18n } = useTranslation()
  const [auth, setAuth] = useState<Auth | undefined>(undefined)
  const [user, setUser] = useState<any>(undefined)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState<Profile | undefined>(undefined)

  const { fetchUser } = useUser()

  function commonFields(userData: any) {
    return {
      uid: userData.uid,
      email: userData.email,
      emailVerified: userData.emailVerified,
      metadata: {
        createdAt: (userData.metadata as any).createdAt,
        creationTime: userData.metadata.creationTime,
        lastSignInTime: userData.metadata.lastSignInTime,
        lastLoginAt: (userData.metadata as any).lastLoginAt,
      },
      language: i18n.language,
      lastLogIn: new Intl.DateTimeFormat('en-US').format(
        new Date(Number((userData.metadata as any).lastLoginAt)),
      ),
      providerData: {
        providerId: userData.providerData[0].providerId,
      },
    }
  }

  useEffect(() => {
    setAuth(getAuth(app))
    setLoading(false)
  }, [app])

  useEffect(() => {
    async function setUpUser() {
      if (user) {
        // there is some delay between the user being set and the auth being set
        const retry = setInterval(async () => {
          const fetchedProfile = await fetchUser(user.uid)
          if (fetchedProfile) {
            clearInterval(retry)
          }
          setProfile(fetchedProfile)
        }, 500)
      }
    }
    setUpUser()
  }, [user])

  useEffect(() => {
    if (auth) {
      onAuthStateChanged(auth, async (userData) => {
        if (userData) {
          setUser(userData)

          const docRef = doc(db, USER_DB, userData.uid)
          const docSnap = await getDoc(docRef)

          if (docSnap.exists()) {
            // when using user an email the info is different
            if (userData.providerData[0].providerId === 'password') {
              updateDoc(
                doc(db, USER_DB, userData.uid),
                {
                  ...commonFields(userData),
                } as any,
                { merge: true },
              )
            } else {
              updateDoc(
                doc(db, USER_DB, userData.uid),
                {
                  ...commonFields(userData),
                  firstName: userData.displayName?.split(' ')[0],
                  photoURL: getProfileImage(userData),
                } as any,
                { merge: true },
              )
            }
          } else {
            // when using user an email the info is different
            if (userData.providerData[0].providerId === 'password') {
              setDoc(doc(db, USER_DB, userData.uid), {
                ...commonFields(userData),
                displayName: '',
                created: new Intl.DateTimeFormat('en-US').format(
                  new Date(Number((userData.metadata as any).createdAt)),
                ),
              })
            } else {
              setDoc(doc(db, USER_DB, userData.uid), {
                ...commonFields(userData),
                displayName: userData.displayName,
                firstName: userData.displayName?.split(' ')[0],
                photoURL: getProfileImage(userData),
                created: new Intl.DateTimeFormat('en-US').format(
                  new Date(Number((userData.metadata as any).createdAt)),
                ),
              })
            }
          }
        } else {
          setUser(undefined)
        }
      })
    }
  }, [auth])

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        auth,
        setProfile,
        setUser,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
