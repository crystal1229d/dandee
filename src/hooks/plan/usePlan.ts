import { useMutation, useQuery, useQueryClient } from 'react-query'
import { createPlan, getPlan, removePlan, updatePlan } from '@remote/plan'
import useUser from '../auth/useUser'
import { Plan } from '@/models/plan'
import { useDialogContext } from '@/contexts/DialogContext'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

function usePlan({ planId }: { planId: string }) {
  const user = useUser()
  const { open } = useDialogContext()
  const client = useQueryClient()
  const navigate = useNavigate()

  // 단일 여행계획 조회
  const { data, isLoading } = useQuery(
    ['plan', planId, user?.uid],
    () => getPlan({ planId, userId: user?.uid as string }),
    {
      enabled: user != null,
    },
  )

  const plan = data?.plan

  // 여행계획 생성
  const { mutateAsync: create } = useMutation(
    async (newPlan: Partial<Plan>) => {
      if (user == null) {
        throw new Error('로그인 필요')
      }
      await createPlan({
        plan: {
          ...newPlan,
          type: 'CUSTOM_ITINERARY',
          createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
          creatorId: user?.uid as string,
        },
        userId: user.uid,
      })

      return true
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['plan', planId, user?.uid])
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

  // 여행계획 수정
  const { mutate: update } = useMutation(
    async ({ planId, newPlan }: { planId: string; newPlan: Partial<Plan> }) => {
      if (user == null) {
        throw new Error('로그인 필요')
      }
      await updatePlan({
        planId,
        userId: user.uid,
        newPlan,
      })
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['plan', planId, user?.uid])
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

  // 여행계획 삭제
  const { mutate: remove } = useMutation(
    ({ planId }: { planId: string }) => {
      if (user == null) {
        throw new Error('로그인 필요')
      }
      return removePlan({ planId, userId: user.uid })
    },
    {
      onSuccess: () => {
        client.invalidateQueries(['plan', planId, user?.uid])
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
    data: plan,
    isLoading,
    create,
    update,
    remove,
  }
}

export default usePlan
