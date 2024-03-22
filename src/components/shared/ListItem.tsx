import { css, SerializedStyles } from '@emotion/react'

import { SlArrowRight } from 'react-icons/sl'

import Flex from '@shared/Flex'
import Text from '@shared/Text'
import Skeleton from '@shared/Skeleton'
import Spacing from '@shared/Spacing'

interface ListItemProps {
  left?: React.ReactNode
  contents: React.ReactNode
  right?: React.ReactNode
  withArrow?: boolean
  onClick?: () => void
  as?: 'div' | 'li'
  style?: SerializedStyles
}

function ListItem({
  as = 'li',
  left,
  contents,
  right,
  withArrow,
  onClick,
  style,
}: ListItemProps) {
  return (
    <Flex
      as={as}
      css={[listItemContainerStyles, style]}
      onClick={onClick}
      align="center"
    >
      {left && <Flex css={listItemLeftStyles}>{left}</Flex>}
      <Flex css={listItemContainerStyles}>{contents}</Flex>
      {right && <Flex>{right}</Flex>}
      {withArrow ? <SlArrowRight width={20} height={20} /> : null}
    </Flex>
  )
}

const listItemContainerStyles = css`
  padding: 8px 24px;
`

const listItemLeftStyles = css`
  margin-right: 14px;
`

const listItemContentsStyles = css`
  flex: 1;
`

function ListItemTexts({
  title,
  subTitle,
}: {
  title: React.ReactNode
  subTitle: React.ReactNode
}) {
  return (
    <Flex dir="column">
      <Text bold={true}>{title}</Text>
      <Text typography="t7">{subTitle}</Text>
    </Flex>
  )
}

function ListItemSkeleton() {
  return (
    <Flex as="li" css={listItemContainerStyles} align="center">
      <Flex css={listItemLeftStyles}></Flex>
      <Flex css={listItemContentsStyles}>
        <ListItem.Texts
          title={
            <>
              <Skeleton width={67} height={23} />
              <Spacing size={2} />
            </>
          }
          subTitle={<Skeleton width={85} height={20} />}
        />
      </Flex>
      <IconArrowRight />
    </Flex>
  )
}

function IconArrowRight() {
  return (
    <svg
      viewBox="0 0 96 96"
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
    >
      <title />
      <path d="M69.8437,43.3876,33.8422,13.3863a6.0035,6.0035,0,0,0-7.6878,9.223l30.47,25.39-30.47,25.39a6.0035,6.0035,0,0,0,7.6878,9.2231L69.8437,52.6106a6.0091,6.0091,0,0,0,0-9.223Z" />
    </svg>
  )
}

ListItem.Texts = ListItemTexts
ListItem.Skeleton = ListItemSkeleton

export default ListItem
