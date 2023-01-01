import { isAlertBannerActive } from '@core/store/Common'
import { useAtom } from 'jotai'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'

export default function Faqs() {
  const { t } = useTranslation('common')
  const [active, setActive] = useAtom(isAlertBannerActive)

  function handleClose() {
    setActive(false)
  }

  useEffect(() => {
    // TODO check local storage or another logic here
  }, [])

  return (
    <div className="absolute z-50 top-0 w-full text-primary-600 bg-normal-800 h-10">
      <div className="pt-2 text-center text-md font-light">
        {t('alertBanner.message')}
      </div>
      <div className="absolute right-6 top-2">
        <button
          type="button"
          aria-label="close alert"
          className="hover:text-primary-400"
          onClick={handleClose}
        >
          X
        </button>
      </div>
    </div>
  )
}
