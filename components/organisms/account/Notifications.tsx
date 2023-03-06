import { Switch } from '@headlessui/react'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Button from '@components/atoms/Button'
import { useUserContext } from '@core/contexts/UserContext'
import { useUser } from '@core/hooks/useUser'

export default function Notifications() {
  const { t } = useTranslation(['account', 'common'])
  const { saveUser } = useUser()
  const { profile } = useUserContext()
  const [billing, setBilling] = useState(false)
  const [offers, setOffers] = useState(false)

  function handleSave() {
    saveUser({
      ...profile!,
      notifications: {
        ...profile?.notifications,
        billing,
        offers,
      },
    })
    toast(t('savedSuccess!'))
  }

  useEffect(() => {
    if (profile?.notifications !== undefined) {
      setBilling(profile.notifications.billing)
      setOffers(profile.notifications.offers)
    }
  }, [profile])

  if (!profile) {
    return <>{t('loading', { ns: 'common' })}...</>
  }

  if (!profile.notifications) {
    profile.notifications = {
      billing,
      offers,
    }
  }

  return (
    <div className="relative max-w-2xl">
      <div>
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
            {t('billing')}{' '}
            <span className="text-neutral-800">({t('paymentAndReceipt')})</span>
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
            {t('offers')}{' '}
            <span className="text-neutral-800">({t('dealsDiscounts')})</span>
          </label>
        </div>

        <div className="form-group mb-6">
          <Button isSpecial={true} onClick={handleSave}>
            {t('save')}
          </Button>
        </div>
      </div>
    </div>
  )
}
