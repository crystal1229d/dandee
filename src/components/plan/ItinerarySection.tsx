import { colors } from '@/styles/colorPalette'
import { spacing, zIndex } from '@/styles/sharedStyles'
import { getYoilOfDate } from '@/util/date'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Tab, Tabs } from '@mui/material'
import { addDays, format } from 'date-fns'
import { useEffect, useMemo, useState } from 'react'
import Flex from '../shared/Flex'
import Spacing from '../shared/Spacing'
import Text from '../shared/Text'
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
} from '@mui/lab'
import { Plan, Activity } from '@models/plan'

interface ItinerarySectionProps {
  data: {
    departure_date?: string
    arrival_date?: string
    total_days?: number
    plan?: Plan
  }
}

function ItinerarySection({ data }: ItinerarySectionProps) {
  const [selectedDay, setSelectedDay] = useState(0)
  const [loading, setLoading] = useState(false)
  const [itineraryOfTheDay, setItineraryOfTheDay] = useState<Activity[] | null>(
    null,
  )

  const handleChangeDay = (event: React.SyntheticEvent, day: number) => {
    setSelectedDay(day)
  }

  const { departure_date, arrival_date, total_days, plan } = data

  const dayList = useMemo(() => {
    if (!departure_date || !arrival_date) {
      return null
    }

    const startDate = new Date(departure_date)
    const endDate = new Date(arrival_date)
    const list = []
    let currentDate = startDate

    while (currentDate <= endDate) {
      const formattedDate = format(currentDate, 'MM.dd')
      const 요일 = getYoilOfDate(currentDate.toISOString())
      list.push(`${formattedDate} (${요일})`)
      currentDate = addDays(currentDate, 1)
    }

    return list
  }, [departure_date, arrival_date])

  useEffect(() => {
    const fetchItinerary = async () => {
      if (!plan) {
        return
      }

      if (!plan.itinerary) {
        return
      }

      setLoading(true)

      const selectedDayItinerary = plan.itinerary.find(
        (iti) => iti.day === selectedDay + 1,
      )

      if (selectedDayItinerary) {
        setItineraryOfTheDay(selectedDayItinerary.activities || null)
      } else {
        setItineraryOfTheDay(null)
      }

      setLoading(false)
    }

    fetchItinerary()

    // Cleanup function (optional)
    return () => {
      setLoading(false)
    }
  }, [plan, selectedDay])

  console.log('itineraryOfTheDay : ', selectedDay, itineraryOfTheDay)

  return (
    <Flex dir="column" gap={spacing.contentsGap}>
      <Text>{total_days}일 일정</Text>

      <TabsContainer>
        <Tabs
          value={selectedDay}
          onChange={handleChangeDay}
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {dayList?.map((day, index) => (
            <Tab
              key={index}
              css={dayCardStyle}
              label={
                <>
                  <Text>{index + 1}일 일정</Text>
                  <Text css={dayCardDateStyle}>{day}</Text>
                </>
              }
            ></Tab>
          ))}
        </Tabs>
      </TabsContainer>

      <Spacing size={20} />

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <TimelineContainer>
          <Timeline>
            {itineraryOfTheDay?.map((activity: Activity, idx: number) => (
              <TimelineItem key={idx}>
                {/* 시간 */}
                {activity.time && (
                  <TimelineOppositeContent>
                    {activity.time}
                  </TimelineOppositeContent>
                )}
                {/* 점 */}
                <TimelineSeparator>
                  <TimelineConnector />
                  <TimelineDot />
                  <TimelineConnector />
                </TimelineSeparator>
                {/* 액티비티 */}
                <TimelineContent>
                  <Text>{activity.activity}</Text>
                  {activity.description && <Text>{activity.description}</Text>}
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </TimelineContainer>
      )}
    </Flex>
  )
}

const TabsContainer = styled.div`
  width: 100%;

  .MuiTabs-root {
    height: 100px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .MuiTabs-flexContainer {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
  }

  .MuiButtonBase-root {
    width: 140px;
    height: 80px;
  }

  .MuiTabScrollButton-root {
    width: 40px;
    height: 40px;
    position: absolute;
    right: 15px;

    border: 1px solid ${colors.gray200};
    border-radius: 50%;
    background-color: ${colors.white};
    color: ${colors.gray700};
    opacity: 1;
    z-index: ${zIndex.multiTabScrollButton};

    box-shadow:
      0 1px 3px rgba(0, 0, 0, 0.12),
      0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

    &:first-of-type {
      left: 15px;
    }

    &:hover {
      color: ${colors.black};
    }
  }

  .Mui-selected {
    box-shadow:
      0 1px 3px rgba(0, 0, 0, 0.12),
      0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  }
`

const dayCardStyle = css`
  width: 300px;
  height: 100px;
  border: 1px solid ${colors.gray200};
  border-radius: 5px;
`

const dayCardDateStyle = css`
  color: ${colors.gray700};
  font-size: 0.9rem;
`

const TimelineContainer = styled.div`
  .MuiTimeline-root {
    margin: 0;
    padding: 0;
  }

  .MuiTimelineItem-root {
    min-height: 100px;
    margin: 0;
  }

  .MuiTimelineOppositeContent-root {
    height: auto;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 0.1;
    color: ${colors.gray900};
    font-size: 0.8rem;
  }

  .MuiTimelineDot-root {
    margin: 4px 15px 4px 10px;
    padding: 2px;
    background-color: ${colors.white};
    border: 8px solid ${colors.blue500};
    box-shadow: none;
    outline: none;
  }

  .MuiTimelineConnector-root {
    margin: 4px 15px 4px 10px;
    background-color: ${colors.blue200};
  }

  .MuiTimelineContent-root {
    min-height: 80px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    border: 1px solid ${colors.gray200};
    border-radius: 7px;
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.03),
      0 1px 1px rgba(0, 0, 0, 0.1);
  }
`

export default ItinerarySection
