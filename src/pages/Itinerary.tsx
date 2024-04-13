import useItinerary from '@/hooks/itinerary/useItinerary'
import { Itinerary } from '@/models/itinerary'
import { parse } from 'qs'
import { useEffect } from 'react'

function ItineraryPage() {
  const { itineraryId = '' } = parse(window.location.search, {
    ignoreQueryPrefix: true,
  }) as {
    itineraryId: string
  }

  useEffect(() => {
    if (itineraryId == null) {
      window.history.back()
    }
  }, [itineraryId])

  const { data, isLoading } = useItinerary({ itineraryId }) as {
    data: Itinerary
    isLoading: boolean
  }

  console.log(data, isLoading)

  if (isLoading) {
    return <div>Loading...</div>
  }

  return <div>ItineraryPage</div>
}

export default ItineraryPage
