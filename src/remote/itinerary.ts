import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  QuerySnapshot,
  startAfter,
  where,
} from 'firebase/firestore'

import { COLLECTIONS } from '@constants'
import { db } from '@lib/firebase'
import { Itinerary } from '@models/itinerary'

// 여행일정 전체 목록 조회
export async function getItineraries({
  userId,
  pageParam,
}: {
  userId: string
  pageParam?: QuerySnapshot<Itinerary>
}) {
  const itineraryQuery =
    pageParam == null
      ? query(
          collection(db, COLLECTIONS.ITINERARY),
          where('creatorId', '==', userId),
          orderBy('departure_date', 'desc'),
          limit(4),
        )
      : query(
          collection(db, COLLECTIONS.ITINERARY),
          where('creatorId', '==', userId),
          orderBy('departure_date', 'desc'),
          startAfter(pageParam),
          limit(4),
        )

  const itinerariesSnapshot = await getDocs(itineraryQuery)

  const itineraries = itinerariesSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Itinerary,
  )

  const lastVisible =
    itinerariesSnapshot.docs[itinerariesSnapshot.docs.length - 1]

  return {
    itineraries,
    lastVisible,
  }
}
