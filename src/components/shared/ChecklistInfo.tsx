import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { format } from 'date-fns'
import qs from 'qs'

import { TAGS } from '@constants'
import { Checklist } from '@models/checklist'

import { spacing } from '@styles/sharedStyles'
import { colors } from '@styles/colorPalette'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Tag from '@shared/Tag'
import Spacing from '@shared/Spacing'

function ChecklistInfo({ checklist }: { checklist: Checklist }) {
  const { id, name, type, inUse, createdAt, usedAt } = checklist

  const params = qs.stringify({ checklistId: id }, { addQueryPrefix: true })

  const tagComponent = () => {
    if (type == null) {
      return null
    }

    const { label, tagStyle } = TAGS[type]

    return (
      <Flex gap={6} align="center">
        <Tag
          color={tagStyle.fontColor}
          backgroundColor={tagStyle.backgroundColor}
        >
          {label}
        </Tag>
        <Spacing size={8} />
        {inUse && (
          <Tag
            color={TAGS['IN_USE'].tagStyle.fontColor}
            backgroundColor={TAGS['IN_USE'].tagStyle.backgroundColor}
          >
            {TAGS['IN_USE'].label}
          </Tag>
        )}
      </Flex>
    )
  }

  return (
    <Flex dir="column" css={containerStyle}>
      {/* 템플릿 정보 */}
      <Link to={`/checklist/edit${params}`}>
        <Flex dir="column" gap={30}>
          <Flex dir="column">
            <Text typography="t3" bold={true}>
              {name}
            </Text>
            <Spacing dir="vertical" size={6} />
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
        </Flex>
      </Link>
    </Flex>
  )
}

const containerStyle = css`
  height: 128px;
  margin: 0 ${spacing.pageLeftRight};
  padding: ${spacing.pageTopDown} ${spacing.pageLeftRight};
  border: 1px solid ${colors.gray200};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    border: 1px solid ${colors.gray500};
  }
`

export default ChecklistInfo
