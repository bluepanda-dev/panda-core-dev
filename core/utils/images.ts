import { User } from 'firebase/auth'
import md5 from 'md5'

export function getProfileImage(profile: User) {
  let photoURL = profile.photoURL
  const providerData = profile.providerData[0] ?? profile.providerData

  if (providerData.providerId === 'google.com') {
    const hash = md5(profile.email)
    photoURL = `https://www.gravatar.com/avatar/${hash}?d=identicon`
  }

  return photoURL
}
