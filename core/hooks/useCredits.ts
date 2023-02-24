import { onSnapshot, where } from 'firebase/firestore'
import { CREDITS_ITEMS_DB } from '@core/types/credits'
import { useState } from 'react'
import { useQuery } from './useQuery'
import { CreditItem } from '@core/types/credits'
import { useUserContext } from '@core/contexts/UserContext'
import { toast } from 'react-toastify'

export const useCredits = () => {
  const [loading, setLoading] = useState(false)
  const { profile } = useUserContext()
  const { fetchAllWhere, addToCollection } = useQuery()
  const [creditItems, setCreditItems] = useState<CreditItem[]>([])

  async function fetchCreditItems() {
    setCreditItems([])
    const list: CreditItem[] =
      (await fetchAllWhere<CreditItem>(
        where('active', '==', true),
        CREDITS_ITEMS_DB,
      )) ?? []
    setCreditItems(list)
  }

  async function buyWithCredits(item: CreditItem) {
    setLoading(true)

    const docR = await addToCollection(
      {
        amount: item.cost,
        item: item.docId,
      },
      'fe-customers',
      profile!.uid,
      'credits_spendings',
    )

    onSnapshot(docR, (snap: any) => {
      const { error, url } = snap.data()
      if (error) {
        alert(`An error occured: ${error.message}`)
        setLoading(false)
      }
      if (url) {
        toast('Credits successful used')
        fetchCreditItems()
        setLoading(false)
      }
    })
  }

  return { creditItems, fetchCreditItems, loading, buyWithCredits }
}
