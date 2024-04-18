import { collection, doc, writeBatch } from 'firebase/firestore'
import { db } from '@lib/firebase'

import { COLLECTIONS } from '@constants'
import { PLAN } from '@/mock/data'

import Button from '@shared/Button'

function PlanAddButton() {
  const batch = writeBatch(db)

  const handleButtonClick = async () => {
    const plans = PLAN.map((plan, _) => {
      return {
        ...plan,
      }
    })

    plans.forEach((plan) => {
      const planDocRef = doc(collection(db, COLLECTIONS.PLAN))
      batch.set(planDocRef, plan)
    })

    await batch.commit()

    alert('여행계획 데이터가 생성되었습니다.')
  }

  return <Button onClick={handleButtonClick}>여행계획 데이터 생성</Button>
}

export default PlanAddButton
