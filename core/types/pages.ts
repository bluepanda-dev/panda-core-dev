export type FeatureCard = {
  title: string
  content: string
  _image: string
}

export type WhyUsCard = {
  title: string
  content: string
  _image: string
}

export type ReviewCard = {
  name: string
  position: string
  content: string
}

export type PlanCard = {
  title: string
  price: string
  details: string
  _popular: boolean
  features: string[]
}

export type TimeLineData = {
  title: string
  content: string
}

export type OurNumber = {
  figure: string
  text: string
}

export type ProductCard = {
  _id: number
  title: string
  description: string
  price: string
  features: string[]
  _image: string
}

export type Faq = {
  question: string
  answer: string
}
