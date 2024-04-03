import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { css } from '@emotion/react'

import useCheckChecklist from '@/hooks/checklist/useCheckChecklist'
import { ChecklistCategory } from '@models/checklist'

import Title from '@shared/Title'
import Flex from '@shared/Flex'
import ContentsButtonBar from '@shared/ContentsButtonBar'
import Checkbox from '@shared/Checkbox'
import Spacing from '@shared/Spacing'
import Accordion from '@shared/Accordion'
import Text from '@shared/Text'

import { colors } from '@styles/colorPalette'
import { spacing } from '@styles/sharedStyles'

function CheckListPage() {
  const {
    updatedChecklist: checklist,
    toggleCheck,
    toggleCheckAll,
    foldAll,
  } = useCheckChecklist()

  if (!checklist) {
    return null
  }

  console.log('checklist : ', checklist)

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

      <Flex align="center" gap={20} css={actionButtonContainer}>
        <Checkbox
          id="checkAll"
          text="전체 선택"
          onCheckChange={toggleCheckAll}
        />
        <Checkbox
          id="foldAll"
          text="카테고리 전체 접기"
          onCheckChange={foldAll}
        />
        <Checkbox id="changeMode" text="체크/편집 모드" />
      </Flex>

      <Spacing size={16} />

      <Flex dir="column">
        {checklist?.categories?.map((category: ChecklistCategory) => {
          const { id, name, isExpanded, items } = category
          return (
            <Fragment key={id}>
              <Accordion
                key={id}
                label={name}
                subLabel={<Text>{`0 / ${items?.length}`}</Text>}
                isExpanded={isExpanded}
              >
                {items?.map((item) => {
                  return (
                    <Fragment key={item.id}>
                      <Flex
                        align="center"
                        justify="space-between"
                        css={checklistItemStyles}
                      >
                        <Flex align="center" gap={4}>
                          <Checkbox
                            defaultChecked={item.isChecked}
                            checked={item.isChecked}
                            onCheckChange={() => toggleCheck(id, item.id)}
                          />
                          <Text css={textStyles}>{item.name}</Text>
                        </Flex>
                      </Flex>
                      <Spacing size={15} />
                    </Fragment>
                  )
                })}
                <Spacing size={15} />
              </Accordion>
              <Spacing size={16} />
            </Fragment>
          )
        })}
      </Flex>
    </div>
  )
}

const container = css`
  height: calc(100vh - 81px);
`

const actionButtonContainer = css`
  height: 65px;
  margin: 0 ${spacing.pageLeftRight};
  padding: 0 ${spacing.pageLeftRight};
  background: ${colors.white};
  border: 1px solid ${colors.gray200};
  border-radius: 10px;
`

const checklistItemStyles = css`
  padding: 7px 20px 7px 13px;
  border: 1px solid ${colors.gray300};
  border-radius: 15px;

  cursor: pointer;
`

const textStyles = css`
  border: none;
  font-weight: 300;
  line-height: 20px;
`

export default CheckListPage
