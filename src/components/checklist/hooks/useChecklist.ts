import { useQuery } from 'react-query'

import useUser from '@hooks/auth/useUser'
import { getChecklists } from '@remote/checklist'

function useChecklists() {
  const user = useUser()

  const { data, isLoading } = useQuery(
    ['checklists', user?.uid],
    () => getChecklists({ userId: user?.uid as string }),
    {
      enabled: user != null,
    },
  )

  return { data, isLoading }
}

export default useChecklists
