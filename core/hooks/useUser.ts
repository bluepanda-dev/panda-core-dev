import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useFirebase } from './useFirebase'
import { Profile } from '@core/types'
import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
} from 'firebase/auth'
import { useUserContext } from '@core/contexts/UserContext'

export const useUser = () => {
  const { auth, setUser, setProfile } = useUserContext()
  const { db } = useFirebase()

  async function fetchUser(userId: string): Promise<Profile | undefined> {
    if (!db) {
      throw new Error('Not database configured')
    }

    const docRef = doc(db, 'users', userId)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      return docSnap.data() as Profile
    }

    return undefined
  }

  async function saveProfile(profile: Profile) {
    if (!db) {
      throw new Error('Not database configured')
    }
    await setDoc(
      doc(db, 'users', profile.uid),
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

  function logOut() {
    signOut(auth!)
    setUser(undefined)
    setProfile(undefined)
  }

  return {
    googleLogIn,
    twitterLogIn,
    githubLogIn,
    logOut,
    saveProfile,
    fetchUser,
  }
}
