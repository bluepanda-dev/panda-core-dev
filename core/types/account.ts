export type Profile = {
  displayName: string
  email: string
  emailVerified: boolean
  photoURL: string
  uid: string
  website?: string
  notifications: Record<string, boolean>
}
