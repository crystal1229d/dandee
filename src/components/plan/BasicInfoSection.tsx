import React from 'react'

import TextField from '@shared/TextField'
import DateRangePickerButton from '@shared/DateRangePickerButton'
import Spacing from '@shared/Spacing'

interface BasicInfoSectionProps {
  data: {
    name: string
  }
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
  selectedDate,
  onDateSelect,
}: BasicInfoSectionProps) {
  return (
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
        onSelectDate={onDateSelect}
      />
    </form>
  )
}

export default BasicInfoSection
