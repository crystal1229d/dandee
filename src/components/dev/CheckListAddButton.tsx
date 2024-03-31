import { collection, doc, writeBatch } from 'firebase/firestore'
import { db } from '@lib/firebase'

import { COLLECTIONS } from '@constants'
import { CHECKLISTS } from '@/mock/data'

import Button from '@shared/Button'

function CheckListAddButton() {
  const batch = writeBatch(db)

  const handleButtonClick = async () => {
    // checklists 데이터 만들기
    const checklists = CHECKLISTS.map((checklist, _) => {
      return {
        ...checklist,
      }
    })

    checklists.forEach((checklist) => {
      const checklistDocRef = doc(collection(db, COLLECTIONS.CHECKLIST))
      batch.set(checklistDocRef, checklist)
    })

    await batch.commit()

    /*
    checklists.forEach((checklist) => {
      // FIRESTORE DB 의 CHECKLIST COLLECTION 의 DOCUMENT REFERENCE(=DB의 특정 위치를 가리키는 객체) 생성
      // COLLECTION REFERENCE : COLLECTION 의 DOCUMENT 쿼리
      // DOCUMENT REFERENCE : 개별 DOCUMENT 를 읽거나 쓸 수 있음
      const checklistDocRef = doc(collection(db, COLLECTIONS.CHECKLIST))
      // 위에서 구한 REFERENCE 에 checklist 데이터 일괄쓰기(batched writes)
      batch.set(checklistDocRef, checklist)

      CHECKLIST_CATEGORY.forEach((category) => {
        // CHECKLIST COLLECTION 하위의 CHECKLIST_CATEGORY COLLECTION
        const categoryDocRef = doc(
          collection(checklistDocRef, COLLECTIONS.CHECKLIST_CATEGORY),
        )
        batch.set(categoryDocRef, category)

        CHECKLIST_ITEM.forEach((item) => {
          // @TODO : category_name 과 일치하는 아이템만 담기
          // CHECKLIST_CATEGORY COLLECTION 하위의 CHECKLIST_ITEM COLLECTION
          if (item.categoryName === category.name) {
            // 아이템의 categoryName과 카테고리 이름이 일치하는 경우에만 실행
            const itemDocRef = doc(
              collection(categoryDocRef, COLLECTIONS.CHECKLIST_ITEM),
            )
            batch.set(itemDocRef, item)
          }
        })
      })
    })

    // commit the batch
    await batch.commit()
    */

    alert('체크리스트 데이터가 생성되었습니다.')
  }

  return <Button onClick={handleButtonClick}>체크리스트 데이터 생성</Button>
}

export default CheckListAddButton
