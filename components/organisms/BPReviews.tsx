import Image from 'next/image'
import { useCopyPages } from '@core/hooks/useCopyPages'
import { ReviewCard } from '@core/types'

const BPReview = ({ review }: { review: ReviewCard }) => {
  return (
    <div className="max-w-sm bg-neutral-50 bg-opacity-20 rounded-md p-4 py-6 shadow-lg">
      <div className="flex gap-4">
        <div className="basis-3/5 text-neutral-200 text-md text-left">
          {review.content}
        </div>
        <div className="basis-2/5 flex flex-col self-end justify-end text-right">
          <Image
            alt={'Reviewer'}
            src={review._image}
            width={100}
            height={100}
            className="w-16 h-16 border-4 rounded-full self-end"
          />
          <div className="self-end pt-2">{review.name}</div>
          <div className="self-end">{review.position}</div>
        </div>
      </div>
    </div>
  )
}

export default function BPReviews() {
  const { reviews } = useCopyPages()

  return (
    <div className="py-8 w-full bg-gradient-to-r from-primary-900 via-primary-800 to-primary-600 text-neutral-50">
      <div className="text-center text-6xl font-bold">{reviews.title}</div>
      <div className="pt-24 w-full flex  justify-center">
        <div className="px-2 md:px-24 flex flex-col flex-wrap sm:flex-row justify-center gap-16 items-center w-full max-w-8xl">
          {reviews.list!.map((option, index) => (
            <BPReview key={index} review={option} />
          ))}
        </div>
      </div>
    </div>
  )
}
