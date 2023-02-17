import { useUserContext } from '@core/contexts/UserContext'
import { toast } from 'react-toastify'
import * as dayjs from 'dayjs'
import Button from '@components/atoms/Button'
import Panel from '@components/molecules/Panel'
import Modal from '@components/molecules/Modal'
import { useState } from 'react'
import { useCustomer } from '@core/hooks/useCustomer'
import { useRouter } from 'next/router'

export default function Billing() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { profile, subscription } = useUserContext()
  const { cancelSubscription } = useCustomer()

  async function handleCancel() {
    setLoading(true)
    setIsOpen(false)
    if (subscription.activeSubscription?.uid) {
      await cancelSubscription(
        subscription.activeSubscription.uid,
        (result) => {
          if (result.canceled) {
            toast.success('Subscription canceled')
          } else {
            toast.error(`Something went wrong, ${result.error}`)
          }
          setLoading(false)
          setTimeout(() => {
            router.reload()
          }, 1000)
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

  return (
    <>
      <Modal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        hasCloseButton={false}
        title={'Cancel subscription'}
      >
        <div className="h-24">
          Are you sure?
          <div className="absolute bottom-3 right-3  flex justify-end mt-4 gap-4">
            <Button
              onClick={() => setIsOpen(false)}
              className="w-auto"
              isSmall={true}
            >
              Close
            </Button>
            <Button
              className="w-28 text-neutral-100 bg-red-500 hover:!bg-red-400"
              isSmall={true}
              onClick={handleCancel}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
      <div className="relative max-w-2xl flex flex-col gap-8">
        <div>
          <Panel title="Plan" description="">
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
          </Panel>
        </div>
        <div>
          <Panel title="Receips" description="">
            <div className="flex flex-col gap-4">
              {subscription.invoices.map((invoice) => (
                <div key={invoice.id} className="grid grid-cols-4 gap-4">
                  <div>${invoice.amount / 100}</div>
                  <div>
                    {dayjs.unix(Number(invoice.created)).format('DD/MM/YYYY')}
                  </div>
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
          </Panel>
        </div>
        {subscription.activeSubscription?.uid && (
          <div>
            <Panel
              title="Danger Zone"
              description="You will be unable to use the system after cancelling the subscription"
              type="danger"
              footer={
                <Button
                  onClick={() => setIsOpen(true)}
                  loading={loading}
                  className="w-48 text-neutral-100 bg-red-500 hover:!bg-red-400"
                  isSmall={true}
                >
                  Cancel Subscription
                </Button>
              }
            ></Panel>
          </div>
        )}
      </div>
    </>
  )
}
