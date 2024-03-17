import { Link } from 'react-router-dom'

import Title from '@shared/Title'
import Flex from '@shared/Flex'
import ContentsButtonBar from '@shared/ContentsButtonBar'
import Checkbox from '@shared/Checkbox'
import Spacing from '@shared/Spacing'
import { css } from '@emotion/react'

import { spacing } from '@styles/spacing'
import { colors } from '@styles/colorPalette'
import Accordion from '@/components/shared/Accordion'

function CheckListPage() {
  return (
    <div css={container}>
      <Title
        title="체크리스트"
        subTitle="여행지에서 난감하지 않게, 꼼꼼하게 챙겨보세요"
      />
      <Flex gap={4}>
        <ContentsButtonBar>
          <Link to="/checklists">체크리스트 관리</Link>
        </ContentsButtonBar>
        <ContentsButtonBar>
          <Link to="/checklists">체크리스트 불러오기</Link>
        </ContentsButtonBar>
      </Flex>
      <Spacing size={spacing.contentsGap} />
      <Flex align="center" css={actionButtonContainer}>
        <Checkbox onCheck={() => {}} text="전체 선택/해제" />
        <Checkbox onCheck={() => {}} text="체크/편집 모드" />
      </Flex>
      <Flex dir="column">
        <Accordion label="필수품">
          <div>hi</div>
          <div>hello</div>
        </Accordion>
      </Flex>
    </div>
  )
}

const container = css`
  height: calc(100vh - 81px);
  background: ${colors.gray100};
`

const actionButtonContainer = css`
  height: 65px;
  margin: 0 ${spacing.pageLeftRight};
  background: ${colors.white};
  border-radius: 10px;
`

export default CheckListPage
