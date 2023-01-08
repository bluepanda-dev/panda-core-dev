export type HideoutUser = {
  uid: string
  displayName: string
  photoURL: string
  lastActive?: number
}

export type Hideout = {
  uid: string
  activeUsers?: HideoutUser[]
  owner: string
  sharableContent?: string
  name?: string
}
