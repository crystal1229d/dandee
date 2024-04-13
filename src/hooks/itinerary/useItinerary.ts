import { getItinerary } from '@/remote/itinerary'
import { useQuery } from 'react-query'
import useUser from '../auth/useUser'

function useItinerary({ itineraryId }: { itineraryId: string }) {
  const user = useUser()

  // 단일 여행계획 조회
  const { data, isLoading } = useQuery(
    ['itinerary', itineraryId, user?.uid],
    () => getItinerary({ itineraryId, userId: user?.uid as string }),
    {
      enabled: user != null,
    },
  )

  const itenerary = data?.itinerary

  return {
    data: itenerary,
    isLoading,
  }
}

export default useItinerary
