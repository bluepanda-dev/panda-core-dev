import { where } from 'firebase/firestore'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Button from '@components/atoms/Button'
import { useCopyPages } from '@core/hooks/useCopyPages'
import { useQuery } from '@core/hooks/useQuery'

const NEWSLETTER_COLLECTION = 'fe-newsletter'

export default function KeepMeInformed() {
  const [email, setEmail] = useState('')
  const { keepMeInformed } = useCopyPages()
  const { add, fetchAllWhere } = useQuery()
  const [sent, setSent] = useState(false)

  async function handleSubscription() {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

    const exists = await fetchAllWhere(
      where('email', '==', email),
      NEWSLETTER_COLLECTION,
    )
    if (exists?.length) {
      toast.error('Email subscribed')
      return
    }

    if (!email.match(validRegex)) {
      toast.error('Please enter a valid email address')
      return
    }

    add({ email }, NEWSLETTER_COLLECTION)
    toast.success('Thanks for subscribing!')
    setEmail('')
    setSent(true)
  }

  return (
    <div>
      <div className="text-center text-6xl font-bold">
        {keepMeInformed.title}
      </div>
      <div className="pt-24 w-full flex  justify-center">
        <div className="px-2 md:px-0 flex flex-col sm:flex-row justify-center gap-4 items-center w-full max-w-lg">
          {sent ? (
            <span className="text-4xl text-primary-600">Thanks!</span>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}
