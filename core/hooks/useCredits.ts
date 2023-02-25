import { onSnapshot, where } from 'firebase/firestore'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useUserContext } from '@core/contexts/UserContext'
import { useQuery } from './useQuery'
import { CreditItem, CreditSpending } from '@core/types/credits'
import { CREDITS_DB, CREDITS_ITEMS_DB } from '@core/types/credits'
import { CUSTOMERS_DB, Invoice } from '@core/types'
import { Product, PRODUCTS_DB, Price } from '@core/types/payments'

export const useCredits = () => {
  const { profile } = useUserContext()
  const [settingUp, setSettingUp] = useState(false)
  const { fetchAllWhere, addToCollection, fetchAll } = useQuery()
  const [creditItems, setCreditItems] = useState<CreditItem[]>([])
  const [totalCredits, setTotalCredits] = useState<number>(0)
  const [totalSpending, setTotalSpending] = useState<number>(0)
  const [creditProducts, setCreditProducts] = useState<Product[]>([])
  const [spendings, setSpendings] = useState<CreditSpending[]>([])

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

  async function fetchCreditItems() {
    return (
      (await fetchAllWhere<CreditItem>(
        where('active', '==', true),
        CREDITS_ITEMS_DB,
      )) ?? []
    )
  }

  async function fetchSpendings(uid: string) {
    const list: Invoice[] =
      (await fetchAll(CUSTOMERS_DB, uid, 'payments')) ?? []

    const credits = await fetchAll<{ name: string }>(CREDITS_DB)

    const spendings =
      (await fetchAllWhere<CreditSpending>(
        where('proccessed', '==', true),
        CUSTOMERS_DB,
        uid,
        'credits_spendings',
      )) ?? []

    const totalSpending = spendings.reduce((acc, curr) => {
      return acc + curr.amountCharged
    }, 0)

    const filteredCredits = list
      .filter((item) => item?.items?.length)
      .filter((item) =>
        credits.some(
          (c) =>
            c.docId === item?.items[0].price.product &&
            item.status === 'succeeded',
        ),
      )

    const totalCustomerCredits = filteredCredits.reduce((acc, curr) => {
      return acc + curr.items[0].price.transform_quantity.divide_by
    }, 0)

    setSpendings(spendings)
    setTotalCredits(totalCustomerCredits - totalSpending)
    setTotalSpending(totalSpending)
  }

  async function buyWithCredits(item: CreditItem, onDone: () => void) {
    const docR = await addToCollection(
      {
        amount: item.cost,
        item: item.docId,
      },
      'fe-customers',
      profile!.uid,
      'credits_spendings',
    )

    onSnapshot(docR, async (snap: any) => {
      const { error } = snap.data()
      if (error) {
        alert(`An error occured: ${error.message}`)
        onDone()
      }
      if (snap.data().proccessed) {
        toast('Credits successful used')
        await fetchCreditItems()
        await fetchSpendings(profile!.uid)
        onDone()
      }
    })
  }

  async function fetchCreditsProducts() {
    const products = await fetchProducts()
    const list = await fetchAll<{ name: string }>(CREDITS_DB)

    const credits = products.filter((p) =>
      list.some((c) => c.docId === p.docId),
    )

    return credits
  }

  async function setUp() {
    setSettingUp(true)
    await fetchCreditsProducts().then((credits) => setCreditProducts(credits))
    await fetchCreditItems().then((items) => setCreditItems(items))
    await fetchSpendings(profile!.uid)
    setSettingUp(false)
  }

  return {
    creditItems,
    creditProducts,
    buyWithCredits,
    totalCredits,
    totalSpending,
    spendings,
    setUp,
    settingUp,
  }
}
