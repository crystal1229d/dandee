export const COLLECTIONS = {
  USER: 'USER',
  CHECKLIST: 'CHECKLIST',
  CHECKLIST_CATEGORY: 'CHECKLIST_CATEGORY',
  CHECKLIST_ITEM: 'CHECKLIST_ITEM',
  PLAN: 'PLAN',
}

export const TAGS = {
  IN_USE: {
    label: '사용중',
    tagStyle: {
      fontColor: '#FFFFFF',
      backgroundColor: '#37A8FF',
    },
  },
  DEFAULT_TEMPLATE: {
    label: '기본 템플릿',
    tagStyle: {
      fontColor: '#FFFFFF',
      backgroundColor: '#26CEC2',
    },
  },
  CUSTOM_TEMPLATE: {
    label: '커스텀 템플릿',
    tagStyle: {
      fontColor: '#FFFFFF',
      backgroundColor: '#1f57fa',
    },
  },
  SHARE_TEMPLATE: {
    label: '공유 템플릿',
    tagStyle: {
      fontColor: '#FFFFFF',
      backgroundColor: '#FF69B4',
    },
  },
}

interface ItineraryTag {
  label: string
  tagStyle: {
    fontColor: string
    backgroundColor: string
  }
}

interface ItineraryTags {
  [key: string]: ItineraryTag
}

export const ITINERARY_TAGS: ItineraryTags = {
  ACCOMODATION: {
    label: '🏠 숙소',
    tagStyle: {
      fontColor: '#FFFFFF',
      backgroundColor: '#FF69B4',
    },
  },
  TODO: {
    label: '🍽️ 맛집',
    tagStyle: {
      fontColor: '#FFFFFF',
      backgroundColor: '#8C7CDC',
    },
  },
  SPOT: {
    label: '🗺️ 명소',
    tagStyle: {
      fontColor: '#FFFFFF',
      backgroundColor: '#3CA4EC',
    },
  },
  CHECKLIST: {
    label: '✅ 체크리스트',
    tagStyle: {
      fontColor: '#FFFFFF',
      backgroundColor: '#54AC1C',
    },
  },
  EXPENSE: {
    label: '💰 예산/경비',
    tagStyle: {
      fontColor: '#FFFFFF',
      backgroundColor: '#F5D613',
    },
  },
  FLIGHT: {
    label: '✈️ 항공',
    tagStyle: {
      fontColor: '#FFFFFF',
      backgroundColor: '#0494FC',
    },
  },
  TRANSFER: {
    label: '이동',
    tagStyle: {
      fontColor: '#FFFFFF',
      backgroundColor: '#808080',
    },
  },
}
