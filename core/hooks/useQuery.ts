import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  QueryConstraint,
  setDoc,
} from 'firebase/firestore'
import { useFirebase } from './useFirebase'

export const useQuery = () => {
  const { db } = useFirebase()

  async function subscribe<T>(callback: (data: T) => void, ...route: string[]) {
    // @ts-ignore
    const docRef = doc(db, ...route)

    onSnapshot(docRef, (doc) => {
      callback(doc.data() as T)
    })

    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      callback(docSnap.data() as T)
    }
  }

  async function subscribeCollection<T>(
    callback: (data: T[]) => void,
    whereCondition: QueryConstraint | null,
    ...route: string[]
  ) {
    const q = whereCondition
      ? // @ts-ignore
        query(collection(db, ...route), whereCondition)
      : // @ts-ignore
        query(collection(db, ...route))
    onSnapshot(q, (querySnapshot) => {
      const list: T[] = []
      querySnapshot.forEach((doc) => {
        list.push(doc.data() as T)
      })
      callback(list)
    })

    const list: T[] = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach((doc) => {
      list.push(doc.data() as T)
    })
    callback(list)
  }

  async function update<T extends Object>(payload: T, ...route: string[]) {
    if (!db) {
      throw new Error('Not database configured')
    }
    // @ts-ignore
    const docRef = doc(db, ...route)

    await setDoc(
      docRef,
      {
        ...payload,
      },
      { merge: true },
    )

    return docRef
  }

  async function add<T>(payload: T, ...route: string[]) {
    // @ts-ignore
    const newRef = await doc(collection(db, ...route))

    // @ts-ignore
    await setDoc(doc(db, ...route, newRef.id), {
      ...payload,
      uid: newRef.id,
    })
  }

  async function save<T>(payload: T, ...route: string[]) {
    if (!db) {
      throw new Error('Not database configured')
    }
    // @ts-ignore
    await setDoc(doc(db, ...route), {
      ...payload,
    })
  }

  async function fetch<T>(...route: string[]): Promise<T | undefined> {
    // @ts-ignore
    const docRef = doc(db, ...route)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const data = docSnap.data() as T
      return data
    }

    return undefined
  }

  async function fetchAllWhere<T>(
    whereCondition: QueryConstraint | null | QueryConstraint[],
    ...route: string[]
  ): Promise<(T & { docId: string })[] | undefined> {
    const q = query(
      // @ts-ignore
      collection(db, ...route),
      ...(Array.isArray(whereCondition) ? whereCondition : [whereCondition]),
    )
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.map((doc) => ({
      docId: doc.id,
      ...(doc.data() as T),
    }))
  }

  async function fetchAll<T>(
    ...route: string[]
  ): Promise<(T & { docId: string })[]> {
    // @ts-ignore
    const q = query(collection(db, ...route))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map((doc) => ({
      docId: doc.id,
      ...(doc.data() as T),
    }))
  }

  async function addToCollection<T extends Object>(
    payload: T,
    ...route: string[]
  ) {
    // @ts-ignore
    const docRef = collection(db, ...route)

    const docR = await addDoc(docRef, {
      ...payload,
    })

    return docR
  }

  return {
    subscribe,
    subscribeCollection,
    update,
    add,
    addToCollection,
    save,
    fetch,
    fetchAll,
    fetchAllWhere,
  }
}
