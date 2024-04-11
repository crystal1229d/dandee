import { getItineraries } from '@/remote/itinerary'
import { useCallback } from 'react'
import { useInfiniteQuery } from 'react-query'
import useUser from '../auth/useUser'

function useItinerary() {
  const user = useUser()

  // 모든 여행일정 조회
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['itineraries', user?.uid],
    ({ pageParam }) =>
      getItineraries({ userId: user?.uid as string, pageParam }),
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

  const itineraries = data?.pages.map(({ itineraries }) => itineraries).flat()

  return {
    itineraries,
    loadMore,
    isFetching,
    hasNextPage,
  }
}

export default useItinerary
