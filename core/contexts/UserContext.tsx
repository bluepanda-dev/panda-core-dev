import { useCustomer } from '@core/hooks/useCustomer'
import { useFirebase } from '@core/hooks/useFirebase'
import { useUser } from '@core/hooks/useUser'
import { Profile, USER_DB } from '@core/types'
import { Invoice, Subscription } from '@core/types/customer'
import { getProfileImage } from '@core/utils/images'
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, updateDoc, setDoc } from 'firebase/firestore'
import { createContext, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

type UserContextType = {
  loading: boolean
  user?: any
  profile?: Profile
  auth?: Auth
  setUser: (user: any) => void
  setProfile: (profile: Profile | undefined) => void
  subscription: {
    subscriptionType: string
    isPremium: boolean
    activeSubscription: Subscription | null
    price: number
    nextPayment: string
    invoices: Invoice[]
  }
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
  const {
    subscriptionType,
    isPremium,
    activeSubscription,
    price,
    nextPayment,
    invoices,
    fetchCustomerData,
  } = useCustomer()

  const { fetchUser } = useUser()

  useEffect(() => {
    setAuth(getAuth(app))
    setLoading(false)
  }, [app])

  useEffect(() => {
    async function setUpUser() {
      if (user) {
        setTimeout(async () => {
          const fetchedProfile = await fetchUser(user.uid)
          setProfile(fetchedProfile)
          fetchCustomerData(user!.uid)
        }, 1000)
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
            updateDoc(
              doc(db, USER_DB, userData.uid),
              {
                uid: userData.uid,
                email: userData.email,
                emailVerified: userData.emailVerified,
                firstName: userData.displayName?.split(' ')[0],
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
                language: i18n.language,
                lastLogIn: new Intl.DateTimeFormat('en-US').format(
                  new Date(Number((userData.metadata as any).lastLoginAt)),
                ),
              } as any,
              { merge: true },
            )
          } else {
            setDoc(doc(db, USER_DB, userData.uid), {
              uid: userData.uid,
              email: userData.email,
              emailVerified: userData.emailVerified,
              displayName: userData.displayName,
              firstName: userData.displayName?.split(' ')[0],
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
              language: i18n.language,
              lastLogIn: new Intl.DateTimeFormat('en-US').format(
                new Date(Number((userData.metadata as any).lastLoginAt)),
              ),
              created: new Intl.DateTimeFormat('en-US').format(
                new Date(Number((userData.metadata as any).createdAt)),
              ),
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
      value={{
        user,
        profile,
        auth,
        setProfile,
        setUser,
        loading,
        subscription: {
          subscriptionType,
          isPremium,
          activeSubscription,
          price,
          nextPayment,
          invoices,
        },
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
