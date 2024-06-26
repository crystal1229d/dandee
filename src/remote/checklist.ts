import { COLLECTIONS } from '@/constants'
import { db } from '@/lib/firebase'
import { Checklist } from '@/models/checklist'
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

// 체크리스트 전체 목록 조회
export async function getChecklists({
  userId,
  pageParam,
}: {
  userId: string
  pageParam?: QuerySnapshot<Checklist>
}) {
  const checklistsQuery =
    pageParam == null
      ? query(
          collection(db, COLLECTIONS.CHECKLIST),
          where('userId', '==', userId),
          orderBy('usedAt', 'desc'),
          limit(4),
        )
      : query(
          collection(db, COLLECTIONS.CHECKLIST),
          where('userId', '==', userId),
          orderBy('usedAt', 'desc'),
          startAfter(pageParam),
          limit(4),
        )

  const checklistsSnapshot = await getDocs(checklistsQuery)

  const checklists = checklistsSnapshot.docs.map(
    (doc) =>
      ({
        id: doc.id,
        ...doc.data(),
      }) as Checklist,
  )

  const lastVisible =
    checklistsSnapshot.docs[checklistsSnapshot.docs.length - 1]

  return {
    checklists,
    lastVisible,
  }
}

// 체크리스트 생성 : 하위내역(카테고리, 아이템) 모두 추가
export async function createChecklist({
  checklist,
  userId,
}: {
  checklist: Partial<Checklist>
  userId: string
}) {
  try {
    const batch = writeBatch(db)

    // 1. 새로운 CHECKLIST 문서 생성
    const checklistCollectionRef = collection(db, COLLECTIONS.CHECKLIST)

    const newChecklistRef = doc(checklistCollectionRef)
    batch.set(newChecklistRef, {
      ...checklist,
      type: 'CUSTOM_TEMPLATE',
    })

    // 2. 생성한 문서에 id 필드 추가
    const checklistId = newChecklistRef.id

    const updatedChecklist = { ...checklist, id: checklistId }

    const updatedChecklistRef = doc(db, COLLECTIONS.CHECKLIST, checklistId)
    batch.set(updatedChecklistRef, updatedChecklist)

    // 3. '사용중'인 체크리스트 최소 0개, 최대1개만 존재 가능 => 다른 '사용중'인 체크리스트의 사용중 상태 해제
    if (checklist.inUse === true) {
      const inUseQuery = query(
        collection(db, COLLECTIONS.CHECKLIST),
        where('userId', '==', userId),
        where('inUse', '==', true),
      )
      const inUseSnapshot = await getDocs(inUseQuery)
      if (!inUseSnapshot.empty) {
        const inUseDoc = inUseSnapshot.docs[0]
        const inUseRef = doc(db, COLLECTIONS.CHECKLIST, inUseDoc.id)
        batch.update(inUseRef, { inUse: false })
      }
    }

    await batch.commit()

    return updatedChecklist
  } catch (error) {
    throw error
  }
}

// 체크리스트 수정 : 하위내역(카테고리, 아이템) 모두 변경
export async function updateChecklist({
  checklistId,
  userId,
  newChecklist,
}: {
  checklistId: string
  userId: string
  newChecklist: Partial<Checklist>
}) {
  const checklistQuery = query(
    collection(db, COLLECTIONS.CHECKLIST),
    where('id', '==', checklistId),
    where('userId', '==', userId),
  )
  const checklistSnapshot = await getDocs(checklistQuery)

  if (checklistSnapshot.empty) {
    throw new Error('해당하는 체크리스트를 찾을 수 없습니다.')
  }
  const checklistRef = checklistSnapshot.docs[0].ref

  if (newChecklist.inUse === true) {
    // '사용중'인 체크리스트 최소 0개, 최대1개만 존재 가능 => 다른 '사용중'인 체크리스트의 사용중 상태 해제
    const inUseQuery = query(
      collection(db, COLLECTIONS.CHECKLIST),
      where('userId', '==', userId),
      where('inUse', '==', true),
    )
    const inUseSnapshot = await getDocs(inUseQuery)
    if (!inUseSnapshot.empty) {
      const inUseRef = inUseSnapshot.docs[0].ref
      await updateDoc(inUseRef, { inUse: false })
    }
  }

  return updateDoc(checklistRef, newChecklist)
}

// 체크리스트 삭제 : 하위내역(카테고리, 아이템) 모두 삭제
export async function removeChecklist({
  checklistId,
  userId,
}: {
  checklistId: string
  userId: string
}) {
  try {
    const checklistQuery = query(
      collection(db, COLLECTIONS.CHECKLIST),
      where('id', '==', checklistId),
      where('userId', '==', userId),
    )
    const checklistSnapshot = await getDocs(checklistQuery)

    if (checklistSnapshot.empty) {
      throw new Error('해당하는 체크리스트를 찾을 수 없습니다.')
    }
    const checklistRef = checklistSnapshot.docs[0].ref

    return deleteDoc(checklistRef)
  } catch (error) {
    console.log(error)
    throw error
  }
}

// 특정 체크리스트 상세 조회 : 하위내역 (카테고리, 아이템) 모두 조회
export async function getChecklist({
  checklistId,
  userId,
}: {
  checklistId: string
  userId: string
}) {
  const checklistQuery = query(
    collection(db, COLLECTIONS.CHECKLIST),
    where('id', '==', checklistId),
    where('userId', '==', userId),
  )
  const checklistSnapshot = await getDocs(checklistQuery)

  const checklist = checklistSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))[0]

  return {
    checklist,
  }
}

// '사용중'인 체크리스트 상세 조회
export async function getChecklistInUse({ userId }: { userId: string }) {
  const checklistQuery = query(
    collection(db, COLLECTIONS.CHECKLIST),
    where('userId', '==', userId),
    where('inUse', '==', true),
  )
  const checklistSnapshot = await getDocs(checklistQuery)

  const checklist = checklistSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))[0]

  return {
    checklist,
  }
}
