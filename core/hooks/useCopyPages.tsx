import { useTranslation } from 'next-i18next'
import { Faq, OurNumber, ProductCard, TimeLineData } from '@core/types'
import { PlanCard, FeatureCard, WhyUsCard, ReviewCard } from '@core/types'

export type MetaPage<T extends any = any> = {
  title?: string
  cta?: string
  content?: string
  list?: T[]
  texts?: Record<string, string>
}

export const useCopyPages = () => {
  const { t } = useTranslation()
  const hero: MetaPage<string> = {
    content: t('hero.content')!,
    list: [t('hero.first'), t('hero.second'), t('hero.third')],
  }

  const features: MetaPage<FeatureCard> = {
    title: t('features.title')!,
    list: t('features.list', { returnObjects: true }) as FeatureCard[],
  }

  const whyUs: MetaPage<WhyUsCard> = {
    title: t('whyUs.title')!,
    list: t('whyUs.list', { returnObjects: true }) as WhyUsCard[],
  }

  const reviews: MetaPage<ReviewCard> = {
    title: t('reviews.title')!,
    list: t('reviews.list', { returnObjects: true }) as ReviewCard[],
  }

  const plans: MetaPage<PlanCard> = {
    title: t('plans.title')!,
    cta: t('plans.cta')!,
    list: t('plans.list', { returnObjects: true }) as PlanCard[],
  }

  const timeLine: MetaPage<TimeLineData> = {
    title: t('timeline.title')!,
    list: t('timeline.list', { returnObjects: true }) as TimeLineData[],
  }

  const ourNumbers: MetaPage<OurNumber> = {
    title: t('ourNumbers.title')!,
    list: t('ourNumbers.list', { returnObjects: true }) as OurNumber[],
  }

  const customers: MetaPage = {
    title: t('customers.title')!,
  }

  const techStack: MetaPage = {
    title: t('techStack.title')!,
  }

  const codeExample: MetaPage = {
    title: t('codeExample.title')!,
  }

  const products: MetaPage<ProductCard> = {
    title: t('products.title')!,
    list: t('products.list', { returnObjects: true }) as ProductCard[],
    texts: {
      buyNow: t('buyNow')!,
    },
  }

  const keepMeInformed: MetaPage = {
    title: t('keepMeInformed.title')!,
    cta: t('keepMeInformed.cta')!,
  }

  const faqs: MetaPage<Faq> = {
    title: t('faqs.title')!,
    list: t('faqs.list', { returnObjects: true }) as Faq[],
  }

  const showVideo: MetaPage = {
    title: t('showVideo.title')!,
  }

  return {
    hero,
    features,
    whyUs,
    reviews,
    plans,
    timeLine,
    ourNumbers,
    customers,
    codeExample,
    products,
    keepMeInformed,
    faqs,
    showVideo,
    techStack,
  }
}
