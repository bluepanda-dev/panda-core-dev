import Button from '@components/atoms/Button'
import { useUserContext } from '@core/contexts/UserContext'
import { useUser } from '@core/hooks/useUser'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Profile() {
  const { saveProfile } = useUser()
  const { profile } = useUserContext()
  const [website, setWebsite] = useState('')

  function handleSave() {
    saveProfile({ ...profile!, website })
    toast('Saved successfully!')
  }

  useEffect(() => {
    if (profile?.website !== undefined) {
      setWebsite(profile?.website)
    }
  }, [profile])

  if (!profile) {
    return <>Loading...</>
  }

  return (
    <div className="relative max-w-2xl">
      <div>
        <div className="form-group mb-6">
          <img
            src={profile.photoURL}
            className="ring-neutral-100 hover:ring-neutral-50 ring-2 w-24 h-24 rounded-full"
          />
        </div>

        <div className="form-group mb-6">
          <label htmlFor="display" className="form-label inline-block mb-2 ">
            Display Name
          </label>
          <input
            id="display"
            disabled
            className="form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border rounded transition dark:text-neutral-300"
            value={profile?.displayName}
          />
        </div>
        <div className="form-group mb-6">
          <label htmlFor="email" className="form-label inline-block mb-2 ">
            Email
          </label>
          <input
            id="email"
            disabled
            className="form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border rounded transition dark:text-neutral-300"
            placeholder="Enter email"
            value={profile?.email}
          />
        </div>
        <div className="form-group mb-6">
          <label htmlFor="website" className="form-label inline-block mb-2 ">
            Website (extra info for your profile)
          </label>
          <input
            id="website"
            className="form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border rounded transition dark:text-neutral-300"
            placeholder="Enter website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className="form-group mb-6">
          <Button isSpecial={true} onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
