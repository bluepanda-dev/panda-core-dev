import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useFirebase } from './useFirebase'
import { Profile, USER_DB, USER_PROFILE_DB } from '@core/types'
import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
} from 'firebase/auth'
import { useUserContext } from '@core/contexts/UserContext'

export const useUser = () => {
  const { auth, setUser, setProfile } = useUserContext()
  const { db } = useFirebase()

  async function fetchUser(userId: string): Promise<Profile | undefined> {
    if (!db) {
      throw new Error('Not database configured')
    }

    const docRef = doc(db, USER_DB, userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data() as Profile
      return data
    }

    return undefined
  }

  async function fetchPublicProfile(
    userId: string,
  ): Promise<Profile | undefined> {
    if (!db) {
      throw new Error('Not database configured')
    }

    const docRef = doc(db, USER_PROFILE_DB, userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as Profile
    }

    return undefined
  }

  async function savePublicProfile(profile: Profile) {
    if (!db) {
      throw new Error('Not database configured')
    }
    await setDoc(doc(db, USER_PROFILE_DB, profile.uid), {
      ...profile,
      uid: profile.uid,
    })
  }

  async function saveUser(profile: Profile) {
    if (!db) {
      throw new Error('Not database configured')
    }
    await setDoc(
      doc(db, USER_DB, profile.uid),
      {
        ...profile,
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

  async function facebookLogIn() {
    const provider = new FacebookAuthProvider()
    await signInWithPopup(auth!, provider)
  }

  function logOut() {
    console.log('logOut')
    signOut(auth!)
    setUser(undefined)
    setProfile(undefined)
  }

  return {
    googleLogIn,
    twitterLogIn,
    githubLogIn,
    facebookLogIn,
    logOut,
    saveUser,
    savePublicProfile,
    fetchUser,
    fetchPublicProfile,
  }
}
