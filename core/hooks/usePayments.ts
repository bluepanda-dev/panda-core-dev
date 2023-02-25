import { CREDITS_DB, Price, Product, PRODUCTS_DB } from '@core/types/payments'
import { useState } from 'react'
import { where, onSnapshot } from 'firebase/firestore'
import { useUserContext } from '@core/contexts/UserContext'
import { useQuery } from './useQuery'

export const usePayments = () => {
  const { profile } = useUserContext()
  const { fetchAllWhere, addToCollection } = useQuery()

  const [planProduct, setPlanProduct] = useState<Product | null>(null)
  const [products, setProducts] = useState<Product[]>([])
  const [settingUp, setSettingUp] = useState(false)

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
    return items
  }

  async function fetchPlans() {
    const list =
      (await fetchAllWhere<Product>(
        [where('active', '==', true), where('metadata.type', '==', 'plans')],
        PRODUCTS_DB,
      )) ?? []
    // there is only one plan which has multiple prices
    const product = list[0]

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
    return { ...product, prices }
  }

  async function startSubscription(price: Price) {
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
      }
      if (url) {
        window.location.assign(url)
      }
    })
  }

  async function singlePayment(price: Price) {
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
      }
      if (url) {
        window.location.assign(url)
      }
    })
  }

  async function setUp() {
    setSettingUp(true)
    await fetchPlans().then((product) => setPlanProduct(product))
    await fetchProducts().then((products) => setProducts(products))
    setSettingUp(false)
  }

  return {
    planProduct,
    products,
    startSubscription,
    singlePayment,
    setUp,
    settingUp,
  }
}
