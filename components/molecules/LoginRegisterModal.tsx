import { useState } from 'react'
import { FiTwitter, FiGithub, FiFacebook } from 'react-icons/fi'
import { ImGoogle } from 'react-icons/im'
import { toast } from 'react-toastify'
import Button from '@components/atoms/Button'
import { useUser } from '@core/hooks/useUser'
import Modal from './Modal'

type LoginRegisterModalProps = {
  isOpen: boolean
  closeModal: () => void
}

export default function LoginRegisterModal({
  isOpen,
  closeModal,
}: LoginRegisterModalProps) {
  const {
    googleLogIn,
    twitterLogIn,
    githubLogIn,
    facebookLogIn,
    nativeLogIn,
    nativeCreateAccount,
  } = useUser()

  const [isNewUser, setIsNewUser] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogIn(provider: () => Promise<any>) {
    try {
      await provider()
      closeModal()
    } catch (error: any) {
      toast.error(`Wow there was a problem! ${error?.message}`)
      console.log(error)
    } finally {
    }
  }

  async function handleNativeLogIn() {
    try {
      await nativeLogIn(email, password)
      closeModal()
    } catch (error: any) {
      toast.error(`Wow there was a problem! ${error?.message}`)
      console.log(error)
    }
  }

  async function handleCreateAccount() {
    try {
      if (!email || !password) {
        toast.error('Please fill all the fields')
        return
      }
      await nativeCreateAccount(email, password)
      closeModal()
    } catch (error: any) {
      toast.error(`Wow there was a problem! ${error?.message}`)
      console.log(error)
    }
  }
  return (
    <Modal isOpen={isOpen} closeModal={closeModal} title="Log In">
      <div className="mt-4 flex flex-col gap-4 items-center justify-center">
        <input
          type="email"
          placeholder="Email"
          name="panda_email"
          className="ui-input w-full"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <input
          type="password"
          name="panda_password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="ui-input w-full"
        />

        <div className="flex w-full gap-4">
          <div className="basis-1/2">
            {isNewUser ? (
              <Button isInverted={true} onClick={handleCreateAccount}>
                Create Account
              </Button>
            ) : (
              <Button isInverted={true} onClick={handleNativeLogIn}>
                Log in
              </Button>
            )}
          </div>
          <div className="flex basis-1/2 justify-around items-center gap-1">
            {isNewUser ? (
              <>
                <a className="ui-link" onClick={() => setIsNewUser(false)}>
                  I have an account
                </a>
              </>
            ) : (
              <>
                <span>New user? </span>
                <a className="w-24 ui-link" onClick={() => setIsNewUser(true)}>
                  Sign up
                </a>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="my-4 text-center">
        <div className="h-px bg-primary-900 my-8" />
        Or Login with
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2 items-center justify-center">
        <Button icon={<ImGoogle />} onClick={() => handleLogIn(googleLogIn)}>
          Google
        </Button>
        <Button icon={<FiTwitter />} onClick={() => handleLogIn(twitterLogIn)}>
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
  )
}
