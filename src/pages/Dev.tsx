import CheckListAddButton from '@/components/dev/CheckListAddButton'
import PlanAddButton from '@/components/dev/PlanAddButton'
import Flex from '@shared/Flex'

function DevPage() {
  return (
    <Flex
      dir="column"
      align="center"
      justify="center"
      gap={10}
      style={{ paddingTop: '30px' }}
    >
      <CheckListAddButton />
      <PlanAddButton />
    </Flex>
  )
}

export default DevPage
