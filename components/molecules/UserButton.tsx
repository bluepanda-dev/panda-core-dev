import { useTranslation } from 'next-i18next'
import { useUser } from '@core/hooks/useUser'
import Button from '@components/atoms/Button'
import DropdownUser from './DropdownUser'
import { useState } from 'react'
import Modal from './Modal'
import { toast } from 'react-toastify'
import { useUserContext } from '@core/contexts/UserContext'
import { FiTwitter, FiGithub, FiFacebook } from 'react-icons/fi'
import { ImGoogle } from 'react-icons/im'

export default function UserButton() {
  const { googleLogIn, twitterLogIn, githubLogIn, facebookLogIn } = useUser()
  const { profile } = useUserContext()
  const [isOpen, setIsOpen] = useState(false)

  async function handleLogIn(provider: () => Promise<void>) {
    try {
      await provider()
    } catch (error) {
      toast('Wow there was a problem!')
      console.log(error)
    } finally {
      setIsOpen(false)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)} title="Log In">
        <div className="mt-4 flex flex-col items-center justify-center">
          <Button icon={<ImGoogle />} onClick={() => handleLogIn(googleLogIn)}>
            Google
          </Button>
          <Button
            icon={<FiTwitter />}
            onClick={() => handleLogIn(twitterLogIn)}
          >
            Twitter
          </Button>
          <Button icon={<FiGithub />} onClick={() => handleLogIn(githubLogIn)}>
            GitHub
          </Button>
          <Button
            icon={<FiFacebook />}
            onClick={() => handleLogIn(facebookLogIn)}
          >
            Facebook
          </Button>
        </div>
      </Modal>
      {!profile ? (
        <Button className="w-auto" onClick={() => setIsOpen(true)}>
          Log In
        </Button>
      ) : (
        <>
          <DropdownUser image={profile.photoURL!} />
        </>
      )}
    </>
  )
}
