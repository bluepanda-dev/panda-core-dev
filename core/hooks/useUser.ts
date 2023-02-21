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
import { useQuery } from './useQuery'

export const useUser = () => {
  const { auth, setUser, setProfile } = useUserContext()
  const { fetch, save } = useQuery()

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
