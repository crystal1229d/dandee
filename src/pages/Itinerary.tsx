import DateRangePicker from '@/components/shared/DateRangePicker'
import Flex from '@/components/shared/Flex'
import Spacing from '@/components/shared/Spacing'
import Text from '@/components/shared/Text'
import TextField from '@/components/shared/TextField'
import Title from '@/components/shared/Title'
import useItinerary from '@/hooks/itinerary/useItinerary'
import { Itinerary } from '@/models/itinerary'
import { colors } from '@/styles/colorPalette'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { parse } from 'qs'
import { useEffect, useState } from 'react'
import { IoCalendarOutline } from 'react-icons/io5'

function ItineraryPage() {
  const { itineraryId = '' } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    itineraryId: string
  }

  useEffect(() => {
    if (itineraryId == null) {
      window.history.back()
    }
  }, [itineraryId])

  const { data, isLoading } = useItinerary({ itineraryId }) as {
    data: Itinerary
    isLoading: boolean
  }

  console.log(data, isLoading)

  const [selectedDate, setSelectedDate] = useState<{
    startDate?: string
    endDate?: string
    nights: number
  }>({
    startDate: data?.departure_date,
    endDate: data?.arrival_date,
    nights: data?.total_days || 0,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div style={{ paddingBottom: '70px' }}>
      <Title
        title="여행계획"
        subTitle="여행일정, 경비관리, 체크리스트까지 한번에 쉽게 관리해보세요"
      />
      <Spacing size={10} />

      <Flex dir="column" gap={6} style={{ padding: '0 24px' }}>
        <form>
          <TextField
            required
            id="name"
            name="name"
            defaultValue={data.name}
            label="여행계획 이름"
            placeholder="하와이 가족여행"
            onChange={() => {}}
          />

          <Spacing size={12} />

          <CalendarButton>
            <IoCalendarOutline css={iconStyles} />
            <Text
              bold
            >{`${selectedDate.startDate} ~ ${selectedDate.endDate}`}</Text>
          </CalendarButton>

          <DateRangePicker
            startDate={selectedDate.startDate}
            endDate={selectedDate.endDate}
            onChange={(dateRange) => {
              setSelectedDate({
                startDate: dateRange.from,
                endDate: dateRange.to,
                nights: dateRange.nights,
              })
            }}
          />
        </form>
      </Flex>
    </div>
  )
}

const CalendarButton = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  padding: 7px 20px 7px 13px;
  border: 1px solid ${colors.gray700};
  border-radius: 7px;
  cursor: pointer;

  & > span {
    line-height: 1.5rem;
  }
`

const iconStyles = css`
  margin-right: 5px;
  font-size: 1.3rem;
  color: ${colors.gray600}'
  cursor: pointer;
`

export default ItineraryPage
