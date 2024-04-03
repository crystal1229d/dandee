import { useQuery } from 'react-query'

import useUser from '@hooks/auth/useUser'
import { getChecklistInUse } from '@remote/checklist'

function useDetailedChecklistInUse() {
  const user = useUser()

  const { data, isLoading } = useQuery(
    ['checklistInUse', user?.uid],
    () => getChecklistInUse({ userId: user?.uid as string }),
    {
      enabled: user != null,
    },
  )

  const checklist = data?.checklist

  return { data: checklist, isLoading }
}

export default useDetailedChecklistInUse
