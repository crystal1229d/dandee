import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInfiniteQuery, useMutation, useQueryClient } from 'react-query'

import {
  createChecklist,
  getChecklists,
  removeChecklist,
  updateChecklist,
} from '@remote/checklist'
import { Checklist } from '@models/checklist'
import { useDialogContext } from '@contexts/DialogContext'
import useUser from '@hooks/auth/useUser'

function useChecklist() {
  const user = useUser()
  const { open } = useDialogContext()
  const client = useQueryClient()
  const navigate = useNavigate()

  // 모든 체크리스트 조회
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

  // 체크리스트 생성
  const { mutateAsync: create } = useMutation(
    async (newChecklist: Omit<Checklist, 'id'>) => {
      if (user == null) {
        throw new Error('로그인 필요')
      }
      await createChecklist({ userId: user.uid, checklist: newChecklist })

      return true
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['checklists', user?.uid])
      },
      onError: (e: Error) => {
        if (e.message === '로그인 필요') {
          open({
            title: '로그인이 필요한 기능입니다',
            onConfirmClick: () => {
              navigate('/signin')
            },
          })

          return
        }
        open({
          title: '알 수 없는 에러가 발생했습니다. 잠시후 다시 시도해주세요',
          onConfirmClick: () => {
            // 액션
          },
        })
      },
    },
  )

  // 체크리스트 수정
  const { mutate: update } = useMutation(
    async ({
      checklistId,
      newChecklist,
    }: {
      checklistId: string
      newChecklist: Partial<Checklist>
    }) => {
      if (user == null) {
        throw new Error('로그인 필요')
      }
      await updateChecklist({ checklistId, newChecklist })

      return true
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['checklists', user?.uid])
      },
      onError: (e: Error) => {
        if (e.message === '로그인 필요') {
          open({
            title: '로그인이 필요한 기능입니다',
            onConfirmClick: () => {
              navigate('/signin')
            },
          })

          return
        }
        open({
          title: '알 수 없는 에러가 발생했습니다. 잠시후 다시 시도해주세요',
          onConfirmClick: () => {
            // 액션
          },
        })
      },
    },
  )

  // 체크리스트 삭제
  const { mutate: remove } = useMutation(
    ({ checklistId }: { checklistId: string }) => {
      if (user == null) {
        throw new Error('로그인 필요')
      }
      return removeChecklist({ checklistId, userId: user?.uid })
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['checklists', user?.uid])
      },
      onError: (e: Error) => {
        if (e.message === '로그인 필요') {
          open({
            title: '로그인이 필요한 기능입니다',
            onConfirmClick: () => {
              navigate('/signin')
            },
          })

          return
        }
        open({
          title: '알 수 없는 에러가 발생했습니다. 잠시후 다시 시도해주세요',
          onConfirmClick: () => {
            // 액션
          },
        })
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

export default useChecklist
