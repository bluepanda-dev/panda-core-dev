import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
} from 'firebase/firestore/lite'
import { useFirebase } from './useFirebase'
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  onAuthStateChanged,
  Auth,
} from 'firebase/auth'
import { userAtom } from '@core/store/Common'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { Profile } from '@core/types'

export const useUser = () => {
  const [auth, setAuth] = useState<Auth | undefined>(undefined)
  const [user, setUser] = useAtom(userAtom)
  const [profile, setProfile] = useState<null | any>(null)
  const { db, app } = useFirebase()

  useEffect(() => {
    setAuth(getAuth(app))
  }, [])

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

  useEffect(() => {
    async function setUpUser() {
      if (user) {
        setProfile(await fetchUser(user.uid))
      }
    }
    setUpUser()
  }, [user])

  async function fetchUser(userId: string) {
    if (!db) {
      throw new Error('Not database configured')
    }

    const docRef = doc(db, 'users', userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data()
    }

    return null
  }

  async function saveProfile(profile: Profile) {
    if (!db) {
      throw new Error('Not database configured')
    }
    await setDoc(
      doc(db, 'users', profile.uid),
      {
        website: profile.website,
        notifications: profile.notifications,
      },
      { merge: true },
    )
  }

  async function googleLogIn() {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth!, provider)
  }

  async function twitterLogIn() {
    const provider = new TwitterAuthProvider()
    await signInWithPopup(auth!, provider)
  }

  async function githubLogIn() {
    const provider = new GithubAuthProvider()
    await signInWithPopup(auth!, provider)
  }

  function logOut() {
    signOut(auth!)
    setUser(undefined)
  }

  return {
    user,
    profile,
    googleLogIn,
    twitterLogIn,
    githubLogIn,
    logOut,
    saveProfile,
  }
}
