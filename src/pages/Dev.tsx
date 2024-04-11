import CheckListAddButton from '@/components/dev/CheckListAddButton'
import ItineraryAddButton from '@/components/dev/ItineraryAddButton'
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
      <ItineraryAddButton />
    </Flex>
  )
}

export default DevPage
