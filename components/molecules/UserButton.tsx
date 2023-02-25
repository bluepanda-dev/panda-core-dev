import { useState } from 'react'
import { FiTwitter, FiGithub, FiFacebook } from 'react-icons/fi'
import { ImGoogle } from 'react-icons/im'
import { toast } from 'react-toastify'
import Button from '@components/atoms/Button'
import { useUserContext } from '@core/contexts/UserContext'
import { useUser } from '@core/hooks/useUser'
import DropdownUser from './DropdownUser'
import Modal from './Modal'

export default function UserButton() {
  const { googleLogIn, twitterLogIn, githubLogIn, facebookLogIn } = useUser()
  const { profile } = useUserContext()
  const [isOpen, setIsOpen] = useState(false)

  async function handleLogIn(provider: () => Promise<void>) {
    try {
      await provider()
    } catch (error: any) {
      toast(`Wow there was a problem! ${error?.message}`)
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
