import { Link } from 'react-router-dom'
import { css } from '@emotion/react'
import { format } from 'date-fns'
import qs from 'qs'

import { TAGS } from '@constants'
import { Checklist } from '@models/checklist'
import { useDialogContext } from '@contexts/DialogContext'

import { spacing } from '@styles/sharedStyles'
import { colors } from '@styles/colorPalette'
import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Tag from '@shared/Tag'
import Spacing from '@shared/Spacing'
import Button from '@shared/Button'
import useChecklist from '@hooks/checklist/useChecklist'

function ChecklistCard({ checklist }: { checklist: Checklist }) {
  const { id, name, type, inUse, createdAt, usedAt } = checklist
  const { open } = useDialogContext()
  const { update, remove } = useChecklist()

  const params = qs.stringify({ checklistId: id }, { addQueryPrefix: true })

  const handleClickUse = () => {
    open({
      title: `"${name}" 를 ${inUse ? '사용해제' : '사용'}하시겠습니까?`,
      onConfirmClick: () => {
        update({
          checklistId: id,
          newChecklist: { ...checklist, inUse: !inUse },
        })
      },
    })
  }

  const handleClickDelete = () => {
    open({
      title: `"${name}" 를 삭제하시겠습니까?`,
      onConfirmClick: () => {
        remove({ checklistId: id })
      },
    })
  }

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
            <Text typography="t4">{name}</Text>
            <Spacing size={8} />
            {tagComponent()}
          </Flex>
          <Flex dir="column">
            <Text typography="t7" color="gray400">
              생성 :{format(createdAt, 'yyyy-MM-dd')}
            </Text>
            <Text typography="t7" color="gray400">
              {usedAt && `마지막 사용 : ${format(usedAt, 'yyyy-MM-dd')}`}
            </Text>
          </Flex>
        </Flex>
      </Link>

      {/* 버튼그룹 */}
      <Flex dir="column" gap={6} css={buttonGroupStyle}>
        <Button css={buttonStyle} onClick={handleClickUse}>
          {inUse ? '사용해제' : '사용하기'}
        </Button>
        <Button css={buttonStyle} onClick={handleClickDelete}>
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

export default ChecklistCard
