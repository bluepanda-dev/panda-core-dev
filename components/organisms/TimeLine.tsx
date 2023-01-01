import { useDataPages } from '@core/hooks/useDataPages'
import { TimeLineData } from '@core/types'
import { FiCheck } from 'react-icons/fi'

export default function Reviews() {
  const { timeLine } = useDataPages()

  return (
    <div className="w-full">
      <div className="text-center text-6xl font-bold pb-4">
        {timeLine.title}
      </div>
      <div className="w-full flex relative justify-center mt-24">
        <div
          className="hidden sm:block bg-gradient-to-b from-neutral-200 to-primary-400 dark:from-primary-200 dark:to-primary-700 absolute w-px h-full"
          style={{ left: '50%' }}
        ></div>
        <div className="mb-8 px-2 md:px-24 flex flex-col justify-center gap-16 items-center w-full">
          {timeLine.list.map((option, index) => (
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
                <h3 className="mb-3 font-bold text-xl">{option.title}</h3>
                <p className="text-sm leading-snug tracking-wide dark:text-neutral-400 text-opacity-100">
                  {option.content}
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
