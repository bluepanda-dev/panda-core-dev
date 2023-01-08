export const USER_DB = 'fe-users'

export const USER_PROFILE_DB = 'fe-public-profiles'

export const USER_HIDEOUTS_DB = 'fe-hideouts'

export type Profile = {
  displayName: string
  email?: string
  emailVerified?: boolean
  photoURL: string
  uid: string
  website?: string
  notifications?: Record<string, boolean>
  providerData?: { providerId: string }
}
