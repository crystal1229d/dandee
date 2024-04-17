import { useEffect, useState } from 'react'
import { parse } from 'qs'

import useItinerary from '@hooks/itinerary/useItinerary'
import { Itinerary } from '@models/itinerary'

import DateRangePickerButton from '@shared/DateRangePickerButton'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import TextField from '@shared/TextField'
import Title from '@shared/Title'
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

          <DateRangePickerButton
            startDate={selectedDate.startDate}
            endDate={selectedDate.endDate}
            onSelectDate={(dateRange) => {
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

export default ItineraryPage
