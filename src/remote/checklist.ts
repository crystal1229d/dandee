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

export async function removeChecklist({
  checklistId,
}: {
  checklistId: string
}) {
  const checklistRef = doc(db, COLLECTIONS.CHECKLIST, checklistId)

  return deleteDoc(checklistRef)
}

export async function getChecklistWithCategoryAndItem({
  userId,
  checklistId,
}: {
  userId: string
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
