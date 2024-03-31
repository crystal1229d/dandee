import { useQuery } from 'react-query'

import useUser from '@hooks/auth/useUser'
import { getChecklist } from '@remote/checklist'

function useChecklistInDetail({ checklistId }: { checklistId: string }) {
  const user = useUser()

  const { data, isLoading } = useQuery(
    ['checklist', checklistId, user?.uid],
    () => getChecklist({ checklistId, userId: user?.uid as string }),
    {
      enabled: user != null,
    },
  )

  const checklist = data?.checklist

  return { data: checklist, isLoading }
}

export default useChecklistInDetail
