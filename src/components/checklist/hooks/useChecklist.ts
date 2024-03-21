import { useQuery } from 'react-query'

import useUser from '@hooks/auth/useUser'
import { getChecklist } from '@remote/checklist'

function useChecklist({ checklistId }: { checklistId: string }) {
  const user = useUser()

  const { data, isLoading } = useQuery(
    ['checklist', checklistId, user?.uid],
    () => getChecklist({ checklistId, userId: user?.uid as string }),
    {
      enabled: user != null,
    },
  )

  return { data, isLoading }
}

export default useChecklist
