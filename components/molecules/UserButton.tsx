import Image from 'next/image'
import { useState } from 'react'
import { FiUser } from 'react-icons/fi'
import Button from '@components/atoms/Button'
import { useUserContext } from '@core/contexts/UserContext'
import DropdownUser from './DropdownUser'
import LoginRegisterModal from './LoginRegisterModal'

export default function UserButton() {
  const { profile } = useUserContext()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <LoginRegisterModal isOpen={isOpen} closeModal={() => setIsOpen(false)} />
      {!profile ? (
        <Button className="w-auto" onClick={() => setIsOpen(true)}>
          Log In
        </Button>
      ) : (
        <>
          <DropdownUser
            image={
              profile?.photoURL ? (
                <Image
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
