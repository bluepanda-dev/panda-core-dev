import { useState } from 'react'
import Button from '@components/atoms/Button'
import { useCopyPages } from '@core/hooks/useCopyPages'

export default function KeepMeInformed() {
  const [email, setEmail] = useState('')
  const { keepMeInformed } = useCopyPages()

  function handleSubscription() {
    // TODO handle sub here
    console.log(email)
  }

  return (
    <div>
      <div className="text-center text-6xl font-bold">
        {keepMeInformed.title}
      </div>
      <div className="pt-24 w-full flex  justify-center">
        <div className="px-2 md:px-0 flex flex-col sm:flex-row justify-center gap-4 items-center w-full max-w-lg">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="ui-input"
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
