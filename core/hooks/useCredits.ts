import { onSnapshot, where } from 'firebase/firestore'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useUserContext } from '@core/contexts/UserContext'
import { useQuery } from './useQuery'
import { CreditItem, CreditSpending } from '@core/types/credits'
import { CREDITS_DB, CREDITS_ITEMS_DB } from '@core/types/credits'
import { CUSTOMERS_DB, Invoice } from '@core/types'

export const useCredits = () => {
  const [loading, setLoading] = useState(false)
  const { profile } = useUserContext()
  const { fetchAllWhere, addToCollection, fetchAll } = useQuery()
  const [creditItems, setCreditItems] = useState<CreditItem[]>([])
  const [totalCredits, setTotalCredits] = useState<number>(0)
  const [totalSpending, setTotalSpending] = useState<number>(0)
  const [spendings, setSpendings] = useState<CreditSpending[]>([])

  async function fetchCreditItems() {
    setCreditItems([])
    const list: CreditItem[] =
      (await fetchAllWhere<CreditItem>(
        where('active', '==', true),
        CREDITS_ITEMS_DB,
      )) ?? []
    setCreditItems(list)
  }

  async function fetchSpendings(uid: string) {
    setSpendings([])
    setTotalCredits(0)
    setTotalSpending(0)
    setLoading(true)

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

    setLoading(false)
  }

  async function buyWithCredits(item: CreditItem) {
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
      }
      if (snap.data().proccessed) {
        toast('Credits successful used')
        await fetchCreditItems()
        await fetchSpendings(profile!.uid)
      }
    })
  }

  return {
    loading,
    fetchCreditItems,
    fetchSpendings,
    creditItems,
    buyWithCredits,
    totalCredits,
    totalSpending,
    spendings,
  }
}
