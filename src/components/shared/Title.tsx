import { css } from '@emotion/react'

import { spacing } from '@/styles/spacing'
import Flex from '@shared/Flex'
import Text from '@shared/Text'

interface TitleProps {
  title: string
  subTitle: string
}

function Title({ title, subTitle }: TitleProps) {
  return (
    <Flex dir="column" gap={4} css={containerStyle}>
      <Text bold={true} typography="t4">
        {title}
      </Text>
      <Text typography="t7" color="gray700">
        {subTitle}
      </Text>
    </Flex>
  )
}

const containerStyle = css`
  padding: ${spacing.pageTopDown};
`

export default Title
