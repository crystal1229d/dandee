import { css } from '@emotion/react'

import ChecklistCard from '@/components/checklists/ChecklistCard'
import useChecklists from '@/components/checklists/hooks/useChecklists'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Title from '@shared/Title'
import { colors } from '@styles/colorPalette'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import { CiCirclePlus } from 'react-icons/ci'
import { size, spacing } from '@/styles/sharedStyles'

function ChecklistsPage() {
  const { data: checklists, hasNextPage, loadMore } = useChecklists()

  return (
    <div css={container}>
      <Title
        title="체크리스트 목록"
        subTitle="체크리스트를 편집하거나 불러올 수 있어요"
      />
      <Flex align="center" justify="center" css={actionButtonContainer}>
        <CiCirclePlus size={size.iconSize} color={colors.gray800} />
      </Flex>
      <Spacing size={spacing.contentsGap} />
      <InfiniteScroll
        dataLength={checklists?.length ?? 0}
        hasMore={hasNextPage}
        loader={<>Loading...</>}
        next={loadMore}
        scrollThreshold="100px"
        style={{ overflowY: 'hidden' }}
      >
        <ul>
          {checklists?.map((checklist) => (
            <React.Fragment key={checklist.id}>
              <ChecklistCard checklist={checklist} />
              <Spacing size={spacing.contentsGap} />
            </React.Fragment>
          ))}
        </ul>
      </InfiniteScroll>
    </div>
  )
}

const container = css`
  background: ${colors.gray100};
`

const actionButtonContainer = css`
  height: 63px;
  margin: 0 ${spacing.pageLeftRight};
  background: ${colors.white};
  border: 2px solid ${colors.white};
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.1s ease;

  &:hover {
    border: 2px solid ${colors.gray200};
  }
`

export default ChecklistsPage
