import { useTranslation } from 'next-i18next'
import { FiCheck } from 'react-icons/fi'

type TimeLineData = {
  figure: string
  text: string
}
export default function Reviews() {
  const { t } = useTranslation('common')

  const options = t('timeline.list', { returnObjects: true }) as TimeLineData[]

  return (
    <div className="py-4 pt-14 w-full">
      <div className="text-center text-6xl font-bold pb-24">
        {t('timeline.title')}
      </div>
      <div className="w-full flex relative justify-center">
        <div
          className="hidden sm:block bg-gradient-to-b from-neutral-200 to-primary-400 dark:from-primary-200 dark:to-primary-700 absolute w-px h-full"
          style={{ left: '50%' }}
        ></div>
        <div className="mb-48 px-2 md:px-24 flex flex-col justify-center gap-16 items-center w-full">
          {options.map((option, index) => (
            <div
              key={index}
              className={
                index % 2 === 0
                  ? `max-w-4xl mb-8 flex justify-between items-center w-full right-timeline `
                  : `max-w-4xl mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline`
              }
            >
              <div className="order-1 w-5/12"></div>
              <div className="absolute sm:relative flex z-20 items-center order-1 border bg-neutral-50 dark:bg-normal-900 shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto font-semibold text-lg">{index + 1}</h1>
              </div>
              <div className="order-1 border rounded-lg shadow-xl sm:w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-xl">Lorem Ipsum</h3>
                <p className="text-sm leading-snug tracking-wide dark:text-neutral-400 text-opacity-100">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industrys
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>
          ))}
          <div className="bg-gradient-to-r from-primary-400 to-primary-700 z-20 justify-center hidden sm:flex items-center order-1 shadow-xl w-12 h-12 rounded-full absolute bottom-0">
            <FiCheck className="font-bold text-3xl text-neutral-50" />
          </div>
        </div>
      </div>
    </div>
  )
}
