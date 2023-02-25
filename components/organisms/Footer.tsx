import lottie from 'lottie-web'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { FaFacebookSquare, FaTwitterSquare, FaInstagram } from 'react-icons/fa'
import animationData from '../data/lottie-animation.json'

export default function Footer() {
  useEffect(() => {
    if (!document.querySelector('#lottie-animation')!.innerHTML) {
      lottie.loadAnimation({
        container: document.querySelector('#lottie-animation')!,
        animationData,
        renderer: 'svg',
        loop: true,
        autoplay: true,
      })
    }
  }, [])
  return (
    <div className="relative mt-16">
      <div id="lottie-animation" className="w-full" />
      <footer className="relative bg-neutral-100 dark:bg-normal-800 border-t border-neutral-800 py-4">
        <div className="justify-center grid grid-cols-1 md:grid-cols-3 items-center px-4 py-12 w-full">
          <Image
            alt="logo"
            src="/logo-v2.webp"
            width={140}
            height={48}
            className="absolute -left-16 lg:-left-32 bottom-0 w-48 lg:w-64 xl:w-80 hidden md:block opacity-70 grayscale "
          />
          <div className="h-full md:justify-self-end">
            <h2 className="mb-4 md:border-none border-b border-neutral-800 pb-2">
              Contact Us
            </h2>
            <ul className="list-none text-normal-400 dark:text-normal-100">
              <li className="pb-2">info@example.com</li>
              <li className="pb-2">Slack</li>
            </ul>
          </div>
          <div className="h-full md:justify-self-center">
            <h2 className="mb-4 md:border-none border-b border-neutral-800 pb-2">
              Features
            </h2>
            <ul className="list-none text-normal-400 dark:text-normal-100">
              <li className="pb-2">Ship faster </li>
              <li className="pb-2">Simplicity first</li>
              <li className="pb-2">Support for you </li>
              <li className="pb-2">Made with 💙 </li>
            </ul>
          </div>
          <div className="h-full md:justify-self-initial">
            <h2 className="mb-4 md:border-none border-b border-neutral-800 pb-2">
              Tech Stack
            </h2>
            <ul className="list-none text-normal-400 dark:text-normal-100">
              <li className="pb-2">ReactJS</li>
              <li className="pb-2">NextJS</li>
              <li className="pb-2">TailwindCSS</li>
            </ul>
          </div>
        </div>
        <div className="text-normal-500 dark:text-normal-100 px-4 flex flex-col gap-4 items-right md:text-right">
          <span>Copyright © 2023 Blue Panda. All rights reserved.</span>
          <div className="flex gap-4 flex-wrap md:justify-end">
            <FaFacebookSquare size={32} />
            <FaTwitterSquare size={32} />
            <FaInstagram size={32} />
          </div>
        </div>
        <Image
          alt="logo"
          src="/logo-v2.webp"
          width={140}
          height={48}
          className="bottom-0 -right-16 absolute w-64 md:hidden opacity-30 grayscale "
        />
      </footer>
    </div>
  )
}
