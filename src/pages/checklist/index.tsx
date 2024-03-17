import Title from '@shared/Title'
import Flex from '@shared/Flex'
import ContentsBar from '@shared/ContentsBar'
import Checkbox from '@shared/Checkbox'
import Spacing from '@shared/Spacing'
import { spacing } from '@/styles/spacing'

function CheckListPage() {
  return (
    <div>
      <Title
        title="체크리스트"
        subTitle="여행지에서 난감하지 않게, 꼼꼼하게 챙겨보세요"
      />
      <Flex gap={4}>
        <ContentsBar title="체크리스트 관리" />
        <ContentsBar title="체크리스트 불러오기" />
      </Flex>
      <Spacing size={spacing.contentsGap} />
      <Flex align="center">
        <Checkbox onCheck={() => {}} text="전체 선택/해제" />
        <Checkbox onCheck={() => {}} text="체크/편집 모드" />
      </Flex>
    </div>
  )
}

export default CheckListPage
