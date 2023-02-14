import { Hideout, USER_HIDEOUTS_DB } from '@core/types'
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
    const docRef = doc(db, USER_HIDEOUTS_DB, uid)
    if (hideoutSub) {
      hideoutSub()
    }
    hideoutSub = onSnapshot(docRef, (doc) => {
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
    }
    const q = query(collection(db, USER_HIDEOUTS_DB), where('owner', '==', uid))
    hideoutsSub = onSnapshot(q, (querySnapshot) => {
      const hideouts: Hideout[] = []
      querySnapshot.forEach((doc) => {
        hideouts.push(doc.data() as Hideout)
      })
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
      doc(db, USER_HIDEOUTS_DB, hideout.uid),
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
    const newRef = await doc(collection(db, USER_HIDEOUTS_DB))

    await setDoc(doc(db, USER_HIDEOUTS_DB, newRef.id), {
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
