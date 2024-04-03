import { useState, useEffect, useCallback } from 'react'
import { Checklist } from '@/models/checklist'
import useDetailedChecklistInUse from './useDetailedChecklistInUse'

function useCheckChecklist() {
  const { data, isLoading } = useDetailedChecklistInUse() as {
    data: Checklist
    isLoading: boolean
  }
  const [updatedChecklist, setUpdatedChecklist] = useState<Checklist>()

  const [isCheckAll, setIsCheckAll] = useState<boolean>(false)
  const [isExpandedAll, setIsExpandedAll] = useState<boolean>(true)

  useEffect(() => {
    if (data != null && !isLoading) {
      setUpdatedChecklist(data)
    }
  }, [data, isLoading])

  const toggleCheck = useCallback((categoryId: string, itemId: string) => {
    setUpdatedChecklist((prev) => {
      if (!prev) return prev
      if (!prev.categories) return prev

      const updatedCategories = prev.categories?.map((category) => {
        if (category.id === categoryId && category.items) {
          const updatedItems = category.items.map((item) => {
            if (item.id === itemId) {
              return { ...item, isChecked: !item.isChecked }
            }
            return item
          })

          const checkedItemCount = updatedItems.filter(
            (item) => item.isChecked,
          ).length

          console.log('체크된 아이템 개수 : ', checkedItemCount)

          return { ...category, items: updatedItems }
        }
        return category
      })

      return { ...prev, categories: updatedCategories }
    })
  }, [])

  const toggleCheckAll = useCallback(() => {
    setUpdatedChecklist((prev) => {
      if (!prev) return prev
      if (!prev.categories) return prev

      const updatedCategories = prev.categories.map((category) => {
        const updatedItems = category.items?.map((item) => {
          return { ...item, isChecked: !isCheckAll }
        })

        return { ...category, items: updatedItems }
      })
      return { ...prev, categories: updatedCategories }
    })

    setIsCheckAll((prev) => !prev)
  }, [isCheckAll])

  const foldAll = useCallback(() => {
    setUpdatedChecklist((prev) => {
      if (!prev) return prev
      if (!prev.categories) return prev

      const updatedCategories = prev.categories.map((category) => {
        return { ...category, isExpanded: !isExpandedAll }
      })

      return { ...prev, categories: updatedCategories }
    })

    setIsExpandedAll((prev) => !prev)
  }, [isExpandedAll])

  const saveUpdates = useCallback(() => {
    // @TODO: 저장 로직
  }, [])

  return {
    updatedChecklist,
    toggleCheck,
    toggleCheckAll,
    foldAll,
    saveUpdates,
  }
}

export default useCheckChecklist
