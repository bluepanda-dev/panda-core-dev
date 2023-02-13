import { useUserContext } from '@core/contexts/UserContext'
import { toast } from 'react-toastify'
import * as dayjs from 'dayjs'
import Button from '@components/atoms/Button'
import { useState } from 'react'
import { useCustomer } from '@core/hooks/useCustomer'

export default function Billing() {
  const [loading, setLoading] = useState(false)

  const { profile, subscription } = useUserContext()
  const { cancelSubscription } = useCustomer()

  async function handleCancel() {
    setLoading(true)
    if (subscription.activeSubscription?.uid) {
      await cancelSubscription(
        subscription.activeSubscription.uid,
        (result) => {
          console.log('result:> ', result)
          if (result.canceled) {
            toast.success('Subscription canceled')
          } else {
            toast.error(`Something went wrong, ${result.error}`)
          }
          setLoading(false)
        },
      )
    } else {
      setLoading(false)
    }
  }

  function downloadPDF(url: string) {
    // open blan window
    window.open(`${url.split('?')[0]}/pdf`, '_blank')
  }

  if (!profile) {
    return <>Loading...</>
  }

  console.log('invoices', subscription.invoices)

  return (
    <div className="relative max-w-2xl flex flex-col gap-8">
      <div>
        <div className="flex items-center gap-4 mb-4 font-semibold dark:text-neutral-50 text-neutral-900">
          Plan
        </div>
        <div className="">
          Your are on the
          <span
            className={`mx-2 pb-1 bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300
                    ${
                      subscription.subscriptionType === 'plus'
                        ? '!bg-primary-500 !text-primary-100'
                        : ''
                    }
                  `}
          >
            {subscription.subscriptionType}
          </span>
          plan.
          {!!subscription.price &&
            `The next payment of $${subscription.price} will occur on ${subscription.nextPayment} `}
        </div>
      </div>
      <div>
        <div className="flex items-center gap-4 mb-4 font-semibold dark:text-neutral-50 text-neutral-900">
          Receips
        </div>
        <div className="flex flex-col gap-4">
          {subscription.invoices.map((invoice) => (
            <div key={invoice.id} className="grid grid-cols-4 gap-4">
              <div>${invoice.amount / 100}</div>
              <div>{dayjs.unix(invoice.created).format('DD/MM/YYYY')}</div>
              <div>{invoice.status}</div>
              <div>
                <a
                  className="cursor-pointer text-primary-500 hover:text-primary-400"
                  onClick={() =>
                    downloadPDF(invoice.charges.data[0].receipt_url)
                  }
                >
                  download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      {subscription.activeSubscription?.uid && (
        <div>
          <div className="flex items-center gap-4 mb-4 font-semibold text-red-500">
            Danger Zone
          </div>
          <div className="flex flex-col gap-4">
            <Button
              isSpecial
              onClick={handleCancel}
              loading={loading}
              className="disabled w-56 bg-red-500 hover:!bg-red-400"
            >
              Cancel Subscription
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
