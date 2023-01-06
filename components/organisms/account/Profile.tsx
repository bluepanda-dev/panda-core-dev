import Button from '@components/atoms/Button'
import { useUser } from '@core/hooks/useUser'
import { toast } from 'react-toastify'

export default function Profile() {
  const { profile, saveProfile } = useUser()

  function handleSave() {
    console.log('Save')
    saveProfile(profile)
    toast('Saved successfully!')
  }

  if (!profile) {
    return <>Loading...</>
  }

  return (
    <div className="relative max-w-2xl">
      <div>
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
            value={profile?.website}
            onChange={(e) => (profile.website = e.target.value)}
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
