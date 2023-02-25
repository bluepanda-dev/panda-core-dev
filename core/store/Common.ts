import { User } from 'firebase/auth'
import { atom } from 'jotai'

export const isAlertBannerActive = atom(false)

export const userAtom = atom<User | undefined>(undefined)

export const loadingAtom = atom<boolean>(false)
