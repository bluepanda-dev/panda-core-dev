import { CREDITS_DB, Price, Product, PRODUCTS_DB } from '@core/types/payments'
import { useEffect, useState } from 'react'
import { where, onSnapshot } from 'firebase/firestore'
import { useUserContext } from '@core/contexts/UserContext'
import { useQuery } from './useQuery'

export const usePayments = () => {
  const { profile } = useUserContext()
  const { fetchAll, fetchAllWhere, addToCollection } = useQuery()

  const [planProduct, setPlanProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)

  async function fetchProducts() {
    const items = []

    const list =
      (await fetchAllWhere<Product>(
        [where('active', '==', true), where('role', '==', null)],
        PRODUCTS_DB,
      )) ?? []

    for (const product of list) {
      const prices: Price[] = []

      const subList =
        (await fetchAllWhere<Price>(
          where('active', '==', true),
          PRODUCTS_DB,
          product.docId,
          'prices',
        )) ?? []

      subList.forEach((price) => {
        price.guid = price.docId
        prices.push(price)
      })
      items.push({ ...product, prices })
    }
    setProducts([...items])
  }

  async function fetchPlans() {
    const list =
      (await fetchAllWhere<Product>(
        [where('active', '==', true), where('metadata.type', '==', 'plans')],
        PRODUCTS_DB,
      )) ?? []

    list.forEach(async (product) => {
      const prices: Price[] = []

      const subList =
        (await fetchAllWhere<Price>(
          where('active', '==', true),
          PRODUCTS_DB,
          product.docId,
          'prices',
        )) ?? []

      subList.forEach((price) => {
        price.guid = price.docId
        prices.push(price)
      })
      setPlanProduct({ ...product, prices })
    })
  }

  async function startSubscription(price: Price) {
    setLoading(true)
    const docR = await addToCollection(
      {
        price: price.guid,
        success_url: `${window.location.origin}/payment/success`,
        cancel_url: `${window.location.origin}/payment/failure`,
      },
      'fe-customers',
      profile!.uid,
      'checkout_sessions',
    )

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

  async function singlePayment(price: Price) {
    setLoading(true)

    const docR = await addToCollection(
      {
        mode: 'payment',
        price: price.guid,
        success_url: `${window.location.origin}/payment/success`,
        cancel_url: `${window.location.origin}/payment/failure`,
      },

      'fe-customers',
      profile!.uid,
      'checkout_sessions',
    )

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

  async function fetchCreditsProducts() {
    const list = await fetchAll<{ name: string }>(CREDITS_DB)

    const credits = products.filter((p) =>
      list.some((c) => c.docId === p.docId),
    )

    return credits
  }

  useEffect(() => {
    fetchPlans()
    fetchProducts()
  }, [])

  return {
    planProduct,
    products,
    startSubscription,
    singlePayment,
    fetchCreditsProducts,
    loading,
  }
}
