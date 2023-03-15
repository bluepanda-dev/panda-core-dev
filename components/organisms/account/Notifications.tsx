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
  const [updates, setUpdates] = useState(false)
  const [reports, setReports] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSave() {
    setLoading(true)
    await saveUser({
      ...profile!,
      notifications: {
        ...profile?.notifications,
        billing,
        offers,
        updates,
        reports,
      },
    })
    toast('Saved successfully!')
    setLoading(false)
  }

  useEffect(() => {
    if (profile?.notifications !== undefined) {
      if (profile?.notifications.billing !== undefined) {
        setBilling(profile?.notifications.billing)
      }
      if (profile.notifications.offers !== undefined) {
        setOffers(profile.notifications.offers)
      }

      if (profile.notifications.updates !== undefined) {
        setUpdates(profile.notifications.updates)
      }
      if (profile.notifications.reports !== undefined) {
        setReports(profile.notifications.reports)
      }
    }
  }, [profile])

  if (!profile) {
    return <>{t('loading', { ns: 'common' })}...</>
  }

  if (!profile.notifications) {
    profile.notifications = {
      billing,
      offers,
      updates,
      reports,
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

        <div className="flex items-center gap-4 mb-6">
          <Switch
            checked={updates}
            onChange={(e: boolean) => {
              setUpdates(e)
            }}
            className={`${updates ? 'bg-primary-600' : 'bg-neutral-900'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span
              aria-hidden="true"
              className={`${updates ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
          <label htmlFor="updates" className="form-label inline-block mb-2 ">
            Updates{' '}
            <span className="text-neutral-800">
              (New features and product updates.)
            </span>
          </label>
        </div>

        <div className="flex items-center gap-4 mb-6">
          <Switch
            checked={reports}
            onChange={(e: boolean) => {
              setReports(e)
            }}
            className={`${reports ? 'bg-primary-600' : 'bg-neutral-900'}
          relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
          >
            <span
              aria-hidden="true"
              className={`${reports ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
            />
          </Switch>
          <label htmlFor="reports" className="form-label inline-block mb-2 ">
            Updates{' '}
            <span className="text-neutral-800">
              (Stats about your coding sent once per year.)
            </span>
          </label>
        </div>

        <div className="form-group mb-6">
          <Button loading={loading} isSpecial={true} onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
