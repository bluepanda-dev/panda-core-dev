import { useState } from 'react'
import { FiTwitter, FiGithub, FiFacebook, FiUser } from 'react-icons/fi'
import { ImGoogle } from 'react-icons/im'
import { toast } from 'react-toastify'
import Button from '@components/atoms/Button'
import { useUserContext } from '@core/contexts/UserContext'
import { useUser } from '@core/hooks/useUser'
import DropdownUser from './DropdownUser'
import Modal from './Modal'

export default function UserButton() {
  const {
    googleLogIn,
    twitterLogIn,
    githubLogIn,
    facebookLogIn,
    nativeLogIn,
    nativeCreateAccount,
  } = useUser()
  const { profile } = useUserContext()
  const [isOpen, setIsOpen] = useState(false)
  const [isNewUser, setIsNewUser] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleLogIn(provider: () => Promise<any>) {
    try {
      await provider()
      setIsOpen(false)
    } catch (error: any) {
      toast(`Wow there was a problem! ${error?.message}`)
      console.log(error)
    } finally {
    }
  }

  async function handleNativeLogIn() {
    try {
      await nativeLogIn(email, password)
      setIsOpen(false)
    } catch (error: any) {
      toast(`Wow there was a problem! ${error?.message}`)
      console.log(error)
    }
  }

  async function handleCreateAccount() {
    try {
      await nativeCreateAccount(email, password)
      setIsOpen(false)
    } catch (error: any) {
      toast(`Wow there was a problem! ${error?.message}`)
      console.log(error)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)} title="Log In">
        <div className="mt-4 flex flex-col gap-4 items-center justify-center">
          <input
            placeholder="Email"
            name="panda_email"
            className="form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border rounded transition dark:text-neutral-300"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <input
            type="password"
            name="panda_password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="form-control block w-full px-3 py-1.5 text-base font-normal bg-clip-padding border rounded transition dark:text-neutral-300"
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
                  <a
                    className="w-24 ui-link"
                    onClick={() => setIsNewUser(true)}
                  >
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
          <DropdownUser
            image={
              profile?.photoURL ? (
                <img
                  src={profile!.photoURL}
                  alt=""
                  className="ring-neutral-100 hover:ring-neutral-50 ring-2 w-8 h-8 rounded-full"
                />
              ) : (
                <div
                  className={`border border-neutral-500 hover:border-primary-600 w-8 h-8 rounded-full bg-neutral-200 dark:bg-normal-800 flex items-center justify-center`}
                >
                  <FiUser />
                </div>
              )
            }
          />
        </>
      )}
    </>
  )
}
