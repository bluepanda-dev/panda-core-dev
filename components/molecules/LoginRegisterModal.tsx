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
    resetPassword,
  } = useUser()

  const [isNewUser, setIsNewUser] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogIn(provider: () => Promise<any>) {
    try {
      setLoading(true)
      await provider()
      closeModal()
    } catch (error: any) {
      toast.error(`Wow there was a problem! ${error?.message}`)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleNativeLogIn() {
    try {
      setLoading(true)
      await nativeLogIn(email, password)
      closeModal()
    } catch (error: any) {
      toast.error(`Wow there was a problem! ${error?.message}`)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateAccount() {
    try {
      setLoading(true)
      if (!email || !password) {
        toast.error('Please fill all the fields')
        return
      }
      await nativeCreateAccount(email, password, fullName)
      closeModal()
    } catch (error: any) {
      toast.error(`Wow there was a problem! ${error?.message}`)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function handleResetPassword() {
    setLoading(true)
    await resetPassword(email)
    toast('Done! check your email')

    setLoading(false)
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

        {isForgotPassword === false && (
          <input
            type="password"
            name="panda_password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="ui-input w-full"
          />
        )}

        {isNewUser && (
          <input
            placeholder="Full Name"
            name="fullname"
            className="ui-input w-full"
            onChange={(e) => setFullName(e.target.value)}
            value={fullName}
          />
        )}

        <div className="flex w-full gap-4">
          <div className="basis-1/2">
            {isNewUser ? (
              <Button
                loading={loading}
                isInverted={true}
                onClick={handleCreateAccount}
              >
                Create Account
              </Button>
            ) : isForgotPassword === false ? (
              <Button
                loading={loading}
                isInverted={true}
                onClick={handleNativeLogIn}
              >
                Log in
              </Button>
            ) : (
              <Button
                loading={loading}
                isInverted={true}
                onClick={handleResetPassword}
              >
                Reset Password
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
        <div className="w-full text-start">
          {!isForgotPassword && (
            <a className="ui-link" onClick={() => setIsForgotPassword(true)}>
              Forgot password
            </a>
          )}
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
