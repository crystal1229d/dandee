import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import qs from 'qs'
import { differenceInDays, format, isPast } from 'date-fns'

import { Plan } from '@models/plan'
import { useDialogContext } from '@contexts/DialogContext'

import { spacing } from '@styles/sharedStyles'
import { colors } from '@styles/colorPalette'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import Tag from '@shared/Tag'
import Button from '@shared/Button'

function PlanCard({ plan }: { plan: Plan }) {
  const { id, name, departure_date, arrival_date, total_days } = plan
  const { open } = useDialogContext()

  const params = qs.stringify({ planId: id }, { addQueryPrefix: true })

  const handleClickShare = () => {
    open({
      title: ``,
      onConfirmClick: () => {
        console.log('공유하기')
      },
    })
  }

  const dDayTag = () => {
    // 출발일이 미래 : D-남은일자
    // 출발일이 과거, 도착일이 미래 : N일째 여행중

    if (!departure_date || !arrival_date) {
      return null
    }

    const 출발일 = new Date(departure_date)
    const 도착일 = new Date(arrival_date)

    if (isPast(출발일) && 도착일 > new Date()) {
      const 여행일수 = differenceInDays(new Date(), 출발일)
      return (
        <Tag color={colors.white} backgroundColor={colors.blue}>
          {`${여행일수}일째 여행중`}
        </Tag>
      )
    }

    if (isPast(출발일)) {
      return null // 출발일이 과거이고 이미 도착한 경우에는 아무것도 반환하지 않음
    }

    const today = new Date()
    const 디데이 = differenceInDays(출발일, today)

    return (
      <Tag color={colors.white} backgroundColor={colors.red}>
        {`D-${디데이}`}
      </Tag>
    )
  }

  return (
    <Flex dir="row" css={containerStyle}>
      <Link to={`/plan${params}`} style={{ flex: 1 }}>
        <Flex dir="column" gap={30}>
          <Flex dir="row" gap={10}>
            <Text typography="t4">{name}</Text>
            {dDayTag()}
          </Flex>
          <Spacing size={8} />

          <Flex dir="row" gap={10}>
            <Text typography="t7" color="gray600">
              {departure_date && `${format(departure_date, 'yyyy.MM.dd')} - `}
              {arrival_date && format(arrival_date, 'yyyy.MM.dd')}
            </Text>
            <Text typography="t7" color="gray600">
              {total_days && ` | ${total_days}일 일정`}
            </Text>
          </Flex>
        </Flex>
      </Link>

      <Flex dir="column" gap={6} css={buttonGroupStyle}>
        <Button css={buttonStyle} onClick={handleClickShare}>
          공유하기
        </Button>
        <Button css={buttonStyle} onClick={() => {}}>
          삭제하기
        </Button>
      </Flex>
    </Flex>
  )
}

const containerStyle = css`
  height: 128px;
  margin: 0 ${spacing.pageLeftRight};
  padding: ${spacing.pageTopDown} ${spacing.pageLeftRight};

  justify-content: space-between;

  background: ${colors.white};
  border: 1px solid ${colors.gray200};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    border: 1px solid ${colors.gray400};
  }
`

const buttonGroupStyle = css`
  position: absolute;
  right: 50px;
`

const buttonStyle = css`
  border: 1px solid ${colors.gray200};
  background-color: ${colors.white};
  color: ${colors.gray600};
  font-weight: 400;

  &:hover {
    background-color: ${colors.gray50};
  }
`

export default PlanCard
