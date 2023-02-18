import { useFirebase } from './useFirebase'
import {
  CUSTOMERS_DB,
  Invoice,
  Order,
  Subscription,
} from '@core/types/customer'
import {
  query,
  collection,
  getDocs,
  doc,
  setDoc,
  onSnapshot,
  where,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useUserContext } from '@core/contexts/UserContext'

export const useCustomer = () => {
  const { db } = useFirebase()
  const { user } = useUserContext()
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
    const docRef = doc(
      db,
      CUSTOMERS_DB,
      user.uid,
      'cancel_subscriptions',
      subscriptionId,
    )
    const refDoc = await setDoc(docRef, {
      proccessing: true,
    })

    onSnapshot(docRef, (snap: any) => {
      const { error, canceled } = snap.data() as any
      if (error || canceled) {
        cb({ error: error?.message, canceled })
      }
    })
  }

  async function fetchInvoices(uid: string) {
    setInvoices([])
    const q = query(collection(db, CUSTOMERS_DB, uid, 'payments'))
    const querySnapshot = await getDocs(q)
    setInvoices(
      querySnapshot.docs.map((doc) => doc.data() as Invoice).reverse(),
    )
  }

  async function fetchOrders(uid: string) {
    setOrders([])
    const q = query(
      collection(db, CUSTOMERS_DB, uid, 'payments'),
      where('status', '==', 'succeeded'),
    )
    const querySnapshot = await getDocs(q)
    console.log('order docs', querySnapshot.docs)
    setOrders(
      querySnapshot.docs
        .filter(
          (doc) =>
            (doc.data() as Order).items &&
            (doc.data() as Order).items[0]?.price.type === 'one_time',
        )
        .map((doc) => doc.data() as Order),
    )
  }

  async function fetchActiveSubscription(uid: string) {
    setActiveSubscription(null)
    const q = query(collection(db, CUSTOMERS_DB, uid, 'subscriptions'))
    const querySnapshot = await getDocs(q)
    const subs = querySnapshot.docs.map((doc) => {
      const sub = doc.data() as Subscription
      sub.uid = doc.id
      return sub
    })

    const sub = subs.find(
      (sub) => sub.status === 'active' && sub.role === 'premium',
    )
    if (sub) {
      setActiveSubscription(sub)
    }
  }

  async function fetchCustomerData(uid: string) {
    await fetchInvoices(uid)
    await fetchActiveSubscription(uid)
    await fetchOrders(uid)
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
    fetchCustomerData,
  }
}
