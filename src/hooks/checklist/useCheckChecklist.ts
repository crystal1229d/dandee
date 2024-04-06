import { useState, useEffect, useCallback } from 'react'
import { Checklist } from '@/models/checklist'
import useDetailedChecklistInUse from './useDetailedChecklistInUse'

function useCheckChecklist() {
  const { data, isLoading } = useDetailedChecklistInUse() as {
    data: Checklist
    isLoading: boolean
  }

  const [updatedChecklist, setUpdatedChecklist] = useState<Checklist>()
  const [visibleChecklist, setVisibleChecklist] = useState<Checklist>()
  const [checkedItemCount, setCheckedItemCount] = useState<{
    [categoryId: string]: number
  }>({})

  const [isEdit, setIsEdit] = useState(false)
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false)
  const [isExpandedAll, setIsExpandedAll] = useState<boolean>(false)
  const [isShowingUnchecked, setIsShowingUnchecked] = useState<boolean>(false)
  // @TODO: 편집/체크모드 ?
  // @TODO: 여러 개가 체크됐을 경우 ? (예: 못챙긴 항목만 보기 => 전체 선택 시 못챙긴항목 체크해제?)

  useEffect(() => {
    if (data != null && !isLoading) {
      setUpdatedChecklist(data)
      setVisibleChecklist(data)

      const initialCheckedItemCount: { [categoryId: string]: number } = {}
      data.categories?.forEach((category) => {
        const checkedItemsCount =
          category.items?.filter((item) => item.isChecked).length ?? 0
        initialCheckedItemCount[category.id] = checkedItemsCount
      })

      setCheckedItemCount(initialCheckedItemCount)
    }
  }, [data, isLoading])

  const toggleCheck = useCallback((categoryId: string, itemId: string) => {
    setIsEdit(true)

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

          const checkedItemCnt = updatedItems.filter(
            (item) => item.isChecked,
          ).length

          setCheckedItemCount((prevCounts) => ({
            ...prevCounts,
            [categoryId]: checkedItemCnt,
          }))

          return { ...category, items: updatedItems }
        }
        return category
      })

      return { ...prev, categories: updatedCategories }
    })
  }, [])

  const toggleCheckAll = useCallback(() => {
    setIsEdit(true)

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
    setIsEdit(true)

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

  const showUnCheckedItems = useCallback(() => {
    setVisibleChecklist((prev) => {
      if (!prev) return prev
      if (!prev.categories) return prev

      if (!isShowingUnchecked) {
        const updatedCategories = prev.categories.map((category) => {
          const updatedItems = category.items?.filter(
            (item) => item.isChecked === false,
          )
          return { ...category, items: updatedItems }
        })
        return { ...prev, categories: updatedCategories }
      } else {
        return updatedChecklist
      }
    })

    setIsShowingUnchecked((prev) => !prev)
  }, [isShowingUnchecked, updatedChecklist])

  const returnToInitialState = () => {
    setUpdatedChecklist(data)
    setVisibleChecklist(data)

    const initialCheckedItemCount: { [categoryId: string]: number } = {}
    data.categories?.forEach((category) => {
      const checkedItemsCount =
        category.items?.filter((item) => item.isChecked).length ?? 0
      initialCheckedItemCount[category.id] = checkedItemsCount
    })

    setCheckedItemCount(initialCheckedItemCount)

    setIsCheckAll(false)
    setIsExpandedAll(false)
    setIsShowingUnchecked(false)

    return data
  }

  return {
    data: isShowingUnchecked ? visibleChecklist : updatedChecklist,
    checkedItemCount,
    isEdit,
    isCheckAll,
    isExpandedAll,
    isShowingUnchecked,
    toggleCheck,
    toggleCheckAll,
    foldAll,
    showUnCheckedItems,
    returnToInitialState,
  }
}

export default useCheckChecklist
