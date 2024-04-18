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
import { Plan } from '@/models/plan'

// 여행일정 전체 목록 조회
// @TODO: 공유받은 여행일정도 조회
export async function getPlans({
  userId,
  pageParam,
}: {
  userId: string
  pageParam?: QuerySnapshot<Plan>
}) {
  const plansQuery =
    pageParam == null
      ? query(
          collection(db, COLLECTIONS.PLAN),
          where('creatorId', '==', userId),
          // where('joinedUsers', 'array-contains', userId),
          orderBy('departure_date', 'desc'),
          limit(4),
        )
      : query(
          collection(db, COLLECTIONS.PLAN),
          where('creatorId', '==', userId),
          // where('joinedUsers', 'array-contains', userId),
          orderBy('departure_date', 'desc'),
          startAfter(pageParam),
          limit(4),
        )

  const plansSnapshot = await getDocs(plansQuery)

  const plans = plansSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Plan,
  )

  const lastVisible = plansSnapshot.docs[plansSnapshot.docs.length - 1]

  return {
    plans,
    lastVisible,
  }
}

// 특정 여행계획 상세 조회
// @TODO: 공유받은 여행일정도 조회
export async function getPlan({
  planId,
  userId,
}: {
  planId: string
  userId: string
}) {
  const planQuery = query(
    collection(db, COLLECTIONS.PLAN),
    where('id', '==', planId),
    // where('joinedUsers', 'array-contains', userId),
    where('creatorId', '==', userId),
  )

  const planSnapshot = await getDocs(planQuery)

  const plan = planSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))[0]

  return {
    plan,
  }
}
