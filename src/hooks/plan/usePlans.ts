import { useCallback } from 'react'
import { useInfiniteQuery } from 'react-query'
import { getPlans } from '@remote/plan'
import useUser from '../auth/useUser'

function usePlans() {
  const user = useUser()

  // 모든 여행계획 조회
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['plans', user?.uid],
    ({ pageParam }) => getPlans({ userId: user?.uid as string, pageParam }),
    {
      enabled: user != null,
      getNextPageParam: (snapshot) => {
        return snapshot.lastVisible
      },
    },
  )

  const loadMore = useCallback(() => {
    if (hasNextPage === false || isFetching) {
      return
    }

    fetchNextPage()
  }, [fetchNextPage, hasNextPage, isFetching])

  const plans = data?.pages.map(({ plans }) => plans).flat()

  return {
    plans,
    loadMore,
    isFetching,
    hasNextPage,
  }
}

export default usePlans
