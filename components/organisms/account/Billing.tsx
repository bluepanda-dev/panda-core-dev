import * as dayjs from 'dayjs'
import { Trans, useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Button from '@components/atoms/Button'
import Modal from '@components/molecules/Modal'
import Panel from '@components/molecules/Panel'
import { useCustomerContext } from '@core/contexts/CustomerContext'
import { useUserContext } from '@core/contexts/UserContext'

export default function Billing() {
  const { t } = useTranslation(['account', 'common'])
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const { profile } = useUserContext()
  const {
    cancelSubscription,
    invoices,
    activeSubscription,
    subscriptionType,
    price,
    nextPayment,
  } = useCustomerContext()

  async function handleCancel() {
    setLoading(true)
    setIsOpen(false)
    if (activeSubscription?.uid) {
      cancelSubscription(activeSubscription.uid, (result) => {
        if (result.canceled) {
          toast.success(t('subCanceled'))
        } else {
          toast.error(`${t('subError')}, ${result.error}`)
        }
        setLoading(false)
        setTimeout(() => {
          router.reload()
        }, 1000)
      })
    } else {
      setLoading(false)
    }
  }

  function downloadPDF(url: string) {
    // open blan window
    window.open(`${url.split('?')[0]}`, '_blank')
  }

  if (!profile) {
    return <>{t('loading', { ns: 'common' })}...</>
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        closeModal={() => setIsOpen(false)}
        hasCloseButton={false}
        title={t('cancelSub')}
      >
        <div className="h-24">
          {t('areYouSure')}
          <div className="absolute bottom-3 right-3  flex justify-end mt-4 gap-4">
            <Button
              onClick={() => setIsOpen(false)}
              className="w-auto"
              isSmall={true}
            >
              {t('close', { ns: 'common' })}
            </Button>
            <Button
              className="w-28 text-neutral-100 bg-red-500 hover:!bg-red-400"
              isSmall={true}
              onClick={handleCancel}
            >
              {t('confirm', { ns: 'common' })}
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
                      subscriptionType === 'plus'
                        ? '!bg-primary-500 !text-primary-100'
                        : ''
                    }
                    ${
                      subscriptionType === 'trial'
                        ? '!bg-blue-500 !text-primary-100'
                        : ''
                    }
                  `}
            >
              {subscriptionType}
            </span>
            plan.
            {!!price &&
              `The next payment of $${price} will occur on ${nextPayment} `}
          </Panel>
        </div>
        <div>
          <Panel title={t('receips')} description="">
            <div className="flex flex-col gap-4 w-full">
              {invoices.map((invoice) => (
                <div
                  key={invoice.id}
                  className="grid grid-cols-3 sm:grid-cols-4 gap-4 justify-around"
                >
                  <div>${invoice.amount / 100}</div>
                  <div>
                    {dayjs.unix(Number(invoice.created)).format('DD/MM/YYYY')}
                  </div>
                  <div className="hidden sm:block">{invoice.status}</div>
                  <div>
                    <a
                      className="cursor-pointer text-primary-500 hover:text-primary-400"
                      onClick={() =>
                        downloadPDF(invoice.charges.data[0].receipt_url)
                      }
                    >
                      {t('download')}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
        {activeSubscription?.uid && (
          <div>
            <Panel
              title={t('dangerZone')}
              description={t('youWill')!}
              type="danger"
              footer={
                <Button
                  onClick={() => setIsOpen(true)}
                  loading={loading}
                  className="w-48 text-neutral-100 bg-red-500 hover:!bg-red-400"
                  isSmall={true}
                >
                  {t('cancelSub')}
                </Button>
              }
            ></Panel>
          </div>
        )}
      </div>
    </>
  )
}
