import { useTranslation } from 'next-i18next'
import { useUser } from '@core/hooks/useUser'
import Button from '@components/atoms/Button'
import DropdownUser from './DropdownUser'

export default function UserButton() {
  const { t } = useTranslation('common')
  const { googleLogIn, user } = useUser()

  return (
    <>
      {!user ? (
        <Button className="w-auto" onClick={googleLogIn}>
          Log In
        </Button>
      ) : (
        <>
          <DropdownUser image={user.photoURL!} />
        </>
      )}
    </>
  )
}
