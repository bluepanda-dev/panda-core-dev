import { useFirebase } from './useFirebase'
import { CUSTOMERS_DB, Invoice, Subscription } from '@core/types/customer'
import {
  query,
  collection,
  getDocs,
  doc,
  setDoc,
  onSnapshot,
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

  const [activeSubscription, setActiveSubscription] =
    useState<Subscription | null>(null)

  async function cancelSubscription(
    subscriptionId: string,
    cb: (result: { canceled: boolean; error: string }) => void,
  ) {
    console.log('cancel subscription', subscriptionId, user.uid)
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
      console.log('cancel subscription', error, canceled)
      if (error || canceled) {
        cb({ error: error?.message, canceled })
      }
    })
  }

  async function fetchInvoices(uid: string) {
    setInvoices([])
    const q = query(collection(db, CUSTOMERS_DB, uid, 'payments'))
    const querySnapshot = await getDocs(q)
    console.log('querySnapshot', querySnapshot)
    setInvoices(
      querySnapshot.docs.map((doc) => doc.data() as Invoice).reverse(),
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
      console.log('sub>>>>>>>', activeSubscription)
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
    nextPayment,
    invoices,
    fetchCustomerData,
    cancelSubscription,
  }
}
