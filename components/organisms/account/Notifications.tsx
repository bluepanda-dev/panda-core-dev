import Button from '@components/atoms/Button'
import { useUserContext } from '@core/contexts/UserContext'
import { useUser } from '@core/hooks/useUser'
import { Switch } from '@headlessui/react'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export default function Notifications() {
  const { saveProfile } = useUser()
  const { profile } = useUserContext()
  const [billing, setBilling] = useState(false)
  const [offers, setOffers] = useState(false)

  function handleSave() {
    console.log('Save', billing)
    saveProfile({
      ...profile,
      notifications: {
        ...profile?.notifications,
        billing,
        offers,
      },
    })
    toast('Saved successfully!')
  }

  useEffect(() => {
    if (profile?.notifications !== undefined) {
      setBilling(profile.notifications.billing)
      setOffers(profile.notifications.offers)
    }
  }, [profile])

  if (!profile) {
    return <>Loading...</>
  }

  if (!profile.notifications) {
    profile.notifications = {
      billing,
      offers,
    }
  }

  return (
    <div className="relative max-w-2xl">
      <div className="mt-8">
        <div className="flex items-center gap-4 mb-6">
          <Switch
            checked={billing}
            onChange={(e: boolean) => {
              setBilling(e)
            }}
            className={`${billing ? 'bg-primary-600' : 'bg-neutral-900'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span
              aria-hidden="true"
              className={`${billing ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
          <label htmlFor="billing" className="form-label inline-block mb-2 ">
            Billing{' '}
            <span className="text-neutral-800">
              (Payment and receipt notifications)
            </span>
          </label>
        </div>
        <div className="flex items-center gap-4 mb-6">
          <Switch
            checked={offers}
            onChange={(e: boolean) => {
              setOffers(e)
            }}
            className={`${offers ? 'bg-primary-600' : 'bg-neutral-900'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span
              aria-hidden="true"
              className={`${offers ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
          <label htmlFor="offers" className="form-label inline-block mb-2 ">
            Offers{' '}
            <span className="text-neutral-800">
              (Deals, discounts, and special offers)
            </span>
          </label>
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
