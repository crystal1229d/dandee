import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import InfiniteScroll from 'react-infinite-scroll-component'

import { Plan } from '@models/plan'
import PlanCard from '@components/plans/PlanCard'
import usePlans from '@/hooks/plan/usePlans'

import ContentsButtonBar from '@shared/ContentsButtonBar'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Title from '@shared/Title'

import { spacing } from '@styles/sharedStyles'

function PlansPage() {
  const { plans, hasNextPage, loadMore } = usePlans()

  return (
    <Container>
      <Title
        title="여행계획 목록"
        subTitle="여행일정, 경비관리, 체크리스트까지 한번에 쉽게 관리해보세요"
      />

      <Flex gap={4}>
        <ContentsButtonBar>
          <Link to="/plan/new">새 여행일정 만들기</Link>
        </ContentsButtonBar>
      </Flex>

      <Spacing size={spacing.contentsGap} />

      <Flex dir="column">
        <InfiniteScroll
          dataLength={plans?.length ?? 0}
          hasMore={hasNextPage}
          loader={<></>}
          next={loadMore}
          scrollThreshold="100px"
          style={{ overflowY: 'hidden' }}
        >
          <ul>
            {plans?.map((plan: Plan) => (
              <React.Fragment key={plan.id}>
                <PlanCard plan={plan} />
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

export default PlansPage
