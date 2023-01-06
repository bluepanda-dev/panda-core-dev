import { collection, getDocs } from 'firebase/firestore/lite'
import { useFirebase } from './useFirebase'
import {
  getAuth,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  Auth,
} from 'firebase/auth'
import { userAtom } from '@core/store/Common'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

export const useUser = () => {
  const [auth, setAuth] = useState<Auth | undefined>(undefined)
  const [user, setUser] = useAtom(userAtom)
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
        } else {
          console.log('loging out')
          setUser(undefined)
        }
      })
    }
  }, [auth])

  async function getCustomers() {
    if (!db) {
      throw new Error('Not database configured')
    }
    console.log('db:>>', db)
    const querySnapshot = await getDocs(collection(db, 'customers'))
    querySnapshot.forEach((doc) => {
      console.log(`docs:>>>> ${doc.id} `, doc.data())
    })
  }

  async function googleLogIn() {
    const provider = new GoogleAuthProvider()
    console.log('auth', auth)
    try {
      await signInWithPopup(auth!, provider)
    } catch (err) {
      console.log('Err', err)
    }
  }

  function logOut() {
    signOut(auth!)
    setUser(undefined)
  }

  return {
    getCustomers,
    user,
    googleLogIn,
    logOut,
  }
}
