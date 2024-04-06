import { Checklist } from '@models/checklist'

import Checkbox from '@shared/Checkbox'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import TextField from '@shared/TextField'
import React from 'react'

interface ChecklistFormProps {
  formData: Checklist
  onFormDataChange: React.Dispatch<React.SetStateAction<Checklist>>
}

function BaseInfoForm({ formData, onFormDataChange }: ChecklistFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    onFormDataChange((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleCheckboxClick = () => {
    onFormDataChange((prevData) => ({
      ...prevData,
      inUse: !prevData.inUse,
    }))
  }

  if (formData == null) {
    return null
  }

  return (
    <>
      <Flex dir="column" gap={6} style={{ padding: '0 24px' }}>
        <TextField
          required
          id="name"
          name="name"
          defaultValue={formData.name}
          label="체크리스트 이름"
          placeholder="하와이 가족여행"
          onChange={handleInputChange}
        />
        <Checkbox
          id="inUse"
          text="사용하기"
          isChecked={formData.inUse}
          onCheckChange={handleCheckboxClick}
        />
      </Flex>

      <Spacing dir="vertical" size={30} />
    </>
  )
}

export default BaseInfoForm
