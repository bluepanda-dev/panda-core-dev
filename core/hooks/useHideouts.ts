import { Hideout } from '@core/types'
import { v4 as uuidv4 } from 'uuid'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from 'firebase/firestore'
import { useFirebase } from './useFirebase'

const ANONYMOUS_UID_KEY = 'anonymous-uid'

export const useHideouts = () => {
  const { db } = useFirebase()
  let hideoutsSub: () => void = () => {}
  let hideoutSub: () => void = () => {}

  function getVisitorUID() {
    let anonymusUID = localStorage.getItem(ANONYMOUS_UID_KEY)
    if (!anonymusUID) {
      localStorage.setItem(ANONYMOUS_UID_KEY, uuidv4())
      anonymusUID = localStorage.getItem(ANONYMOUS_UID_KEY)
    }
    return anonymusUID || ''
  }

  async function subscribeHideout(
    uid: string,
    callback: (data: Hideout) => void,
  ) {
    const docRef = doc(db, 'hideouts', uid)
    if (hideoutSub) {
      console.log('unsubscribe hideout')
      hideoutSub()
    }
    console.log('subscribe hideout')
    hideoutSub = onSnapshot(docRef, (doc) => {
      console.log('Current data: ', doc.data())
      callback(doc.data() as Hideout)
    })

    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      callback(docSnap.data() as Hideout)
    }
  }

  async function subscribeHideouts(
    uid: string,
    callback: (data: Hideout[]) => void,
  ) {
    if (hideoutsSub) {
      hideoutsSub()
      console.log('onHideouts unsuib', uid)
    }
    const q = query(collection(db, 'hideouts'), where('owner', '==', uid))
    hideoutsSub = onSnapshot(q, (querySnapshot) => {
      const hideouts: Hideout[] = []
      querySnapshot.forEach((doc) => {
        hideouts.push(doc.data() as Hideout)
      })
      console.log('onHideouts', hideouts)
      callback(hideouts)
    })

    const hideouts: Hideout[] = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      hideouts.push(doc.data() as Hideout)
    })
    callback(hideouts)
  }

  async function update(hideout: Hideout) {
    if (!db) {
      throw new Error('Not database configured')
    }
    await setDoc(
      doc(db, 'hideouts', hideout.uid),
      {
        ...hideout,
      },
      { merge: true },
    )
  }

  async function add(hideout: Omit<Hideout, 'uid'>) {
    if (!db) {
      throw new Error('Not database configured')
    }
    const newRef = await doc(collection(db, 'hideouts'))

    await setDoc(doc(db, 'hideouts', newRef.id), {
      ...hideout,
      uid: newRef.id,
    })
  }

  return {
    subscribeHideout,
    subscribeHideouts,
    update,
    add,
    getVisitorUID,
  }
}
