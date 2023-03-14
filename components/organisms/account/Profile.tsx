import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FiShare2 } from 'react-icons/fi'
import { toast } from 'react-toastify'
import Button from '@components/atoms/Button'
import { useUserContext } from '@core/contexts/UserContext'
import { useUser } from '@core/hooks/useUser'
import { Profile as ProfileType } from '@core/types'

export default function Profile() {
  const { t } = useTranslation(['account', 'common'])
  const [loading, setLoading] = useState(false)
  const { saveUser, savePublicProfile } = useUser()
  const { profile } = useUserContext()
  const [website, setWebsite] = useState('')
  const [email, setEmail] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [publicProfile, setPublicProfile] = useState<ProfileType>()

  const { fetchPublicProfile } = useUser()

  async function handleSave() {
    if (!email) {
      toast.error('You need to enter an email to save your profile')
      return
    }
    setLoading(true)
    await saveUser({ ...profile!, website, email, displayName })
    await savePublicProfile({
      website,
      email,
      displayName,
      uid: profile!.uid,
      photoURL: profile?.photoURL ?? '',
    })
    toast('Saved successfully!')
    setLoading(false)
  }

  function handleShare() {
    navigator.clipboard.writeText(
      new URL(`/profile/${profile!.uid}`, window.location.origin).toString(),
    )
    toast.success(t('copiedToClipboard'))
  }

  async function handleMakePublic() {
    if (!email || !website) {
      toast.error(
        'You need to enter an email and website in to make your profile public',
      )
      return
    }
    await savePublicProfile({
      website,
      email,
      displayName,
      uid: profile!.uid,
      photoURL: profile?.photoURL ?? '',
    })
    setPublicProfile(profile)
    toast(t('profileIsNow'))
  }

  useEffect(() => {
    if (profile) {
      fetchPublicProfile(profile.uid).then((user) => {
        setPublicProfile(user)
      })
    }
    if (profile?.website !== undefined) {
      setWebsite(profile?.website)
    }
    if (profile?.email !== undefined) {
      setEmail(profile?.email)
    }
    if (profile?.displayName !== undefined) {
      setDisplayName(profile?.displayName)
    }
  }, [profile])

  if (!profile) {
    return <>{t('loading', { ns: 'common' })}...</>
  }

  return (
    <div className="relative">
      <div>
        <div className="form-group mb-6">
          <Image
            src={profile.photoURL}
            alt={'profile'}
            className="ring-neutral-100 hover:ring-neutral-50 ring-2 w-24 h-24 rounded-full"
          />
        </div>

        <div className="form-group mb-6">
          <label htmlFor="display" className="form-label inline-block mb-2 ">
            {t('name')}
          </label>
          <input
            id="display"
            onChange={(e) => setDisplayName(e.target.value)}
            className="ui-input w-full"
            value={displayName}
          />
        </div>
        <div className="form-group mb-6">
          <label htmlFor="email" className="form-label inline-block mb-2 ">
            {t('email')}
          </label>
          <input
            id="email"
            className="ui-input w-full"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group mb-6">
          <label htmlFor="website" className="form-label inline-block mb-2 ">
            {t('webSite')}
          </label>

          <input
            id="website"
            className="ui-input w-full"
            placeholder="Enter website"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
          />
        </div>
        <div className="form-group mb-6">
          <Button loading={loading} isSpecial={true} onClick={handleSave}>
            {t('save')}
          </Button>
          {!publicProfile ? (
            <div className="mt-6 flex flex-col">
              <Button className="border" onClick={handleMakePublic}>
                {t('makeMyProfile')}
              </Button>
              <span className="mt-4 text-right">{t('emailWillNot')}</span>
            </div>
          ) : (
            <div className="flex items-center justify-end mt-8 gap-4">
              <span>{t('shareProfile')}:</span>
              <button
                onClick={handleShare}
                className="border-neutral-500 hover:border-primary-600 bg-primary-800 border rounded-md p-1 text-xl"
              >
                <FiShare2 />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
