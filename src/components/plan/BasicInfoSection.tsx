import { useForm } from 'react-hook-form'
import styled from '@emotion/styled'
import { differenceInDays } from 'date-fns'

import usePlan from '@hooks/plan/usePlan'
import { User } from '@/models/user'
import { Plan } from '@/models/plan'
import MembersList from '@components/plan/basicInfo/MembersList'

import { colors } from '@styles/colorPalette'
import TextField from '@shared/TextField'
import DateRangePickerButton from '@shared/DateRangePickerButton'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import FixedBottomButton from '@shared/FixedBottomButton'

type FormData = {
  [key: string]: string
}

interface BasicInfoSectionProps {
  data: Partial<Plan>
  planId: string
  selectedDate: {
    startDate?: string
    endDate?: string
    nights: number
  }
  onDateSelect: (dateRange: {
    from?: string
    to?: string
    nights: number
  }) => void
}

function BasicInfoSection({
  data,
  planId,
  selectedDate,
  onDateSelect,
}: BasicInfoSectionProps) {
  const joinedMembers: User[] | undefined = data.joinedUserInfo
  console.log(data.joinedUserInfo)

  const { update } = usePlan({ planId })

  const { register, handleSubmit, formState, setValue } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      name: data.name || '',
      headcount: String(data.headcount || 0),
      departure_date: selectedDate.startDate || '',
      arrival_date: selectedDate.endDate || '',
    },
  })

  const onSubmit = (formData: FormData) => {
    const newPlan = formData

    if (formData.arrival_date && formData.departure_date) {
      const nights =
        differenceInDays(
          new Date(formData.arrival_date),
          new Date(formData.departure_date),
        ) + 1
      newPlan.total_days = String(nights)
    }

    update({ planId, newPlan })
    alert('여행계획 기본정보가 수정되었습니다')
  }

  // @TODO: 날짜 바꿨을 때에도 가능하게
  const 저장가능한가 = !formState.isDirty || !formState.isValid

  return (
    <>
      <form>
        <TextField
          helpMessage={(formState.errors.name?.message as string) || ''}
          hasError={formState.errors.name != null}
          label="여행계획 이름"
          placeholder="하와이 가족여행"
          {...register('name', {
            required: '여행계획 이름을 입력하세요.',
          })}
        />

        <Spacing size={12} />

        <Text typography="t7">여행기간</Text>
        <DateRangePickerButton
          startDate={selectedDate.startDate}
          endDate={selectedDate.endDate}
          onSelectDate={(dateRange) => {
            setValue('departure_date', dateRange.from || '')
            setValue('arrival_date', dateRange.to || '')
            onDateSelect(dateRange)
          }}
        />

        <Spacing size={12} />

        <TextField
          required
          helpMessage={(formState.errors.headcount?.message as string) || ''}
          hasError={formState.errors.headcount != null}
          label="인원"
          placeholder="1"
          {...register('headcount', {
            pattern: {
              value: /^\d+$/,
              message: '숫자만 입력하세요.',
            },
          })}
        />

        <Spacing size={12} />

        <Text typography="t7">참여한 멤버</Text>
        <MembersList users={joinedMembers} />

        <Spacing size={12} />

        <ActionButton
          onClick={() => {
            alert('준비 중인 기능입니다')
          }}
        >
          공유하기
        </ActionButton>
      </form>

      <FixedBottomButton
        label="저장하기"
        disabled={저장가능한가}
        onClick={handleSubmit(onSubmit)}
      />
    </>
  )
}

const ActionButton = styled.button`
  height: 50px;
  padding: 10px 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  flex: 1;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray300};
  color: ${colors.gray900};
  border-radius: 5px;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.03),
    0 1px 2px rgba(0, 0, 0, 0.07);
  cursor: pointer;
`

export default BasicInfoSection
