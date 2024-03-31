import React from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { css } from '@emotion/react'

import useChecklist from '@hooks/checklist/useChecklist'
import { Checklist } from '@models/checklist'

import { colors } from '@styles/colorPalette'
import { size, spacing } from '@styles/sharedStyles'
import ChecklistCard from '@components/checklists/ChecklistCard'
import Flex from '@shared/Flex'
import Spacing from '@shared/Spacing'
import Title from '@shared/Title'
import { CiCirclePlus } from 'react-icons/ci'

function ChecklistsPage() {
  const { data: checklists, hasNextPage, loadMore } = useChecklist()

  return (
    <div css={container}>
      <Title
        title="체크리스트 목록"
        subTitle="체크리스트를 편집하거나 불러올 수 있어요"
      />
      <Flex align="center" justify="center" css={actionButtonContainer}>
        <Link to="/checklist/new">
          <CiCirclePlus size={size.iconSize} color={colors.gray800} />
        </Link>
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
          {checklists?.map((checklist: Checklist) => (
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
