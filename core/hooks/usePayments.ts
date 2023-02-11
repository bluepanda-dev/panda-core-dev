import { Price, Product, PRODUCTS_DB } from '@core/types/payments'
import { useEffect, useState } from 'react'
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  onSnapshot,
} from 'firebase/firestore'
import { useFirebase } from './useFirebase'
import { useUserContext } from '@core/contexts/UserContext'

export const usePayments = () => {
  const { db } = useFirebase()
  const { profile } = useUserContext()

  const [planProduct, setPlanProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(false)

  async function fetchPlans() {
    const q = query(
      collection(db, PRODUCTS_DB),
      where('active', '==', true),
      where('metadata.type', '==', 'plans'),
    )
    const products: Product[] = []
    const querySnapshot = await getDocs(q)
    querySnapshot.forEach(async (doc) => {
      const prices: Price[] = []

      const subQuery = query(
        collection(db, PRODUCTS_DB, doc.id, 'prices'),
        where('active', '==', true),
      )

      const subcollectionSnapshot = await getDocs(subQuery)

      subcollectionSnapshot.forEach((doc) => {
        const price = doc.data() as Price
        price.guid = doc.id
        prices.push(price)
      })

      const product = doc.data() as Product
      product.prices = prices
      setPlanProduct(product)
    })
  }

  async function startSubscription(price: Price) {
    setLoading(true)
    const docRef = collection(
      db,
      'fe-customers',
      profile!.uid,
      'checkout_sessions',
    )
    const docR = await addDoc(docRef, {
      price: price.guid,
      success_url: `${window.location.origin}/payment/success`,
      cancel_url: `${window.location.origin}/payment/failure`,
    })

    onSnapshot(docR, (snap: any) => {
      const { error, url } = snap.data()
      if (error) {
        alert(`An error occured: ${error.message}`)
        setLoading(false)
      }
      if (url) {
        window.location.assign(url)
      }
    })
  }

  useEffect(() => {
    fetchPlans()
  }, [])

  return {
    planProduct,
    startSubscription,
    loading,
  }
}
