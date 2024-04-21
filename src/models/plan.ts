export interface Plan {
  id: string
  name: string
  departure_date?: string
  arrival_date?: string
  total_days?: number
  headcount?: number
  type: 'DEFAULT_ITINERARY' | 'CUSTOM_ITINERARY' | 'SHARE_ITINERARY'
  link?: string
  creatorId: string
  joinedUsers?: string[]
  createdAt: string

  plan?: Plan
  checklistId?: string
  expense?: Expense
}

export interface Plan {
  id: string
  mainImageUrl?: string
  itinerary?: Itinerary[]
}

export interface Itinerary {
  id: string
  date: string
  day: number
  activities?: Activity[]
}

export interface Activity {
  id: string
  order: number
  creatorId: string
  time?: string
  tag?: string[]
  link?: string[]
  activity?: string
  description?: string
  images?: string[]
  location?: {
    name: string
    address: string
    directions?: string
    pointGeolocation: { x: number; y: number }
  }
  bookingInfo?: {
    checkinDate?: string
    checkoutDate?: string
  }
}

export interface Expense {
  id: string
  planId: string
}
