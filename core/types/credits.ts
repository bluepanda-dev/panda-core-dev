export const CREDITS_ITEMS_DB = 'fe-credits-items'

export interface CreditItem {
  name: string
  preview: string
  cost: number
  docId: string
}

export interface ProtectedItem {
  download?: string
  raw?: string
}

export interface CreditSpending {
  amountCharged: number
  item: string
  protectedItem: ProtectedItem
  docId: string
}
