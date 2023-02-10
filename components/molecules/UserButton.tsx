import { useTranslation } from 'next-i18next'
import { useUser } from '@core/hooks/useUser'
import Button from '@components/atoms/Button'
import DropdownUser from './DropdownUser'
import { useState } from 'react'
import Modal from './Modal'
import { toast } from 'react-toastify'
import { useUserContext } from '@core/contexts/UserContext'
import { FiTwitter, FiGithub } from 'react-icons/fi'
import { ImGoogle } from 'react-icons/im'

export default function UserButton() {
  const { t } = useTranslation('common')
  const { googleLogIn, twitterLogIn, githubLogIn } = useUser()
  const { profile } = useUserContext()
  const [isOpen, setIsOpen] = useState(false)

  async function handleTwitterLogIn() {
    try {
      await twitterLogIn()
    } catch (error) {
      toast('Wow there was a problem!')
      console.log(error)
    } finally {
      setIsOpen(false)
    }
  }

  async function handleGoogleLogIn() {
    try {
      await googleLogIn()
    } catch (error) {
      toast('Wow there was a problem!')
      console.log(error)
    } finally {
      setIsOpen(false)
    }
  }

  async function handleGitHubLogIn() {
    try {
      await githubLogIn()
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
          <Button icon={<ImGoogle />} onClick={handleGoogleLogIn}>
            Google
          </Button>
          <Button icon={<FiTwitter />} onClick={handleTwitterLogIn}>
            Twitter
          </Button>
          <Button icon={<FiGithub />} onClick={handleGitHubLogIn}>
            GitHub
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
