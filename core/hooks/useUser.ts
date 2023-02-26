import {
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth'

import { useRouter } from 'next/router'
import { useUserContext } from '@core/contexts/UserContext'
import { Profile, USER_DB, USER_PROFILE_DB } from '@core/types'
import { useQuery } from './useQuery'

export const useUser = () => {
  const { auth, setUser, setProfile } = useUserContext()
  const { fetch, save } = useQuery()
  const router = useRouter()

  async function fetchUser(userId: string) {
    return await fetch<Profile>(USER_DB, userId)
  }

  async function fetchPublicProfile(userId: string) {
    return await fetch<Profile>(USER_PROFILE_DB, userId)
  }

  async function savePublicProfile(profile: Profile) {
    save(profile, USER_PROFILE_DB, profile.uid)
  }

  async function saveUser(profile: Profile) {
    await save(profile, USER_DB, profile.uid)
  }

  async function googleLogIn() {
    const provider = new GoogleAuthProvider()
    return await signInWithPopup(auth!, provider)
  }

  async function twitterLogIn() {
    const provider = new TwitterAuthProvider()
    return await signInWithPopup(auth!, provider)
  }

  async function githubLogIn() {
    const provider = new GithubAuthProvider()
    return await signInWithPopup(auth!, provider)
  }

  async function facebookLogIn() {
    const provider = new FacebookAuthProvider()
    return await signInWithPopup(auth!, provider)
  }

  async function nativeLogIn(email: string, password: string) {
    return await signInWithEmailAndPassword(auth!, email, password)
  }

  async function nativeCreateAccount(email: string, password: string) {
    return await createUserWithEmailAndPassword(auth!, email, password)
  }

  function logOut() {
    signOut(auth!)
    setUser(undefined)
    setProfile(undefined)
    router.push('/')
  }

  return {
    googleLogIn,
    twitterLogIn,
    githubLogIn,
    facebookLogIn,
    nativeLogIn,
    nativeCreateAccount,
    logOut,
    saveUser,
    savePublicProfile,
    fetchUser,
    fetchPublicProfile,
  }
}
