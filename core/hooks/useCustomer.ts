import { where, onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useUserContext } from '@core/contexts/UserContext'
import {
  CUSTOMERS_DB,
  VAULT_DB,
  Invoice,
  Order,
  Subscription,
} from '@core/types/customer'
import { computePrice } from '@core/utils/currency'
import { useQuery } from './useQuery'

export const useCustomer = () => {
  const { user } = useUserContext()
  const { update, fetchAllWhere, fetch, fetchAll } = useQuery()
  const [settingUp, setSettingUp] = useState(false)
  const [isPremium, setIsPremium] = useState(false)
  const [subscriptionType, setSubscriptionType] = useState('')
  const [price, setPrice] = useState(0)
  const [nextPayment, setNextPayment] = useState('')
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [orders, setOrders] = useState<Order[]>([])

  const [activeSubscription, setActiveSubscription] =
    useState<Subscription | null>(null)

  async function cancelSubscription(
    subscriptionId: string,
    cb: (result: { canceled: boolean; error: string }) => void,
  ) {
    const refDoc = await update(
      { processing: true },
      CUSTOMERS_DB,
      user.uid,
      'cancel_subscriptions',
      subscriptionId,
    )

    onSnapshot(refDoc, (snap: any) => {
      const { error, canceled } = snap.data() as any
      if (error || canceled) {
        cb({ error: error?.message, canceled })
      }
    })
  }

  async function fetchInvoices(uid: string) {
    setInvoices([])
    const list: Invoice[] =
      (await fetchAllWhere(
        where('status', '==', 'succeeded'),
        CUSTOMERS_DB,
        uid,
        'payments',
      )) ?? []

    setInvoices(list && list.reverse())
  }

  async function fetchVault(id: string, productUID: string) {
    return await fetch(VAULT_DB, productUID)
  }

  async function fetchOrders(uid: string) {
    setOrders([])
    let list =
      (await fetchAllWhere<Order>(
        where('status', '==', 'succeeded'),
        CUSTOMERS_DB,
        uid,
        'payments',
      )) ?? []

    list = list.filter(
      (item) => item.items && item.items[0]?.price.type === 'one_time',
    )

    setOrders(list)
  }

  async function fetchActiveSubscription(uid: string) {
    setActiveSubscription(null)
    const list = await fetchAllWhere<Subscription>(
      [
        where('status', 'in', ['trialing', 'active']),
        where('role', '==', 'premium'),
      ],
      CUSTOMERS_DB,
      uid,
      'subscriptions',
    )

    if (list && list.length > 0) {
      setActiveSubscription({ ...list[0], uid: list[0].docId })
    }
  }

  async function setUp(uid: string) {
    setSettingUp(true)
    setTimeout(async () => {
      await fetchInvoices(uid)
      await fetchActiveSubscription(uid)
      await fetchOrders(uid)
      setSettingUp(false)
    }, 1000)
  }

  useEffect(() => {
    if (activeSubscription) {
      // TODO check when I go from plus to pro or downgrade
      if (activeSubscription.status === 'trialing') {
        setSubscriptionType('trial')
      } else {
        setSubscriptionType(activeSubscription.items[0].plan.metadata.type)
      }
      if (activeSubscription.items[0]?.plan?.amount) {
        setPrice(computePrice(activeSubscription.items[0].plan.amount))
      } else {
        setPrice(0)
      }
      setNextPayment(
        activeSubscription.current_period_end.toDate().toDateString(),
      )
    } else {
      setSubscriptionType('free')
    }
    setIsPremium(!!activeSubscription)
  }, [activeSubscription])

  return {
    activeSubscription,
    isPremium,
    subscriptionType,
    price,
    invoices,
    orders,
    nextPayment,
    cancelSubscription,
    fetchVault,
    setUp,
    settingUp,
  }
}
