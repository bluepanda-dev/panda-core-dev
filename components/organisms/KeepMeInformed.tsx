import { useState } from 'react'
import BPButton from '@components/atoms/BPButton'
import BPInput from '@components/atoms/BPInput'
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
          <BPInput
            outline
            type="primary"
            nativeType="email"
            placeholder="Email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            className="ui-input"
          />
          <BPButton outline type="primary" onClick={handleSubscription}>
            {keepMeInformed.cta}
          </BPButton>
        </div>
      </div>
    </div>
  )
}
