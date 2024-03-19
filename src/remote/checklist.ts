import { COLLECTIONS } from '@/constants'
import { db } from '@/lib/firebase'
import { Checklist, ChecklistCategory, ChecklistItem } from '@/models/checklist'
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  QuerySnapshot,
  startAfter,
  updateDoc,
  where,
} from 'firebase/firestore'

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

export async function createChecklist(checklist: Omit<Checklist, 'id'>) {
  //
}

export async function updateChecklist({
  checklistId,
  newChecklist,
}: {
  checklistId: string
  newChecklist: Partial<Checklist>
}) {
  // 체크리스트 수정 : 카테고리, 아이템 수정 X / 체크리스트 이름 또는 사용여부만 변경 가능
  const checklistRef = doc(collection(db, COLLECTIONS.CHECKLIST), checklistId)
  return updateDoc(checklistRef, newChecklist)
}

export async function removeChecklist({
  checklistId,
}: {
  checklistId: string
}) {
  const checklistRef = doc(db, COLLECTIONS.CHECKLIST, checklistId)

  return deleteDoc(checklistRef)
}

export async function getChecklistWithCategoryAndItem({
  checklistId,
}: {
  checklistId: string
}) {
  const checklistSnapshot = await getDoc(
    doc(db, COLLECTIONS.CHECKLIST, checklistId),
  )
  const categorySnapshot = await getDoc(
    doc(checklistSnapshot.ref, COLLECTIONS.CHECKLIST_CATEGORY),
  )
  const itemSnapshot = await getDoc(
    doc(categorySnapshot.ref, COLLECTIONS.CHECKLIST_ITEM),
  )

  return {
    checklist: checklistSnapshot.data() as Checklist,
    category: categorySnapshot.data() as ChecklistCategory,
    item: itemSnapshot.data() as ChecklistItem,
  }
}
