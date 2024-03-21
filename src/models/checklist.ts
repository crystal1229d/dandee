export interface Checklist {
  id: string
  name: string
  type: 'DEFAULT_TEMPLATE' | 'CUSTOM_TEMPLATE' | 'SHARE_TEMPLATE'
  inUse: boolean
  userId: string
  createdAt: Date
  usedAt: Date

  categories?: ChecklistCategory[]
}

export interface ChecklistCategory {
  id: string
  name: string
  order?: number
  isFolded?: boolean
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

interface BaseForm {
  id: string
  label: string
  required: string
  helpMessage: string
}

interface TextFieldForm extends BaseForm {
  type: 'TEXT_FIELD'
}

interface CheckboxForm extends BaseForm {
  type: 'CHECKBOX'
  isChecked: boolean
}

export type ChecklistForm = TextFieldForm | CheckboxForm
export type ChecklistCategoryForm = TextFieldForm
export type ChecklistItemFrom = TextFieldForm
