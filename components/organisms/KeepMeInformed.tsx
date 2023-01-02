import Button from '@components/atoms/Button'
import { useDataPages } from '@core/hooks/useDataPages'
import { useCallback, useState } from 'react'
import { GoogleReCaptcha } from 'react-google-recaptcha-v3'

export default function KeepMeInformed() {
  const [email, setEmail] = useState('')
  const { keepMeInformed } = useDataPages()
  const [, setToken] = useState('')
  const [refreshReCaptcha, setRefreshReCaptcha] = useState(false)

  const onVerify = useCallback((value: string) => {
    setToken(value)
  }, [])

  function handleSubscription() {
    // TODO handle sub here
    console.log(email)

    // refresh captcha
    setRefreshReCaptcha((r) => !r)
  }

  return (
    <div>
      <div className="text-center text-6xl font-bold">
        {keepMeInformed.title}
      </div>
      <div className="pt-24 w-full flex  justify-center">
        <div className="px-2 md:px-0 flex flex-col sm:flex-row justify-center gap-4 items-center w-full max-w-lg">
          <GoogleReCaptcha
            onVerify={onVerify}
            refreshReCaptcha={refreshReCaptcha}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-neutral-100 dark:bg-normal-700 focus:border-primary-500 dark:focus:border-primary-800 caret-primary-600 h-12 tracking-wide focus:border-2 outline-0 rounded-sm grow p-2 text-xl"
          />
          <Button
            className="w-auto"
            isSpecial={true}
            onClick={handleSubscription}
          >
            {keepMeInformed.cta}
          </Button>
        </div>
      </div>
    </div>
  )
}
