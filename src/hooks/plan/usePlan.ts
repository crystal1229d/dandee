import { useQuery } from 'react-query'
import { getPlan } from '@remote/plan'
import useUser from '../auth/useUser'

function usePlan({ planId }: { planId: string }) {
  const user = useUser()

  // 단일 여행계획 조회
  const { data, isLoading } = useQuery(
    ['plan', planId, user?.uid],
    () => getPlan({ planId, userId: user?.uid as string }),
    {
      enabled: user != null,
    },
  )

  const plan = data?.plan

  return {
    data: plan,
    isLoading,
  }
}

export default usePlan
