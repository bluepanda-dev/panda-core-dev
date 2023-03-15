export const PRODUCTS_DB = 'fe-products'
export const STRIPE_PRODUCTS_TYPE = 'products'
export const STRIPE_PLANS_TYPE = 'plans'
export const STRIPE_CREDITS_TYPE = 'plans'

export type Price = {
  guid: string
  active: boolean
  currency: string
  interval: string
  product: string
  type: string
  unit_amount: number
  stripe_metadata_features: string
  stripe_metadata_special: string
  stripe_metadata_name: string
  stripe_metadata_description: string
  stripe_metadata_order: string
  stripe_metadata_type: string
  stripe_metadata_hasTrial: string
  transform_quantity: { round: string; divide_by: number }
  items: { description: string; price: Price }[]
  docId?: string
}

export type Product = {
  active: boolean
  name: string
  description: string
  role: string
  prices: Price[]
  images: string[]
  stripe_metadata_features: string
  docId?: string
}
