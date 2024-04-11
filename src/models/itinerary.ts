export interface Itinerary {
  id: string
  name: string
  departure_date?: string
  arrival_date?: string
  total_days?: number
  type: 'CUSTOM_ITINERARY' | 'SHARE_ITINERARY'
  link?: string
  creatorId: string
  joinedUsers?: string[]
  createdAt: string

  schedule?: Schedule
  budget?: Expense
}

export interface Schedule {
  id: string
  itineraryId: string
  date: string
  day: number
}

export interface Expense {
  id: string
  itineraryId: string
}
