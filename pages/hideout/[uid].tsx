import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { FiShare2, FiUser } from 'react-icons/fi'
import { toast } from 'react-toastify'
import Button from '@components/atoms/Button'
import Layout from '@components/layout'
import { useUserContext } from '@core/contexts/UserContext'
import { useHideouts } from '@core/hooks/useHideouts'
import { Hideout, HideoutUser } from '@core/types'

const ProfilePic = ({
  photoURL,
  alt,
  className,
}: {
  photoURL: string
  alt?: string
  className?: string
}) => {
  return (
    <>
      {photoURL ? (
        <img
          title={alt}
          src={photoURL}
          className={`border border-neutral-500 hover:border-primary-600 w-8 h-8 rounded-full ${className}`}
        />
      ) : (
        <div
          className={`border border-neutral-500 hover:border-primary-600 w-8 h-8 rounded-full bg-neutral-500 flex items-center justify-center ${className}`}
          title={alt}
        >
          <FiUser />
        </div>
      )}
    </>
  )
}

const Hideout = () => {
  const router = useRouter()
  const { subscribeHideout, handleUpdate, getVisitorUID } = useHideouts()
  const { profile, loading } = useUserContext()
  const { uid } = router.query
  const [sharableLink, setSharableLink] = useState('')
  const [registeredUser, setRegisteredUser] = useState('')
  const [hideout, setHideout] = useState<Hideout | undefined>()
  const [ideas, setIdeas] = useState<{ text: string; owner: HideoutUser }[]>([])
  const [newIdea, setNewIdea] = useState('')
  const { t } = useTranslation(['hideouts', 'common'])

  function handleShare() {
    navigator.clipboard.writeText(sharableLink)
    toast.success(t('copiedToClipboard', { ns: 'common' }))
  }

  function handleAddIdea() {
    if (newIdea === '') {
      return
    }

    handleUpdate({
      ...hideout!,
      sharableContent: JSON.stringify([
        ...(hideout!.sharableContent
          ? JSON.parse(hideout!.sharableContent) ?? []
          : []),
        { text: newIdea, owner: registeredUser || profile?.uid },
      ]),
    })
    setNewIdea('')
  }

  useEffect(() => {
    if (hideout) {
      const userID: string = profile?.uid || getVisitorUID()

      if (registeredUser !== userID) {
        if (
          hideout &&
          hideout.activeUsers?.find((user) => user.uid === userID)
        ) {
          handleUpdate({
            ...hideout,
            activeUsers: hideout?.activeUsers
              ?.filter((user) => user.uid !== registeredUser)
              .map((user) =>
                user.uid === userID
                  ? { ...user, lastActive: new Date().getTime() }
                  : user,
              ),
          })
        } else {
          handleUpdate({
            ...hideout!,
            activeUsers: [
              ...(hideout!.activeUsers?.filter(
                (user) => user.uid !== registeredUser,
              ) ?? []),
              {
                displayName: profile?.displayName ?? 'Anonymus',
                photoURL: profile?.photoURL ?? '',
                lastActive: new Date().getTime(),
                uid: userID,
              },
            ],
          })
        }
      }
      setRegisteredUser(userID)
    }
  }, [hideout, profile])

  useEffect(() => {
    async function setupHideout() {
      if (!loading && uid) {
        subscribeHideout(uid as string, (data: Hideout) => {
          setHideout(data)
          if (data.sharableContent) {
            const newIdeas = JSON.parse(data.sharableContent).map(
              (idea: any) => {
                const owner = data.activeUsers?.find(
                  (user) => user.uid === idea.owner,
                )

                return {
                  ...idea,
                  owner,
                }
              },
            )
            setIdeas(newIdeas)
          }
        })
      }
    }

    setupHideout()
    setSharableLink(window.location.href)
  }, [profile, loading, uid])

  if (!hideout) {
    return <>{t('loading', { ns: 'common' })}...</>
  }

  // TODO: remove ideas
  // TODO create photo compopnent reusable
  // convert photo url to abse64 https://stackoverflow.com/questions/22172604/convert-image-from-url-to-base64
  //

  return (
    <Layout>
      {profile && (
        <div className="absolute right-2 top-2">
          <Link href={`/hideouts`}>
            <Button>{t('myHideouts')}</Button>
          </Link>
        </div>
      )}

      <div className="mx-8 my-16 relative">
        <div className="text-center text-4xl font-bold">{hideout.name}</div>

        <div className="text-neutral-600 dark:text-neutral-400 flex justify-center text-xl md:text-2xl font-extralight mt-6 md:mt-16 px-8 ">
          <div className="md:max-w-lg text-center">{t('hereYouCan')}</div>
        </div>
        <div className="mt-8 flex justify-end items-center gap-4">
          <span>{t('activeUsers')}:</span>
          <div className="ml-4 flex gap-1">
            {hideout.activeUsers?.map((user, index) => (
              <div key={index} style={{ marginLeft: '-18px' }}>
                <ProfilePic
                  className="bg-normal-900"
                  photoURL={user.photoURL}
                  alt={user.displayName}
                />
              </div>
            ))}
          </div>
          <span>{t('shareIt')}:</span>
          <button
            onClick={handleShare}
            className="border-neutral-500 hover:border-primary-600 bg-primary-800 border rounded-md p-1 text-xl"
          >
            <FiShare2 />
          </button>
        </div>
        <div className="mt-8 flex gap-4 justify-end md:justify-start flex flex-col md:flex-row">
          <input
            type="text"
            className="form-control block text-xl px-3 py-1.5 font-normal bg-clip-padding border rounded transition dark:text-neutral-300"
            value={newIdea}
            onChange={(e) => setNewIdea(e.target.value)}
          />
          <Button isSpecial={true} onClick={handleAddIdea} className="!w-auto">
            {t('addNewIdea')}
          </Button>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {ideas.map((idea, index) => (
            <div
              key={index}
              className="ring-primary-800 hover:ring-primary-600 bg-neutral-100 dark:bg-normal-800 rounded-lg ring-2 text-2xl font-thin capitalize relative h-48 p-4 flex text-center items-center justify-center"
            >
              {idea.text}
              <div className="absolute bottom-1 right-1">
                <ProfilePic
                  photoURL={idea.owner?.photoURL}
                  alt={idea.owner?.displayName}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default Hideout

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['hideouts', 'common'])),
    },
  }
}
