import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  QuerySnapshot,
  startAfter,
  updateDoc,
  where,
  writeBatch,
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

// 여행계획 생성
export async function createPlan({
  plan,
  userId,
}: {
  plan: Partial<Plan>
  userId: string
}) {
  try {
    const batch = writeBatch(db)

    // 1. 새로운 PLAN 문서 생성
    const planCollectionRef = collection(db, COLLECTIONS.PLAN)

    const newPlanRef = doc(planCollectionRef)
    batch.set(newPlanRef, {
      ...plan,
      type: 'CUSTOM_ITINERARY',
    })

    // 2. 생성한 문서에 id 필드 추가
    const planId = newPlanRef.id

    const updatedPlan = { ...plan, id: planId, creatorId: userId }
    const updatedPlanRef = doc(db, COLLECTIONS.PLAN, planId)
    batch.set(updatedPlanRef, updatedPlan)

    await batch.commit()

    return updatedPlan
  } catch (error) {
    throw error
  }
}

// 여행계획 수정
export async function updatePlan({
  planId,
  userId,
  newPlan,
}: {
  planId: string
  userId: string
  newPlan: Partial<Plan>
}) {
  const planQuery = query(
    collection(db, COLLECTIONS.PLAN),
    where('id', '==', planId),
    where('creatorId', '==', userId),
  )
  const planSnapshot = await getDocs(planQuery)

  if (planSnapshot.empty) {
    throw new Error('해당하는 여행계획을 찾을 수 없습니다.')
  }
  const planRef = planSnapshot.docs[0].ref

  return updateDoc(planRef, newPlan)
}

// 여행계획 삭제
// @TODO: 공유받은 여행일정도 삭제 가능하게
export async function removePlan({
  planId,
  userId,
}: {
  planId: string
  userId: string
}) {
  try {
    const planQuery = query(
      collection(db, COLLECTIONS.PLAN),
      where('id', '==', planId),
      where('creatorId', '==', userId),
    )
    const planSnapshot = await getDocs(planQuery)

    if (planSnapshot.empty) {
      throw new Error('해당하는 여행계획을 찾을 수 없습니다.')
    }
    const planRef = planSnapshot.docs[0].ref

    return deleteDoc(planRef)
  } catch (error) {
    console.log(error)
    throw error
  }
}
