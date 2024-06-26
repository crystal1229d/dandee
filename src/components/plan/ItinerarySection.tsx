import { useEffect, useMemo, useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { addDays, format } from 'date-fns'

import { Tab, Tabs } from '@mui/material'
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
import { ITINERARY_TAGS } from '@constants'
import { getYoilOfDate } from '@/util/date'
import { useModalContext } from '@contexts/ModalContext'

import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import Tag from '@shared/Tag'
import TextField from '@shared/TextField'
import Map from '@shared/Map'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoMdPin } from 'react-icons/io'

import { colors } from '@styles/colorPalette'
import { zIndex } from '@styles/sharedStyles'
import SearchLocation from '../shared/SearchLocation'

const ACTION_BUTTONS = ['교통 추가', '할일 추가']

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
  const { open } = useModalContext()

  const handleChangeDay = (event: React.SyntheticEvent, day: number) => {
    setSelectedDay(day)
  }

  const handleClickAddAcitivity = () => {
    open({
      title: '할일 추가',
      contents: (
        <Flex dir="column" style={{ height: '100%', padding: '20px 0' }}>
          <TextField
            required
            id="time"
            name="time"
            defaultValue=""
            label="시간"
            placeholder="11:00"
            onChange={() => {}}
          />
          <Spacing size={8} />
          <Text typography="t7">태그</Text>
          <Flex
            style={{
              border: `1px solid ${colors.gray900}`,
              borderRadius: '7px',
              padding: '12px',
            }}
          >
            {tagComponent(Object.keys(ITINERARY_TAGS))}
          </Flex>
          <Spacing size={8} />
          체크리스트 선택한 경우 : 체크리스트에서 특정 항목들 가져오기
          (+바로가기 링크)
          <Spacing size={8} />
          경비/예산 선택한 경우 : 경비/예산에서 특정 항목들 가져오기 (+바로가기
          링크)
          <Spacing size={8} />
          <TextField
            required
            id="activity"
            name="activity"
            defaultValue=""
            label="할일"
            placeholder="브런치 먹기"
            onChange={() => {}}
          />
          <Spacing size={8} />
          <TextField
            id="description"
            name="description"
            defaultValue=""
            label="상세설명"
            placeholder="커피와 토스트"
            onChange={() => {}}
          />
          <Spacing size={8} />
          <TextField
            id="location"
            name="location"
            defaultValue=""
            label="위치"
            placeholder=""
            onChange={() => {}}
          />
          <Spacing size={8} />
          <SearchLocation />
          {/* 사진 / 파일 / 링크 */}
        </Flex>
      ),
      onConfirm: () => {
        console.log('확인')
      },
    })
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

    return () => {
      setLoading(false)
    }
  }, [plan, selectedDay])

  const tagComponent = (tags: string[]) => {
    if (!tags || tags.length === 0) {
      return null
    }

    return (
      <Flex gap={10}>
        {tags.map((tag) => {
          const tagInfo = ITINERARY_TAGS[tag]

          if (tagInfo) {
            const { label, tagStyle } = tagInfo

            return (
              <Tag
                key={tag}
                color={tagStyle.fontColor}
                backgroundColor={tagStyle.backgroundColor}
                style={{ fontSize: '0.8rem', cursor: 'pointer' }}
              >
                {label}
              </Tag>
            )
          }

          return null
        })}
      </Flex>
    )
  }

  const renderMap = () => {
    if (
      !itineraryOfTheDay ||
      !itineraryOfTheDay.some((activity) => activity.location)
    ) {
      return null
    }

    const firstActivityWithLocation = itineraryOfTheDay.find(
      (activity) => activity.location?.pointGeolocation,
    )

    if (!firstActivityWithLocation) {
      return null
    }

    const pointGeolocation =
      firstActivityWithLocation.location?.pointGeolocation

    if (!pointGeolocation) {
      return null
    }

    const { lng, lat } = pointGeolocation

    const markers = itineraryOfTheDay
      ?.map((activity) => {
        const { location } = activity
        if (!location) return null
        const { lng, lat } = location.pointGeolocation
        return { lat, lng }
      })
      .filter((marker) => marker !== null) as google.maps.LatLngLiteral[]

    return <Map center={{ lat, lng }} zoom={15} markers={markers} />
  }

  return (
    <Flex dir="column">
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
                  <Text>{index + 1}일차</Text>
                  <Text css={dayCardDateStyle}>{day}</Text>
                </>
              }
            ></Tab>
          ))}
        </Tabs>
      </TabsContainer>

      {renderMap()}

      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <TimelineContainer>
          <Timeline>
            {itineraryOfTheDay?.map((activity: Activity, idx: number) => (
              <TimelineItem key={idx}>
                <TimelineOppositeContent>
                  {activity.time}
                </TimelineOppositeContent>

                <TimelineSeparator>
                  <TimelineConnector
                    style={{ visibility: idx === 0 ? 'hidden' : 'visible' }}
                  />
                  <TimelineDot />
                  <TimelineConnector
                    style={{
                      visibility:
                        idx === itineraryOfTheDay.length - 1
                          ? 'hidden'
                          : 'visible',
                    }}
                  />
                </TimelineSeparator>

                <TimelineContent>
                  <Flex dir="column" style={{ width: '100%' }}>
                    {tagComponent(activity.tag || [])}
                    <Spacing size={8} />
                    <Text typography="t4" fontWeight={500}>
                      {activity.activity}
                    </Text>
                    {activity.description && (
                      <Text typography="t6" color="gray500">
                        {activity.description}
                      </Text>
                    )}
                    {activity.location && (
                      <>
                        <Spacing size={8} />
                        <Flex
                          align="center"
                          gap={3}
                          style={{
                            borderTop: `1px solid ${colors.gray200}`,
                            paddingTop: '10px',
                          }}
                        >
                          <IoMdPin color={colors.gray600} />
                          <Text typography="t7" color="gray600">
                            {`${activity.location.name} | ${activity.location.address}`}
                          </Text>
                        </Flex>
                      </>
                    )}
                  </Flex>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </TimelineContainer>
      )}

      <Spacing size={10} />

      <Flex gap={15} align="center">
        {ACTION_BUTTONS.map((section) => (
          <ActionButton key={section} onClick={handleClickAddAcitivity}>
            <AiOutlinePlus />
            {section}
          </ActionButton>
        ))}
      </Flex>
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
    gap: 0;
  }

  .MuiTimelineItem-root {
    min-height: 100px;
    margin: 0;
  }

  .MuiTimelineOppositeContent-root {
    height: auto;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: 0.07;
    color: ${colors.gray800};
    font-size: 0.8rem;
  }

  .MuiTimelineDot-root {
    margin: 0 15px 0 5px;
    padding: 2px;
    background-color: ${colors.white};
    border: 8px solid ${colors.blue500};
    box-shadow: none;
    outline: none;
    cursor: pointer;
  }

  .MuiTimelineConnector-root {
    margin: 0 15px 0 5px;
    background-color: ${colors.blue200};
  }

  .MuiTimelineContent-root {
    min-height: 80px;
    margin: 10px 0;
    padding: 15px 20px 15px 20px;
    display: flex;
    align-items: center;
    border: 1px solid ${colors.gray200};
    border-radius: 7px;
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.03),
      0 1px 1px rgba(0, 0, 0, 0.1);
  }
  cursor: pointer;
`

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

export default ItinerarySection
