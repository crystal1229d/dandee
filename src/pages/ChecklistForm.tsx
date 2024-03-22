import { useEffect } from 'react'
import qs from 'qs'
import { css } from '@emotion/react'

import { colors } from '@styles/colorPalette'
import useChecklist from '@components/checklist/hooks/useChecklist'
import Spacing from '@shared/Spacing'
import Title from '@shared/Title'
import Flex from '@shared/Flex'
import Checkbox from '@shared/Checkbox'
import Accordion from '@shared/Accordion'
import TextField from '@shared/TextField'

import { BsTrash3 } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import FixedBottomButton from '@/components/shared/FixedBottomButton'

function ChecklistFormPage() {
  const { checklistId = '' } = qs.parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    checklistId: string
  }

  useEffect(() => {
    if (checklistId === '') {
      window.history.back()
    }
  }, [checklistId])

  const { data, isLoading } = useChecklist({ checklistId })

  if (data == null || isLoading) {
    return null
  }

  const { checklist } = data

  console.log('checklist : ', checklist)

  const 저장가능한가 = true

  const handleCheckUse = () => {
    // 사용하기
  }

  const handleSubmit = () => {
    // 생성 or 수정
  }

  const buttonLabel = checklistId === '' ? `생성하기` : `편집하기`
  const pageTitle = checklistId === '' ? `생성` : `편집`

  const AccordionSubLabel = () => {
    return (
      <BsTrash3 size={19} css={iconStyles} style={{ marginLeft: '10px' }} />
    )
  }

  return (
    <div>
      <Title
        title={`체크리스트 ${pageTitle}`}
        subTitle={`체크리스트를 내 여행계획에 맞게 ${pageTitle}해보세요`}
      />
      <Spacing size={10} />

      <Flex dir="column">
        <form>
          <Flex dir="column" gap={6} style={{ padding: '0 24px' }}>
            <TextField
              required
              label="체크리스트 이름"
              placeholder="하와이 가족여행"
              defaultValue=""
              hasError={false}
              helpMessage={false && '이름을 입력해주세요'}
            />
            <Checkbox checked={false} onCheck={() => {}} text="사용하기" />
          </Flex>

          <Spacing dir="vertical" size={30} />

          {checklist?.categories?.map((category) => {
            const { id, name, order, isExpanded, items } = category
            return (
              <Flex dir="column" key={id}>
                <Accordion
                  label={name}
                  subLabel={AccordionSubLabel()}
                  isExpanded={!isExpanded}
                >
                  {items?.map((item) => {
                    return (
                      <>
                        <Flex
                          key={item.id}
                          align="center"
                          justify="space-between"
                          css={checklistItemStyles}
                        >
                          <TextField
                            placeholder={item.name}
                            value={item.name}
                            css={textFieldStyles}
                          />
                          <BsTrash3 size={19} css={iconStyles} />
                        </Flex>
                        <Spacing size={15} />
                      </>
                    )
                  })}
                  <Flex
                    align="center"
                    justify="space-between"
                    css={checklistItemStyles}
                  >
                    <TextField
                      placeholder="항목을 입력해주세요"
                      value=""
                      css={textFieldStyles}
                    />
                    <AiOutlinePlus size={19} css={iconStyles} />
                  </Flex>
                  <Spacing size={15} />
                </Accordion>
                <Spacing size={16} />
              </Flex>
            )
          })}
        </form>
      </Flex>

      {/* <Form
        forms={checklist}
        onSubmit={handleSubmit}
        buttonLabel={buttonLabel}
      /> */}
      <FixedBottomButton
        label={buttonLabel}
        disabled={저장가능한가}
        onClick={handleSubmit}
      />
    </div>
  )
}

const checklistItemStyles = css`
  padding: 5px 20px 5px 0;
  border: 1px solid ${colors.gray300};
  border-radius: 10px;

  cursor: pointer;
`

const textFieldStyles = css`
  border: none;
  font-weight: 300;
`

const iconStyles = css`
  color: ${colors.gray500}
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`

export default ChecklistFormPage
