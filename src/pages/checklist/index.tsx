import { Fragment } from 'react'
import { Link, useNavigate } from 'react-router-dom'
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
import ChecklistInfo from '@shared/ChecklistInfo'

import { colors } from '@styles/colorPalette'
import { spacing } from '@styles/sharedStyles'
import FixedBottomButton from '@/components/shared/FixedBottomButton'
import useChecklist from '@/hooks/checklist/useChecklist'
import Button from '@/components/shared/Button'

function CheckListPage() {
  const navigate = useNavigate()
  const {
    data: checklist,
    checkedItemCount,
    isEdit,
    isCheckAll,
    isExpandedAll,
    isShowingUnchecked,
    toggleCheck,
    toggleCheckAll,
    foldAll,
    showUnCheckedItems,
    returnToInitialState,
  } = useCheckChecklist()

  const { update } = useChecklist()

  if (!checklist) {
    return null
  }

  const 수정되었는가 = isEdit

  const handleSave = async () => {
    if (!checklist || !checklist.id) {
      return
    }

    update({ checklistId: checklist.id, newChecklist: checklist })
    alert('체크리스트 수정이 완료되었습니다')
    navigate(`/checklist/edit?checklistId=${checklist.id}`)
  }

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

      <ChecklistInfo checklist={checklist} />

      <Spacing size={spacing.contentsGap} />

      <Flex align="center" gap={20} css={actionButtonContainer}>
        <Checkbox
          id="checkAll"
          text="전체 선택"
          isChecked={isCheckAll}
          onCheckChange={toggleCheckAll}
        />
        <Checkbox
          id="foldAll"
          text="전체 카테고리 접기"
          isChecked={isExpandedAll}
          onCheckChange={foldAll}
        />
        <Checkbox
          id="showUnChecked"
          text="못챙긴 항목만 보기"
          isChecked={isShowingUnchecked}
          onCheckChange={showUnCheckedItems}
        />
        <Button css={buttonStyle} onClick={returnToInitialState}>
          초기상태로 돌아가기
        </Button>

        {/* <Checkbox id="changeMode" text="체크/편집 모드" /> */}
      </Flex>

      <Spacing size={spacing.contentsGap} />

      <Flex dir="column" style={{ paddingBottom: '70px' }}>
        {checklist?.categories?.map((category: ChecklistCategory) => {
          const { id, name, isExpanded, items } = category
          return (
            <Fragment key={id}>
              <Accordion
                key={id}
                label={name}
                subLabel={
                  <Text>{`${checkedItemCount[id] || 0} / ${items?.length}`}</Text>
                }
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
                            isChecked={item.isChecked}
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

      <FixedBottomButton
        label="저장하기"
        disabled={!수정되었는가}
        onClick={handleSave}
      />
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

const buttonStyle = css`
  border: 1px solid ${colors.gray200};
  background-color: ${colors.white};
  color: ${colors.black};
  font-weight: 400;
  margin-left: auto;

  &:hover {
    background-color: ${colors.gray20};
    color: ${colors.blue980};
  }
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
