import lottie from 'lottie-web'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useEffect } from 'react'
import { FaFacebook, FaTwitter, FaDiscord, FaGithub } from 'react-icons/fa'
import BPLink from '@components/atoms/BPLink'
import { EMAIL, NAME } from '@core/helpers/branding'
import { useCopyPages } from '@core/hooks/useCopyPages'
import animationData from '../data/lottie-animation.json'

export default function BPFooter() {
  const { pathname } = useRouter()
  const { t } = useTranslation()
  const { features, techStack } = useCopyPages()
  useEffect(() => {
    if (
      pathname === '' &&
      !document.querySelector('#lottie-animation')!.innerHTML
    ) {
      lottie.loadAnimation({
        container: document.querySelector('#lottie-animation')!,
        animationData,
        renderer: 'svg',
        loop: true,
        autoplay: true,
      })
    }
  }, [pathname])
  return (
    <div className="relative mt-16 w-full">
      {pathname === '' && <div id="lottie-animation" className="w-full" />}
      <footer className="relative border-t border-neutral-800 py-4">
        <div className="justify-center grid grid-cols-1 md:grid-cols-3 items-center px-4 py-12 w-full">
          <Image
            alt="Blue panda logo"
            title="Blue Panda"
            src="https://plus.blue-panda.dev/logo-v2.webp"
            width={140}
            height={48}
            className="absolute -left-16 lg:-left-32 bottom-0 w-48 lg:w-64 xl:w-80 hidden md:block opacity-70 grayscale "
          />
          <div className="h-full md:justify-self-end">
            <span className="block mb-4 md:border-none border-b border-neutral-900 pb-2 font-semibold md:w-full w-[200px]">
              {t('contactUs')}
            </span>
            <ul className="list-none text-normal-400 dark:text-normal-100">
              <li className="pb-2">
                <Link
                  title="E-Mail"
                  target="_blank"
                  rel="noreferrer"
                  href={`mailto:{EMAIL}`}
                >
                  <BPLink>{EMAIL}</BPLink>
                </Link>
              </li>
              <li className="pb-2">
                <Link
                  target="_blank"
                  title="Documentation"
                  href="https://docu.blue-panda.dev/"
                  rel="noreferrer"
                >
                  <BPLink> {t('documentation')} </BPLink>
                </Link>
              </li>
            </ul>
          </div>
          <div className="h-full md:justify-self-center">
            <span className="block mb-4 md:border-none border-b border-neutral-800 pb-2 md:mt-0 mt-4 font-semibold md:w-full w-[200px]">
              {features.title}
            </span>
            <ul className="list-none text-normal-400 dark:text-normal-100 md:mt-0 mt-4">
              <li className="pb-2">
                <Link
                  target="_blank"
                  rel="noreferrer"
                  title="Licence"
                  href="/license"
                >
                  <BPLink> {t('license')} </BPLink>
                </Link>
              </li>
              <li className="pb-2">
                <Link
                  rel="noreferrer"
                  title="Privacy"
                  target="_blank"
                  href="/privacy"
                >
                  <BPLink>{t('privacy')}</BPLink>
                </Link>
              </li>
              <li className="pb-2">
                <Link
                  rel="noreferrer"
                  title="Terms of Service"
                  target="_blank"
                  href="/termsofservice"
                >
                  <BPLink>{t('terms')}</BPLink>
                </Link>
              </li>
            </ul>
          </div>
          <div className="h-full md:justify-self-initial">
            <span className="block mb-4 md:border-none border-b border-neutral-800 pb-2  md:mt-0 mt-4 font-semibold md:w-full w-[200px]">
              {techStack.title}
            </span>
            <ul className="list-none text-normal-400 dark:text-normal-100">
              <li className="pb-2">
                <Link
                  rel="noreferrer"
                  title="ReactJS"
                  target="_blank"
                  href="https://react.dev/"
                >
                  <BPLink>ReactJS</BPLink>
                </Link>
              </li>
              <li className="pb-2">
                <Link
                  rel="noreferrer"
                  title="NextJS"
                  target="_blank"
                  href="https://nextjs.org/"
                >
                  <BPLink>NextJS</BPLink>
                </Link>
              </li>
              <li className="pb-2">
                <Link
                  rel="noreferrer"
                  title="TailwindCSS"
                  target="_blank"
                  href="https://tailwindcss.com/"
                >
                  <BPLink>TailwindCSS</BPLink>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-normal-500 dark:text-normal-100 md:px-8 pl-4 items-center flex flex-col gap-4 items-right md:text-right mb-12 md:mb-0">
          <span>
            Copyright © 2023{' '}
            <Link
              className="bg-gradient-to-r from-red-600 via-yellow-500 to-blue-400 inline-block text-transparent bg-clip-text"
              title={NAME}
              href="https://blue-panda.dev/"
            >
              <BPLink magic>{NAME}</BPLink>
            </Link>
            . {t('allRights')}
          </span>
          <div className="flex gap-4 flex-wrap md:justify-end">
            <Link
              rel="noreferrer"
              title="Facebook"
              target="_blank"
              href="https://www.facebook.com/blue.panda.io/"
            >
              <BPLink className="hover:opacity-75">
                <FaFacebook color="#5369ec" size={32} />
              </BPLink>
            </Link>
            <Link
              rel="noreferrer"
              title="GitHub"
              target="_blank"
              href="https://github.com/bluepanda-dev"
            >
              <BPLink variant="light" className="hover:opacity-75">
                <FaGithub color="#656565" size={32} />
              </BPLink>
            </Link>
            <Link
              rel="noreferrer"
              title="Twitter"
              target="_blank"
              href="https://twitter.com/bluepanda_dev/"
            >
              <BPLink className="hover:opacity-75">
                <FaTwitter color="#6799ed" size={32} />
              </BPLink>
            </Link>
            <Link
              rel="noreferrer"
              title="Let's Chat"
              target="_blank"
              href="https://discord.gg/XX3tpJxptC"
            >
              <BPLink className="hover:opacity-75">
                <FaDiscord color="#6652ec" size={32} />
              </BPLink>
            </Link>
          </div>
        </div>
        <Image
          alt="Blue panda logo"
          title="Blue Panda"
          src="https://plus.blue-panda.dev/logo-v2.webp"
          width={140}
          height={48}
          className="bottom-0 -right-16 absolute w-64 md:hidden opacity-30 grayscale z-[-1]"
        />
      </footer>
    </div>
  )
}
