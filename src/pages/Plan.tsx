import { useEffect, useState } from 'react'
import { parse } from 'qs'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import usePlan from '@hooks/plan/usePlan'
import { Plan } from '@models/plan'

import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Title from '@shared/Title'
import FixedBottomButton from '@shared/FixedBottomButton'
import BasicInfoSection from '@components/plan/BasicInfoSection'
import ItinerarySection from '@components/plan/ItinerarySection'
import ChecklistSection from '@components/plan/ChecklistSection'
import ExpenseSection from '@components/plan/ExpenseSection'

import { spacing } from '@styles/sharedStyles'
import { colors } from '@styles/colorPalette'

const SECTIONS = ['기본정보', '여행일정', '체크리스트', '예산/경비']
type Section = (typeof SECTIONS)[number]

function PlanPage() {
  const { planId = '' } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    planId: string
  }

  useEffect(() => {
    if (planId == null) {
      window.history.back()
    }
  }, [planId])

  const [selectedSection, setSelectedSection] = useState<Section>(SECTIONS[0])

  const { data, isLoading } = usePlan({ planId }) as {
    data: Plan
    isLoading: boolean
  }

  const [selectedDate, setSelectedDate] = useState<{
    startDate?: string
    endDate?: string
    nights: number
  }>({
    startDate: data?.departure_date,
    endDate: data?.arrival_date,
    nights: data?.total_days || 0,
  })

  const handleFormSubmit = async () => {
    alert('저장되었습니다')
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  const renderSectionContent = () => {
    switch (selectedSection) {
      case '기본정보':
        return (
          <BasicInfoSection
            data={data}
            selectedDate={selectedDate}
            onDateSelect={(dateRange) =>
              setSelectedDate({
                startDate: dateRange.from,
                endDate: dateRange.to,
                nights: dateRange.nights,
              })
            }
          />
        )
      case '여행일정':
        return <ItinerarySection data={data} />
      case '체크리스트':
        return <ChecklistSection checklistId={data.checklistId} />
      case '예산/경비':
        return <ExpenseSection />
      default:
        return null
    }
  }

  return (
    <div style={{ paddingBottom: '70px' }}>
      <Title
        title="여행계획"
        subTitle="여행일정, 경비관리, 체크리스트까지 한번에 쉽게 관리해보세요"
      />

      <Spacing size={10} />

      <Flex gap={15} align="center" css={actionButtonContainer}>
        {SECTIONS.map((section) => (
          <ActionButton
            key={section}
            onClick={() => setSelectedSection(section)}
            css={selectedSection === section ? selectedActionButton : undefined}
          >
            {section}
          </ActionButton>
        ))}
      </Flex>

      <Spacing size={20} />

      <Flex dir="column" gap={6} style={{ padding: '0 24px' }}>
        {renderSectionContent()}
      </Flex>

      <FixedBottomButton
        label="저장하기"
        disabled={false}
        onClick={handleFormSubmit}
      />
    </div>
  )
}

const actionButtonContainer = css`
  height: 65px;
  margin: 0 ${spacing.pageLeftRight};
  padding: 0 ${spacing.pageLeftRight};
  background: ${colors.white};
  border: 1px solid ${colors.gray200};
  border-radius: 10px;
`

const ActionButton = styled.button`
  padding: 10px 30px;
  background-color: ${colors.white};
  border: 1px solid ${colors.gray300};
  color: ${colors.gray900};
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
`

const selectedActionButton = css`
  background-color: ${colors.blue980};
  border: 1px solid ${colors.blue980};
  color: ${colors.white};
`

export default PlanPage
