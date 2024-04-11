import { collection, doc, writeBatch } from 'firebase/firestore'
import { db } from '@lib/firebase'

import { COLLECTIONS } from '@constants'
import { ITINERARY } from '@/mock/data'

import Button from '@shared/Button'

function ItineraryAddButton() {
  const batch = writeBatch(db)

  const handleButtonClick = async () => {
    const itineraries = ITINERARY.map((itinerary, _) => {
      return {
        ...itinerary,
      }
    })

    itineraries.forEach((itinerary) => {
      const itineraryDocRef = doc(collection(db, COLLECTIONS.ITINERARY))
      batch.set(itineraryDocRef, itinerary)
    })

    await batch.commit()

    alert('여행일정 데이터가 생성되었습니다.')
  }

  return <Button onClick={handleButtonClick}>여행일정 데이터 생성</Button>
}

export default ItineraryAddButton
