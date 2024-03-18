export interface Checklist {
  id: string
  name: string
  type: 'DEFAULT_TEMPLATE' | 'CUSTOM_TEMPLATE' | 'SHARE_TEMPLATE' | 'IN_USE'
  userId: string
  createdAt: Date
  usedAt: Date
}

export interface ChecklistCategory {
  id: string
  name: string
  order: number
  isFolded: boolean

  checklistId: string
}

export interface ChecklistItem {
  id: string
  categoryName: string
  name: string
  order: number
  isChecked: boolean

  checklistCategoryId: string
}
