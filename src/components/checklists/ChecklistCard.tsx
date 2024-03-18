import { css } from '@emotion/react'
import { format } from 'date-fns'

import { Checklist } from '@models/checklist'
import { colors } from '@styles/colorPalette'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Tag from '@shared/Tag'
import Spacing from '@shared/Spacing'
import { TAGS } from '@constants'

import { HiOutlineTrash } from 'react-icons/hi2'
import { size, spacing } from '@styles/sharedStyles'

function ChecklistCard({ checklist }: { checklist: Checklist }) {
  const { name, type, createdAt, usedAt } = checklist

  const handleDelete = () => {
    console.log('delete')
  }

  const tagComponent = () => {
    if (type == null) {
      return null
    }

    const { label, tagStyle } = TAGS[type]

    return (
      <div>
        <Tag
          color={tagStyle.fontColor}
          backgroundColor={tagStyle.backgroundColor}
        >
          {label}
        </Tag>
        <Spacing size={8} />
      </div>
    )
  }

  return (
    <Flex dir="column" justify="space-between" css={containerStyle}>
      <Flex dir="column">
        <Text typography="t4">{name}</Text>
        <Spacing size={8} />
        {tagComponent()}
      </Flex>
      <Flex dir="column">
        <Text typography="t7" color="gray400">
          생성 :{format(createdAt, 'yyyy-MM-dd')}
        </Text>
        <Text typography="t7" color="gray400">
          마지막 사용 : {format(usedAt, 'yyyy-MM-dd')}
        </Text>
      </Flex>
      <HiOutlineTrash
        fontSize={size.iconSize}
        css={useButtonStyle}
        onClick={handleDelete}
      />
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

const useButtonStyle = css`
  position: absolute;
  right: 50px;
  color: ${colors.gray800};
`

export default ChecklistCard
