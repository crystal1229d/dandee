import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { css } from '@emotion/react'
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProps,
  DropResult,
} from 'react-beautiful-dnd'

import { ChecklistCategory, ChecklistForm } from '@/models/checklist'

import Accordion from '@shared/Accordion'
import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import Spacing from '@shared/Spacing'

import { BsTrash3 } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import { colors } from '@styles/colorPalette'
import { spacing } from '@styles/sharedStyles'

interface CategoryFormProps {
  formData: ChecklistForm
  onFormDataChange: React.Dispatch<React.SetStateAction<ChecklistForm>>
}

function CategoryForm({ formData, onFormDataChange }: CategoryFormProps) {
  const [newCategoryName, setNewCategoryName] = useState<string>('')
  const [newItemName, setNewItemName] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    if (formData && formData.categories) {
      const initialItemName: { [key: string]: string } = {}
      formData.categories.forEach((category) => {
        if (category.items) {
          category.items.forEach((item) => {
            initialItemName[item.id] = item.name
          })
        }
      })
      setNewItemName(initialItemName)
    }
  }, [formData])

  const handleAddCategory = useCallback(() => {
    if (newCategoryName === '') {
      return
    }

    const catLength = (formData?.categories?.length || 0) + 1
    const catId = `cat${catLength}`

    const newCategory = {
      id: catId,
      name: newCategoryName,
      order: catLength,
      isExpanded: true,
      checklistId: '',
      items: [],
    }
    const updatedCategories = [...(formData.categories || []), newCategory]

    setNewCategoryName('')

    onFormDataChange({
      ...formData,
      categories: updatedCategories,
    })
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

  const handleUpdateCategory = useCallback(
    (categoryId: string, newName: string) => {
      if (!formData.categories) {
        return
      }

      const updatedCategories = formData.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            name: newName,
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

  const handleAddItem = useCallback(
    (categoryId: string) => {
      if (newItemName[categoryId] === '' || !newItemName[categoryId]) {
        return
      }

      if (!formData.categories) {
        return
      }

      const updatedCategories = formData.categories.map((category) => {
        if (category.id === categoryId) {
          const updatedItems = category.items ? [...category.items] : []
          updatedItems.push({
            id: `${categoryId}_${updatedItems.length + 1}`,
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

      setNewItemName({ ...newItemName, [categoryId]: '' })

      onFormDataChange({
        ...formData,
        categories: updatedCategories,
      })
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
        if (e.isPropagationStopped()) return
        e.preventDefault()
        e.stopPropagation()

        handleAddCategory()
      }
    },
    [handleAddCategory],
  )

  const handleKeyPressOnItem = useCallback(
    async (e: React.KeyboardEvent, categoryId: string) => {
      if (e.key === 'Enter') {
        if (e.isPropagationStopped()) return
        e.preventDefault()
        e.stopPropagation()

        handleAddItem(categoryId)
      }
    },
    [handleAddItem],
  )

  const reorder = useCallback(
    (from: number, to: number) => {
      if (!formData.categories) {
        return
      }

      const updatedCategories = Array.from(formData.categories)
      const [removedCategory] = updatedCategories.splice(from, 1)
      updatedCategories.splice(to, 0, removedCategory)

      updatedCategories.forEach((category, index) => {
        category.order = index
      })

      onFormDataChange({
        ...formData,
        categories: updatedCategories,
      })
    },
    [formData, onFormDataChange],
  )

  const handleDragAndDrop = useCallback(
    (result: DropResult) => {
      if (result.destination == null) {
        return
      }

      const from = result.source.index
      const to = result.destination?.index

      reorder(from, to)
    },
    [reorder],
  )

  const renderedCategories = useMemo(() => {
    if (!formData || !formData.categories) {
      return null
    }

    return (
      <React.Fragment>
        <DragDropContext onDragEnd={handleDragAndDrop}>
          <StrictModeDroppable droppableId="category">
            {(droppableProps) => (
              <ul
                ref={droppableProps.innerRef}
                {...droppableProps.droppableProps}
              >
                {formData?.categories?.map(
                  (category: ChecklistCategory, index: number) => {
                    const { id, name, order, isExpanded, items } = category
                    return (
                      <Draggable
                        key={id}
                        draggableId={id}
                        index={order || index}
                      >
                        {(draggableProps) => (
                          <li
                            ref={draggableProps.innerRef}
                            {...draggableProps.draggableProps}
                            {...draggableProps.dragHandleProps}
                          >
                            <Accordion
                              key={id}
                              label={name}
                              subLabel={
                                <BsTrash3
                                  onClick={() => handleDeleteCategory(id)}
                                  size={19}
                                  css={iconStyles}
                                  style={{ marginLeft: '10px' }}
                                />
                              }
                              isExpanded={isExpanded}
                              onChangeLabel={(newName) =>
                                handleUpdateCategory(id, newName)
                              }
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
                                        value={newItemName[item.id]}
                                        css={textFieldStyles}
                                        onChange={(e) =>
                                          setNewItemName({
                                            ...newItemName,
                                            [item.id]: e.target.value,
                                          })
                                        }
                                        onBlur={(e) =>
                                          handleUpdateItem(
                                            category.id,
                                            item.id,
                                            e.target.value,
                                          )
                                        }
                                      />
                                      <BsTrash3
                                        onClick={() =>
                                          handleDeleteItem(id, item.id)
                                        }
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
                                  onKeyUp={(e) =>
                                    handleKeyPressOnItem(e, category.id)
                                  }
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
                          </li>
                        )}
                      </Draggable>
                    )
                  },
                )}
              </ul>
            )}
          </StrictModeDroppable>
        </DragDropContext>
      </React.Fragment>
    )
  }, [
    formData,
    handleDragAndDrop,
    newItemName,
    handleDeleteCategory,
    handleUpdateCategory,
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
      <Flex dir="column">{renderedCategories}</Flex>

      <Flex align="center" justify="space-between" css={newCategoryStyles}>
        <TextField
          id={`categories.${formData.categories?.length || 1}.name`}
          placeholder="새 카테고리명을 입력해주세요"
          value={newCategoryName}
          css={textFieldStyles}
          size={80}
          onChange={(e) => setNewCategoryName(e.target.value)}
          onKeyUp={(e) => handleKeyPressOnCategory(e)}
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

function StrictModeDroppable({ children, ...props }: DroppableProps) {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true))

    return () => {
      cancelAnimationFrame(animation)
      setEnabled(false)
    }
  }, [])

  if (enabled === false) {
    return null
  }

  return <Droppable {...props}>{children}</Droppable>
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
