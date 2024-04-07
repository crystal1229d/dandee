import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { parse } from 'qs'

import useChecklist from '@hooks/checklist/useChecklist'
import useChecklistInDetail from '@/components/checklist/hooks/useChecklistInDetail'

import { Checklist } from '@models/checklist'

import Spacing from '@shared/Spacing'
import Title from '@shared/Title'
import Flex from '@shared/Flex'
import FixedBottomButton from '@shared/FixedBottomButton'
import BaseInfoForm from '@components/checklist-form/BaseInfoForm'
import CategoryForm from '@components/checklist-form/CategoryForm'

function ChecklistEditFormPage() {
  const navigate = useNavigate()

  const { checklistId = '' } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    checklistId: string
  }

  useEffect(() => {
    if (checklistId == null) {
      window.history.back()
    }
  }, [checklistId])

  const { update } = useChecklist()

  const { data, isLoading } = useChecklistInDetail({ checklistId }) as {
    data: Checklist
    isLoading: boolean
  }

  const [tempForm, setTempForm] = useState<Checklist>(data)
  useEffect(() => {
    if (!isLoading && data !== null) {
      setTempForm(data)
    }
  }, [data, isLoading])

  const 저장가능한가 = true

  const handleFormSubmit = async () => {
    update({ checklistId, newChecklist: tempForm })
    alert('체크리스트 수정이 완료되었습니다')
    navigate(`/checklist/edit?checklistId=${checklistId}`)
  }

  return (
    <div style={{ paddingBottom: '70px' }}>
      <Title
        title="체크리스트 편집"
        subTitle={'체크리스트를 내 여행계획에 맞게 편집해보세요'}
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

export default ChecklistEditFormPage
