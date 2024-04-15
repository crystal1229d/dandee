import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Itinerary } from '@models/itinerary'
import ItineraryCard from '@components/itineraries/ItineraryCard'

import ContentsButtonBar from '@shared/ContentsButtonBar'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Title from '@shared/Title'

import { spacing } from '@styles/sharedStyles'
import useItineraries from '@/hooks/itinerary/useItineraries'

function ItinerariesPage() {
  const { itineraries, hasNextPage, loadMore } = useItineraries()

  console.log(itineraries)

  return (
    <Container>
      <Title
        title="여행계획 목록"
        subTitle="여행일정, 경비관리, 체크리스트까지 한번에 쉽게 관리해보세요"
      />

      <Flex gap={4}>
        <ContentsButtonBar>
          <Link to="/itinerary/new">새 여행일정 만들기</Link>
        </ContentsButtonBar>
      </Flex>

      <Spacing size={spacing.contentsGap} />

      <Flex dir="column">
        <InfiniteScroll
          dataLength={itineraries?.length ?? 0}
          hasMore={hasNextPage}
          loader={<></>}
          next={loadMore}
          scrollThreshold="100px"
          style={{ overflowY: 'hidden' }}
        >
          <ul>
            {itineraries?.map((itinerary: Itinerary) => (
              <React.Fragment key={itinerary.id}>
                <ItineraryCard itinerary={itinerary} />
                <Spacing size={spacing.contentsGap} />
              </React.Fragment>
            ))}
          </ul>
        </InfiniteScroll>
      </Flex>
    </Container>
  )
}

const Container = styled.div`
  height: calc(100vh - 81px);
`

export default ItinerariesPage
