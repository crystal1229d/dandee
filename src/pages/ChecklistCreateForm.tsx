import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useChecklist from '@hooks/checklist/useChecklist'
import { ChecklistForm } from '@models/checklist'

import Spacing from '@shared/Spacing'
import Title from '@shared/Title'
import Flex from '@shared/Flex'
import FixedBottomButton from '@shared/FixedBottomButton'
import BaseInfoForm from '@components/checklist-create-form/BaseInfoForm'
import CategoryForm from '@components/checklist-create-form/CategoryForm'

function ChecklistCreateFormPage() {
  const navigate = useNavigate()

  const { create } = useChecklist()

  const [tempForm, setTempForm] = useState<ChecklistForm>({
    name: '',
    inUse: false,
    categories: [],
  })

  const 저장가능한가 = true

  const handleFormSubmit = async () => {
    console.log(tempForm)
    await create(tempForm)
    alert('체크리스트 생성이 완료되었습니다')
    navigate(`/checklists`)
  }

  return (
    <div style={{ paddingBottom: '70px' }}>
      <Title
        title="체크리스트 만들기"
        subTitle="체크리스트를 내 여행계획에 맞게 만들어보세요"
      />
      <Spacing size={10} />

      <Flex dir="column">
        <form>
          <BaseInfoForm formData={tempForm} onFormDataChange={setTempForm} />
          <CategoryForm formData={tempForm} onFormDataChange={setTempForm} />
        </form>
      </Flex>

      <FixedBottomButton
        label="저장하기"
        disabled={!저장가능한가}
        onClick={handleFormSubmit}
      />
    </div>
  )
}

export default ChecklistCreateFormPage
