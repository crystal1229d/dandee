import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import qs from 'qs'

import { useDialogContext } from '@contexts/DialogContext'

import { spacing } from '@styles/sharedStyles'
import { colors } from '@styles/colorPalette'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Spacing from '@shared/Spacing'
import { Itinerary } from '@/models/itinerary'
import { AiOutlineEllipsis } from 'react-icons/ai'

function ItineraryCard({ itinerary }: { itinerary: Itinerary }) {
  const { id, name, link, departure_date, arrival_date, total_days } = itinerary
  const { open } = useDialogContext()

  const params = qs.stringify({ itineraryId: id }, { addQueryPrefix: true })

  const handleClickUse = () => {
    open({
      title: ``,
      onConfirmClick: () => {
        console.log('사용해제')
      },
    })
  }

  return (
    <Flex dir="column" css={containerStyle}>
      {/* 템플릿 정보 */}
      <Link to={`/checklist/edit${params}`}>
        <Flex dir="column" gap={30}>
          <Flex dir="column">
            <Text typography="t4">{name}</Text>
            <Spacing size={8} />
          </Flex>
          <Flex dir="column">
            <Text typography="t7" color="gray400">
              {departure_date && `떠나는 날 : ${departure_date}`}
            </Text>
            <Text typography="t7" color="gray400">
              {arrival_date && `돌아오는 날 : ${arrival_date}`}
            </Text>
          </Flex>
        </Flex>
      </Link>

      <AiOutlineEllipsis />

      {/* 버튼그룹 */}
      {/* <Flex dir="column" gap={6} css={buttonGroupStyle}>
        <Button css={buttonStyle} onClick={handleClickUse}>
          사용하기
        </Button>
        <Button css={buttonStyle} onClick={() => {}}>
          삭제하기
        </Button>
      </Flex> */}
    </Flex>
  )
}

const containerStyle = css`
  height: 128px;
  margin: 0 ${spacing.pageLeftRight};
  padding: ${spacing.pageTopDown} ${spacing.pageLeftRight};
  background: ${colors.white};
  border: 2px solid ${colors.white};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    border: 2px solid ${colors.gray200};
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

export default ItineraryCard
