import Button from '@components/atoms/Button'
import { useTranslation } from 'next-i18next'

export default function KeepMeInformed() {
  const { t } = useTranslation()

  return (
    <div>
      <div className="text-center text-6xl font-bold">
        {t('keepMeInformed.title')}
      </div>
      <div className="pt-24 w-full flex  justify-center">
        <div className="px-2 md:px-0 flex flex-col sm:flex-row justify-center gap-4 items-center w-full max-w-lg">
          <input
            type="email"
            placeholder="Email"
            className="bg-neutral-100 dark:bg-normal-700 focus:border-primary-500 dark:focus:border-primary-800 caret-primary-600 h-12 tracking-wide focus:border-2 outline-0 rounded-sm grow p-2 text-xl"
          />
          <Button isSpecial={true}>{t('keepMeInformed.cta')}</Button>
        </div>
      </div>
    </div>
  )
}
