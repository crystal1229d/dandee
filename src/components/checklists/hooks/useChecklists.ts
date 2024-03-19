import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query'

import useUser from '@hooks/auth/useUser'
import {
  getChecklists,
  removeChecklist,
  updateChecklist,
} from '@remote/checklist'
import { useCallback } from 'react'
import { Checklist } from '@/models/checklist'

function useChecklists() {
  const user = useUser()
  const client = useQueryClient()

  // 조회
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

  const checklists = data?.pages.map(({ checklists }) => checklists).flat()

  // 생성
  const create = () => {}

  // 수정
  const { mutate: update } = useMutation(
    ({
      checklistId,
      newData,
    }: {
      checklistId: string
      newData: Partial<Checklist>
    }) => {
      return updateChecklist({ checklistId, newChecklist: newData })
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['checklists', user?.uid])
      },
    },
  )

  // 삭제
  const { mutate: remove } = useMutation(
    ({ checklistId }: { checklistId: string }) => {
      return removeChecklist({ checklistId })
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['checklists', user?.uid])
      },
    },
  )

  return {
    data: checklists,
    loadMore,
    isFetching,
    hasNextPage,
    create,
    update,
    remove,
  }
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
