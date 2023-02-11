export const CUSTOMERS_DB = 'fe-customers'

export type SubscriptionPlan = {
  active: boolean
  amount: number
  currency: string
  interval: string
  inerval_count: number
  object: string
  product: string
  usage_type: string
  trial_period_days: number
  metadata: Record<string, string>
}

export type SubscriptionItem = {
  id: string
  subscription: string
  plan: SubscriptionPlan
}

export type Subscription = {
  status: string
  role: string
  cancel_at: string
  cancel_at_period_end: string
  canceled_at: string
  created: string
  current_period_end: string
  current_period_start: string
  ended_at: string
  product: string
  items: SubscriptionItem[]
}
