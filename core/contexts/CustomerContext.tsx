import { useCustomer } from '@core/hooks/useCustomer'
import { Invoice, Order, Subscription } from '@core/types/customer'
import { createContext, useContext, useEffect, useState } from 'react'
import { useUserContext } from './UserContext'

type CustomerContextType = {
  subscriptionType: string
  isPremium: boolean
  activeSubscription: Subscription | null
  price: number
  nextPayment: string
  invoices: Invoice[]
  cancelSubscription: (
    subscriptionId: string,
    cb: (result: { canceled: boolean; error: string }) => void,
  ) => void
  orders: Order[]
}

const CustomerContext = createContext({} as CustomerContextType)

export function useCustomerContext() {
  return useContext(CustomerContext)
}

export function CustomerProvider({ children }: { children: React.ReactNode }) {
  const { profile } = useUserContext()

  const {
    subscriptionType,
    isPremium,
    activeSubscription,
    price,
    nextPayment,
    invoices,
    orders,
    fetchCustomerData,
    cancelSubscription,
  } = useCustomer()

  useEffect(() => {
    async function setUp() {
      if (profile) {
        setTimeout(async () => {
          fetchCustomerData(profile!.uid)
        }, 1000)
      }
    }
    setUp()
  }, [profile])

  return (
    <CustomerContext.Provider
      value={{
        subscriptionType,
        isPremium,
        activeSubscription,
        price,
        nextPayment,
        invoices,
        orders,
        cancelSubscription,
      }}
    >
      {children}
    </CustomerContext.Provider>
  )
}
