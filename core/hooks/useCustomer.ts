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
    let list = await fetchAll<Subscription>(CUSTOMERS_DB, uid, 'subscriptions')

    const subs = list.map((sub) => {
      return { ...sub, uid: sub.docId }
    })

    const sub = subs.find(
      (sub) => sub.status === 'active' && sub.role === 'premium',
    )
    if (sub) {
      setActiveSubscription(sub)
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
      setSubscriptionType(activeSubscription.items[0].plan.metadata.type)
      if (activeSubscription.items[0]?.plan?.amount) {
        setPrice(activeSubscription.items[0].plan.amount / 100)
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
