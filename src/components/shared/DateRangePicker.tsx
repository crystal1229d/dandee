import styled from '@emotion/styled'
import { DateRange, DayPicker } from 'react-day-picker'
import { ko } from 'date-fns/locale'
import {
  addDays,
  differenceInDays,
  format,
  isSameDay,
  parseISO,
} from 'date-fns'

import { colors } from '@styles/colorPalette'

interface DateRangePickerProps {
  startDate?: string
  endDate?: string
  onChange: (dateRange: { from?: string; to?: string; nights: number }) => void
}

function DateRangePicker({
  startDate,
  endDate,
  onChange,
}: DateRangePickerProps) {
  const today = new Date()

  const handleDayClick = (dateRange: DateRange | undefined) => {
    if (dateRange == null) {
      return null
    }

    const { from, to } = dateRange

    // 중복된 날짜
    if (from && to && isSameDay(from, to)) {
      return
    }

    onChange({
      from: from != null ? format(from, 'yyyy-MM-dd') : undefined,
      to: to != null ? format(to, 'yyyy-MM-dd') : undefined,
      nights: from && to ? differenceInDays(to, from) : 0,
    })
  }

  const selected = {
    from: startDate != null ? parseISO(startDate) : undefined,
    to: endDate != null ? parseISO(endDate) : undefined,
  }

  return (
    <Container>
      <DayPicker
        locale={ko}
        mode="range"
        defaultMonth={today}
        fromMonth={today}
        onSelect={handleDayClick}
        selected={selected}
        disabled={{
          before: addDays(new Date(), 1),
        }}
      />
    </Container>
  )
}

const Container = styled.div`
  .rdp-month {
    position: relative;
    width: 100%;
    text-align: center;
    padding: 100px 0px 30px;
  }

  .rdp-caption {
    width: 95%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    position: absolute;
    top: 25px;
    left: 20px;

    color: ${colors.black};
    font-weight: bold;
    font-size: 1.4rem;
    letter-spacing: 0.6rem;
  }

  .rdp-nav > button:first-of-type {
    margin-right: 15px;
    font-size: 1.3rem;
  }

  .rdp-table {
    width: 100%;
  }

  .rdp-head .rdp-head_row {
    font-size: 12px;
    height: 45px;
    color: ${colors.gray400};
    font-weight: bold;
  }

  .rdp-tbody .rdp-row {
    height: 45px;
  }

  .rdp-cell .rdp-button {
    position: relative;
    width: 100%;
    line-height: 45px;
  }

  .rdp-cell .rdp-button[disabled] {
    color: ${colors.gray200};
  }

  .rdp-day_selected {
    background-color: ${colors.blue100};
  }

  .rdp-cell .rdp-day_range_start,
  .rdp-cell .rdp-day_range_end {
    color: ${colors.white};
  }

  .rdp-cell .rdp-day_range_start::after,
  .rdp-cell .rdp-day_range_end::after {
    z-index: -1;
    display: block;
    width: calc(100% - 1px);
    height: 45px;
    position: absolute;
    top: 50%;
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: ${colors.blue};
    content: '';
  }
`

export default DateRangePicker
