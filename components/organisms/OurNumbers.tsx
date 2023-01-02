import { useDataPages } from '@core/hooks/useDataPages'

export default function Reviews() {
  const { ourNumbers } = useDataPages()

  return (
    <div className="py-8 w-full bg-neutral-100 dark:bg-normal-800">
      <div className="text-center text-6xl font-bold pb-16">
        {ourNumbers.title}
      </div>
      <div className="pt-12 w-full flex  justify-center">
        <div className="px-2 md:px-24 flex flex-col md:flex-row justify-center gap-16 items-center w-full">
          {ourNumbers.list!.map((option, index) => (
            <div
              key={index}
              className="text-6xl text-center md:w-full flex flex-col gap-4"
            >
              <div className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-accent-500">
                {option.figure}
              </div>
              <div className="text-2xl font-light">{option.text}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
