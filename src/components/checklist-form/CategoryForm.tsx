import { Fragment, useCallback, useMemo, useState } from 'react'
import { css } from '@emotion/react'

import { Checklist, ChecklistCategory } from '@/models/checklist'

import Accordion from '@shared/Accordion'
import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import Spacing from '@shared/Spacing'

import { BsTrash3 } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import { colors } from '@styles/colorPalette'
import { spacing } from '@styles/sharedStyles'

interface CategoryFormProps {
  formData: Checklist
  onFormDataChange: React.Dispatch<React.SetStateAction<Checklist>>
}

function CategoryForm({ formData, onFormDataChange }: CategoryFormProps) {
  const [newCategoryName, setNewCategoryName] = useState<string>('')
  const [newItemName, setNewItemName] = useState<{ [key: string]: string }>({})

  // @TODO: handleUpdateCategory, handleUpateItem
  const handleAddCategory = useCallback(() => {
    if (newCategoryName === '') {
      return
    }

    const categoriesLength = formData?.categories?.length || 1

    const newCategory = {
      id: String(formData?.categories?.length || 1),
      name: newCategoryName,
      order: categoriesLength,
      isExpanded: false,
      checklistId: formData.id,
      items: [],
    }
    const updatedCategories = [...(formData.categories || []), newCategory]
    onFormDataChange({
      ...formData,
      categories: updatedCategories,
    })

    setNewCategoryName('')
  }, [formData, newCategoryName, onFormDataChange])
  const handleDeleteCategory = useCallback(
    (categoryId: string) => {
      if (!formData.categories) {
        return
      }

      const updatedCategories = formData.categories.filter(
        (category) => category.id !== categoryId,
      )
      onFormDataChange({
        ...formData,
        categories: updatedCategories,
      })
    },
    [formData, onFormDataChange],
  )
  const handleAddItem = useCallback(
    (categoryId: string) => {
      if (newItemName[categoryId] === '') {
        return
      }

      if (!formData.categories) {
        return
      }

      const updatedCategories = formData.categories.map((category) => {
        if (category.id === categoryId) {
          const updatedItems = category.items ? [...category.items] : []
          updatedItems.push({
            id: String(updatedItems.length + 1),
            name: newItemName[categoryId],
            order: updatedItems.length + 1,
            isChecked: false,
            categoryId: categoryId,
          })
          return {
            ...category,
            items: updatedItems,
          }
        }
        return category
      })
      onFormDataChange({
        ...formData,
        categories: updatedCategories,
      })

      setNewItemName({ ...newItemName, [categoryId]: '' })
    },
    [newItemName, formData, onFormDataChange],
  )
  const handleDeleteItem = useCallback(
    (categoryId: string, itemId: string) => {
      if (!formData.categories) {
        return
      }

      const updatedCategories = formData.categories.map((category) => {
        if (category.id === categoryId && category.items) {
          console.log(category.items, itemId)

          return {
            ...category,
            items: category.items.filter((item) => item.id !== itemId),
          }
        }
        return category
      })
      onFormDataChange({
        ...formData,
        categories: updatedCategories,
      })
    },
    [formData, onFormDataChange],
  )
  const handleUpdateItem = useCallback(
    (categoryId: string, itemId: string, modifiedItemName: string) => {
      if (!formData.categories) {
        return
      }

      const updatedCategories = formData?.categories?.map((category) => {
        if (category.id === categoryId && category.items) {
          const updatedItems = category.items.map((item) => {
            if (item.id === itemId) {
              return {
                ...item,
                name: modifiedItemName,
              }
            }
            return item
          })
          return {
            ...category,
            items: updatedItems,
          }
        }
        return category
      })
      onFormDataChange({
        ...formData,
        categories: updatedCategories,
      })
    },
    [formData, onFormDataChange],
  )

  const handleKeyPressOnCategory = useCallback(
    async (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
        handleAddCategory()
      }
    },
    [handleAddCategory],
  )
  const handleKeyPressOnItem = useCallback(
    async (e: React.KeyboardEvent, categoryId: string) => {
      if (e.key === 'Enter') {
        handleAddItem(categoryId)
      }
    },
    [handleAddItem],
  )

  const renderedCategories = useMemo(() => {
    if (!formData || !formData.categories) {
      return null
    }

    return formData?.categories?.map((category: ChecklistCategory) => {
      const { id, name, isExpanded, items } = category
      return (
        <Flex dir="column" key={id}>
          <Accordion
            label={name}
            subLabel={
              <BsTrash3
                onClick={() => handleDeleteCategory(id)}
                size={19}
                css={iconStyles}
                style={{ marginLeft: '10px' }}
              />
            }
            isExpanded={!isExpanded}
          >
            {items?.map((item) => {
              return (
                <Fragment key={item.id}>
                  <Flex
                    align="center"
                    justify="space-between"
                    css={checklistItemStyles}
                  >
                    <TextField
                      placeholder={item.name}
                      value={newItemName[item.id] || item.name}
                      css={textFieldStyles}
                      onChange={(e) =>
                        setNewItemName({
                          ...newItemName,
                          [item.id]: e.target.value,
                        })
                      }
                      onBlur={(e) =>
                        handleUpdateItem(category.id, item.id, e.target.value)
                      }
                    />
                    <BsTrash3
                      onClick={() => handleDeleteItem(id, item.id)}
                      size={19}
                      css={iconStyles}
                    />
                  </Flex>
                  <Spacing size={15} />
                </Fragment>
              )
            })}
            <Flex
              align="center"
              justify="space-between"
              css={checklistItemStyles}
            >
              <TextField
                placeholder="새 아이템명을 입력해주세요"
                value={newItemName[category.id] || ''}
                css={textFieldStyles}
                size={80}
                onChange={(e) =>
                  setNewItemName({
                    ...newItemName,
                    [category.id]: e.target.value,
                  })
                }
                onKeyDown={(e) => handleKeyPressOnItem(e, category.id)}
              />
              <AiOutlinePlus
                onClick={() => handleAddItem(category.id)}
                size={19}
                css={iconStyles}
              />
            </Flex>
            <Spacing size={15} />
          </Accordion>
          <Spacing size={16} />
        </Flex>
      )
    })
  }, [
    formData,
    newItemName,
    handleDeleteCategory,
    handleUpdateItem,
    handleDeleteItem,
    handleKeyPressOnItem,
    handleAddItem,
  ])

  if (formData == null) {
    return null
  }

  return (
    <>
      {renderedCategories}
      <Flex align="center" justify="space-between" css={newCategoryStyles}>
        <TextField
          id={`categories.${formData.categories?.length || 1}.name`}
          placeholder="새 카테고리명을 입력해주세요"
          value={newCategoryName}
          css={textFieldStyles}
          size={80}
          onChange={(e) => setNewCategoryName(e.target.value)}
          onKeyDown={(e) => handleKeyPressOnCategory(e)}
        />
        <AiOutlinePlus
          onClick={() => handleAddCategory()}
          size={19}
          css={iconStyles}
        />
      </Flex>
    </>
  )
}

const checklistItemStyles = css`
  padding: 5px 20px 5px 0;
  border: 1px solid ${colors.gray300};
  border-radius: 10px;

  cursor: pointer;
`

const textFieldStyles = css`
  border: none;
  font-weight: 300;
`

const iconStyles = css`
min-width: 19px;
  color: ${colors.gray500}'
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`

const newCategoryStyles = css`
  margin: 0 ${spacing.pageLeftRight};
  padding: 10px 25px 10px 10px;
  background: ${colors.white};
  border: 1px solid ${colors.gray200};
  border-radius: 10px;

  &:hover {
    border: 1px solid ${colors.gray500};
  }
`

export default CategoryForm
