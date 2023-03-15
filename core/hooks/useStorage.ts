import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { useUserContext } from '@core/contexts/UserContext'
import { useUser } from './useUser'

export const useStorage = () => {
  const storage = getStorage()
  const { profile, setProfile } = useUserContext()
  const { saveUser, savePublicProfile, fetchPublicProfile } = useUser()

  async function upload(file: any) {
    const storageRef = ref(storage, `images/${profile?.uid}/${file.name}`)
    await uploadBytes(storageRef, file).then(async (snapshot) => {
      await getDownloadURL(snapshot.ref).then(async (downloadURL) => {
        await saveUser({ ...profile!, photoURL: downloadURL })

        setProfile({ ...profile!, photoURL: downloadURL })

        fetchPublicProfile(profile!.uid!).then((user: any) => {
          if (user) {
            savePublicProfile({ ...user, photoURL: downloadURL })
          }
        })
      })
    })
  }

  return { upload }
}
