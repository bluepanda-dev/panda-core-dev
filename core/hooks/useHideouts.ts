import { Hideout, USER_HIDEOUTS_DB } from '@core/types'
import { v4 as uuidv4 } from 'uuid'
import { where } from 'firebase/firestore'
import { useQuery } from './useQuery'

const ANONYMOUS_UID_KEY = 'anonymous-uid'

export const useHideouts = () => {
  const { subscribe, subscribeCollection, update, add } = useQuery()

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
    subscribe<Hideout>(
      (data: Hideout) => {
        callback(data)
      },
      USER_HIDEOUTS_DB,
      uid,
    )
  }

  async function subscribeHideouts(
    uid: string,
    callback: (data: Hideout[]) => void,
  ) {
    subscribeCollection<Hideout>(
      (data: Hideout[]) => {
        callback(data)
      },
      where('owner', '==', uid),
      USER_HIDEOUTS_DB,
    )
  }

  async function handleUpdate(hideout: Hideout) {
    await update(hideout, USER_HIDEOUTS_DB, hideout.uid)
  }

  async function handleAdd(hideout: Omit<Hideout, 'uid'>) {
    await add(hideout, USER_HIDEOUTS_DB)
  }

  return {
    subscribeHideout,
    subscribeHideouts,
    handleUpdate,
    handleAdd,
    getVisitorUID,
  }
}
