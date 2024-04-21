import { useState } from 'react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import { IoCalendarOutline } from 'react-icons/io5'
import { colors } from '@styles/colorPalette'
import { zIndex } from '@styles/sharedStyles'
import DateRangePicker from '@shared/DateRangePicker'
import Spacing from '@shared/Spacing'
import Text from '@shared/Text'
import { getYoilOfDate } from '@/util/date'

interface DateRangePickerButtonProps {
  startDate?: string
  endDate?: string
  onSelectDate: (dateRange: {
    from?: string
    to?: string
    nights: number
  }) => void
}

function DateRangePickerButton({
  startDate,
  endDate,
  onSelectDate,
}: DateRangePickerButtonProps) {
  const [isCalendarOpen, setIsCalenderOpen] = useState(false)

  const buttonText =
    startDate && endDate
      ? `${startDate} ~ ${endDate}`
      : startDate
        ? `${startDate} ~ 미정`
        : endDate
          ? `미정 ~ ${endDate}`
          : '여행기간 미정'

  return (
    <>
      <CalendarButton onClick={() => setIsCalenderOpen((prev) => !prev)}>
        <IoCalendarOutline css={iconStyles} />
        <Text typography="t6" fontWeight={600}>
          {buttonText}
        </Text>
      </CalendarButton>

      {isCalendarOpen && (
        <CalendarContainer>
          <Header>
            <Text typography="t3" bold style={{ letterSpacing: '0.3rem' }}>
              날짜선택
            </Text>
            <Text
              typography="t5"
              fontWeight="lighter"
              css={closeButtonStyle}
              onClick={() => setIsCalenderOpen((prev) => !prev)}
            >
              닫기
            </Text>
          </Header>

          <Spacing size={20} />

          <Info>
            <DateInfo>
              <Text fontWeight={100}>가는날</Text>
              <Text bold>
                {startDate && (
                  <Text
                    bold
                  >{`${startDate} (${getYoilOfDate(startDate)})`}</Text>
                )}
              </Text>
            </DateInfo>
            <DateInfo>
              <Text fontWeight={100}>오는날</Text>
              <Text bold>
                {endDate && (
                  <Text bold>{`${endDate} (${getYoilOfDate(endDate)})`}</Text>
                )}
              </Text>
            </DateInfo>
            {/* <Text typography="t5" fontWeight="lighter" css={closeButtonStyle}>
              초기화
            </Text> */}
          </Info>

          <Spacing size={20} />

          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onChange={onSelectDate}
          />
        </CalendarContainer>
      )}
    </>
  )
}

const CalendarContainer = styled.div`
  width: 800px;
  max-width: 90vw;
  height: 670px;
  padding: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  overflow: hidden;
  z-index: ${zIndex.calendar};
  box-sizing: border-box;

  background-color: ${colors.white};
  border: 1px solid ${colors.gray600};
  border-radius: 8px;
`

const Header = styled.div`
  padding: 5px 0px 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${colors.gray200};
`

const closeButtonStyle = css`
  position: absolute;
  right: 20px;

  cursor: pointer;
`

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 5px 0px 20px 0;
  border-bottom: 1px solid ${colors.gray200};
`

const DateInfo = styled.div`
  padding: 10px 30px;
  border: 1px solid ${colors.gray300};
  border-radius: 10px;
  cursor: pointer;

  & > span:first-of-type {
    margin-right: 15px;
  }
`

const CalendarButton = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  padding: 7px 20px 7px 13px;
  border: 1px solid ${colors.gray900};
  border-radius: 7px;
  cursor: pointer;

  & > span {
    line-height: 1.8rem;
  }
`

const iconStyles = css`
  margin: 0 5px 2px 0;
  font-size: 1.3rem;
  color: ${colors.gray600}'
  cursor: pointer;
`

export default DateRangePickerButton
