import { useInfiniteQuery } from 'react-query'

import useUser from '@hooks/auth/useUser'
import { getChecklists } from '@remote/checklist'
import { useCallback } from 'react'

function useChecklists() {
  const user = useUser()
  const {
    data,
    hasNextPage = false,
    fetchNextPage,
    isFetching,
  } = useInfiniteQuery(
    ['checklists', user?.uid],
    ({ pageParam }) =>
      getChecklists({ userId: user?.uid as string, pageParam }),
    {
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

  const checklists = data?.pages.map(({ checklists }) => checklists).flat()

  return { data: checklists, loadMore, isFetching, hasNextPage }
}

// function useChecklists() {
//   const user = useUser()

//   const { data, isLoading } = useQuery(
//     ['checklists', user?.uid],
//     () => getChecklists({ userId: user?.uid as string }),
//     {
//       enabled: user != null,
//     },
//   )

//   return { data, isLoading }
// }

export default useChecklists
