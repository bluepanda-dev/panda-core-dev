import { useFirebase } from './useFirebase'
import { CUSTOMERS_DB, Subscription } from '@core/types/customer'
import { query, collection, getDocs } from 'firebase/firestore'
import { useEffect, useState } from 'react'

export const useCustomer = () => {
  const { db } = useFirebase()
  const [isPremium, setIsPremium] = useState(false)
  const [subscriptionType, setSubscriptionType] = useState('')

  const [activeSubscriptions, setActiveSubscriptions] = useState<
    Subscription[]
  >([])

  async function fetchActiveSubscription(uid: string) {
    setActiveSubscriptions([])
    const q = query(collection(db, CUSTOMERS_DB, uid, 'subscriptions'))
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(async (doc) => {
      const subscription = doc.data() as Subscription
      setActiveSubscriptions([...activeSubscriptions, subscription])
    })
  }

  useEffect(() => {
    const sub = activeSubscriptions.find(
      (sub) => sub.status === 'active' && sub.role === 'premium',
    )
    if (sub) {
      // TODO check when I go from plus to pro or downgrade
      setSubscriptionType(sub.items[0].plan.metadata.type)
      console.log('sub>>>>>>>', sub)
    } else {
      setSubscriptionType('free')
    }
    setIsPremium(!!sub)
  }, [activeSubscriptions])

  return {
    fetchActiveSubscription,
    activeSubscriptions,
    isPremium,
    subscriptionType,
  }
}
