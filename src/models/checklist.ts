export interface Checklist {
  id: string
  name: string
  type: 'DEFAULT_TEMPLATE' | 'CUSTOM_TEMPLATE' | 'SHARE_TEMPLATE'
  inUse: boolean
  userId: string
  createdAt: string
  usedAt: string

  categories?: ChecklistCategory[]
}

export interface ChecklistCategory {
  id: string
  name: string
  order?: number
  isExpanded?: boolean
  checklistId: string

  items?: ChecklistItem[]
}

export interface ChecklistItem {
  id: string
  name: string
  order?: number
  isChecked?: boolean
  categoryId: string
}

export interface ChecklistForm {
  name: string
  inUse: boolean
  categories?: ChecklistCategory[]
}
