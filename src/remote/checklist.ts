import { COLLECTIONS } from '@/constants'
import { db } from '@/lib/firebase'
import { Checklist, ChecklistCategory, ChecklistItem } from '@/models/checklist'
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
  startAfter,
  updateDoc,
  where,
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

// 체크리스트 생성
// 하위내역(카테고리, 아이템) 모두 추가
// @TODO: '사용중' 인 체크리스트 최소 0개, 최대1개만 존재 가능
export async function createChecklist({
  userId,
  checklist,
}: {
  userId: string
  checklist: Omit<Checklist, 'id'>
}) {
  try {
    // 체크리스트 생성
    const checklistRef = doc(db, COLLECTIONS.CHECKLIST)
    const newChecklist = {
      name: checklist.name,
      createdAt: checklist.createdAt,
      usedAt: checklist.usedAt,
      inUse: checklist.inUse,
      type: checklist.type,
      userId: userId,
    }
    await setDoc(checklistRef, newChecklist)

    const newChecklistId = checklistRef.id

    // 카테고리 생성
    checklist?.categories?.map(async (category) => {
      const categoryRef = doc(
        db,
        COLLECTIONS.CHECKLIST_CATEGORY,
        newChecklistId,
      )
      const newCategory = {
        checklistId: newChecklistId,
        name: category.name,
        isExpanded: false,
        order: category.order,
      }
      await setDoc(categoryRef, newCategory)

      const newCategoryId = categoryRef.id

      // 아이템 생성
      category.items?.map(async (item) => {
        const itemRef = doc(
          categoryRef,
          COLLECTIONS.CHECKLIST_ITEM,
          newCategoryId,
        )
        const newItem = {
          categoryId: newCategoryId,
          name: item.name,
          isChecked: false,
          order: item.order,
        }
        await setDoc(itemRef, newItem)
      })
    })
  } catch (error) {
    throw error
  }
}

// 체크리스트 수정
// 하위내역(카테고리, 아이템) 변경 X / 체크리스트 이름 또는 사용여부만 변경
export async function updateChecklist({
  checklistId,
  newChecklist,
}: {
  checklistId: string
  newChecklist: Partial<Checklist>
}) {
  // @TODO: '사용중' 인 체크리스트 최소 0개, 최대1개만 존재 가능
  const checklistRef = doc(collection(db, COLLECTIONS.CHECKLIST), checklistId)
  return updateDoc(checklistRef, newChecklist)
}

// 체크리스트 삭제
// 하위내역(카테고리, 아이템) 모두 삭제
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

    // 체크리스트에 속한 모든 카테고리를 조회
    const categoryQuery = query(
      collection(db, COLLECTIONS.CHECKLIST_CATEGORY),
      where('checklistId', '==', checklistId),
    )
    const categorySnapshot = await getDocs(categoryQuery)

    // 각 카테고리에 속한 모든 아이템을 삭제
    for (const categoryDoc of categorySnapshot.docs) {
      const categoryRef = categoryDoc.ref
      const itemQuery = query(
        collection(categoryRef, COLLECTIONS.CHECKLIST_ITEM),
      )
      const itemSnapshot = await getDocs(itemQuery)
      const deleteItemPromises = itemSnapshot.docs.map((itemDoc) =>
        deleteDoc(itemDoc.ref),
      )
      await Promise.all(deleteItemPromises)

      // 각 카테고리 삭제
      await deleteDoc(categoryRef)
    }

    // 체크리스트 삭제
    return deleteDoc(checklistRef)
  } catch (error) {
    throw error
  }
}

// 특정 체크리스트 상세 조회
// 하위내역 (카테고리, 아이템) 모두 조회
export async function getChecklist({
  checklistId,
  userId,
}: {
  checklistId: string
  userId: string
}) {
  const checklistRef = doc(db, COLLECTIONS.CHECKLIST, checklistId)
  const checklistQuery = query(
    collection(db, COLLECTIONS.CHECKLIST),
    where('id', '==', checklistId),
    where('userId', '==', userId),
  )
  const checklistSnapshot = await getDocs(checklistQuery)

  const categoryQuery = query(
    collection(checklistRef, COLLECTIONS.CHECKLIST_CATEGORY),
    where('checklistId', '==', checklistId),
    orderBy('order', 'asc'),
  )
  const categorySnapshot = await getDocs(categoryQuery)
  const categories: ChecklistCategory[] = []

  for (const doc of categorySnapshot.docs) {
    const categoryRef = doc.ref

    const itemQuery = query(
      collection(categoryRef, COLLECTIONS.CHECKLIST_ITEM),
      orderBy('order', 'asc'),
    )
    const itemSnapshot = await getDocs(itemQuery)
    const items: ChecklistItem[] = itemSnapshot.docs.map((itemDoc) => ({
      ...(itemDoc.data() as ChecklistItem),
    }))

    const category = {
      ...(doc.data() as ChecklistCategory),
      items: items,
    }

    categories.push(category)
  }

  const checklist = checklistSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
    categories: categories,
  }))[0]

  return {
    checklist,
  }
}
