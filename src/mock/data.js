// 체크리스트
export const CHECKLISTS = [
  {
    id: '',
    name: '여행 준비물',
    type: 'DEFAULT_TEMPLATE',
    inUse: false,
    createdAt: '2023-10-23T00:00:00+09:00',
    usedAt: '2023-10-23T00:00:00+09:00',
    userId: 'r1TAHIKorqPVhXAfoJRjuwC2FD33',
  },
  {
    id: '',
    name: '2024 호주 여행 준비물',
    type: 'CUSTOM_TEMPLATE',
    inUse: false,
    createdAt: '2023-10-23T00:00:00+09:00',
    usedAt: '2024-03-15T00:00:00+09:00',
    userId: 'r1TAHIKorqPVhXAfoJRjuwC2FD33',
    categories: [
      {
        id: 'cat01',
        name: '필수품',
        order: 1,
        isExpanded: true,
        items: [
          {
            id: 'cat01item01',
            categoryId: 'cat01',
            name: '여권',
            order: 1,
            isChecked: true,
          },
          {
            id: 'cat01item02',
            categoryId: 'cat01',
            name: '핸드폰 충전기',
            order: 2,
            isChecked: true,
          },
          {
            id: 'cat01item03',
            categoryId: 'cat01',
            name: '어댑터',
            order: 3,
            isChecked: false,
          },
          {
            id: 'cat01item04',
            categoryId: 'cat01',
            name: '비행기 티켓',
            order: 4,
            isChecked: false,
          },
          {
            id: 'cat01item05',
            categoryId: 'cat01',
            name: '여권 복사본',
            order: 5,
            isChecked: false,
          },
        ],
      },
      {
        id: 'cat02',
        name: '의류',
        order: 2,
        isExpanded: false,
        items: [
          {
            id: 'cat02item01',
            categoryId: 'cat02',
            name: '양말',
            order: 1,
            isChecked: false,
          },
          {
            id: 'cat02item02',
            categoryId: 'cat02',
            name: '속옷',
            order: 2,
            isChecked: false,
          },
          {
            id: 'cat02item03',
            categoryId: 'cat02',
            name: '바람막이',
            order: 3,
            isChecked: false,
          },
        ],
      },
      {
        id: 'cat03',
        name: '스킨케어',
        order: 3,
        isExpanded: false,
        items: [
          {
            id: 'cat03item01',
            categoryId: 'cat03',
            name: '로션',
            order: 1,
            isChecked: false,
          },
          {
            id: 'cat03item02',
            categoryId: 'cat03',
            name: '클렌징폼',
            order: 2,
            isChecked: false,
          },
          {
            id: 'cat03item03',
            categoryId: 'cat03',
            name: '치약',
            order: 3,
            isChecked: false,
          },
          {
            id: 'cat03item04',
            categoryId: 'cat03',
            name: '칫솔',
            order: 4,
            isChecked: false,
          },
          {
            id: 'cat03item05',
            categoryId: 'cat03',
            name: '선크림',
            order: 5,
            isChecked: false,
          },
        ],
      },
      {
        id: 'cat04',
        name: '약',
        order: 4,
        isExpanded: true,
      },
      {
        id: 'cat05',
        name: '가져가면 좋아요',
        order: 5,
        isExpanded: false,
      },
    ],
  },
  {
    id: '',
    name: '제주여행',
    type: 'CUSTOM_TEMPLATE',
    inUse: false,
    createdAt: '2023-10-23T00:00:00+09:00',
    usedAt: '2023-11-15T00:00:00+09:00',
    userId: 'r1TAHIKorqPVhXAfoJRjuwC2FD33',
  },
  {
    id: '',
    name: '2024 일본 온천여행',
    type: 'CUSTOM_TEMPLATE',
    inUse: true,
    createdAt: '2024-01-10T00:00:00+09:00',
    usedAt: '2024-01-15T00:00:00+09:00',
    userId: 'r1TAHIKorqPVhXAfoJRjuwC2FD33',
  },
  {
    id: '',
    name: '우정여행',
    type: 'SHARE_TEMPLATE',
    inUse: false,
    createdAt: '2023-03-23T00:00:00+09:00',
    usedAt: '2023-03-23T00:00:00+09:00',
    userId: 'r1TAHIKorqPVhXAfoJRjuwC2FD33',
  },
  {
    id: '',
    name: '우정여행',
    type: 'SHARE_TEMPLATE',
    inUse: false,
    createdAt: '2023-03-23T00:00:00+09:00',
    usedAt: '2023-03-23T00:00:00+09:00',
    userId: '12345',
  },
]

export const CHECKLIST_CATEGORY = [
  {
    name: '필수품',
    order: 1,
    isExpanded: true,
  },
  {
    name: '의류',
    order: 2,
    isExpanded: false,
  },
  {
    name: '스킨케어',
    order: 3,
    isExpanded: false,
  },
  {
    name: '약',
    order: 4,
    isExpanded: true,
  },
  {
    name: '가져가면 좋아요',
    order: 5,
    isExpanded: false,
  },
]

export const CHECKLIST_ITEM = [
  {
    categoryName: '필수품',
    name: '여권',
    order: 1,
    isChecked: true,
  },
  {
    categoryName: '필수품',
    name: '핸드폰 충전기',
    order: 2,
    isChecked: true,
  },
  {
    categoryName: '필수품',
    name: '어댑터',
    order: 3,
    isChecked: false,
  },
  {
    categoryName: '필수품',
    name: '비행기 티켓',
    order: 4,
    isChecked: false,
  },
  {
    categoryName: '필수품',
    name: '여권 복사본',
    order: 5,
    isChecked: false,
  },
  {
    categoryName: '의류',
    name: '양말',
    order: 1,
    isChecked: false,
  },
  {
    categoryName: '의류',
    name: '속옷',
    order: 2,
    isChecked: false,
  },
  {
    categoryName: '의류',
    name: '바람막이',
    order: 3,
    isChecked: false,
  },
  {
    categoryName: '스킨케어',
    name: '로션',
    order: 1,
    isChecked: false,
  },
  {
    categoryName: '스킨케어',
    name: '클렌징폼',
    order: 2,
    isChecked: false,
  },
  {
    categoryName: '스킨케어',
    name: '치약',
    order: 3,
    isChecked: false,
  },
  {
    categoryName: '스킨케어',
    name: '칫솔',
    order: 4,
    isChecked: false,
  },
  {
    categoryName: '스킨케어',
    name: '선크림',
    order: 5,
    isChecked: false,
  },
]

export const CHECKLIST_FORM = [
  {
    id: 'name',
    label: '체크리스트 이름',
    required: true,
    type: 'TEXT_FIELD',
  },
  {
    id: 'inUse',
    label: '사용여부',
    required: true,
    type: 'CHECKBOX',
  },
]

// 여행계획
export const ITINERARY = [
  {
    id: '',
    name: '2024 호주 여행',
    departure_date: '2024.04.13.토',
    arrival_date: '2024.05.08.수',
    total_days: 26,
    type: 'CUSTOM_ITINERARY',
    link: null,
    creatorId: 'r1TAHIKorqPVhXAfoJRjuwC2FD33',
    joinedUsers: [],
    createdAt: '2023-03-23T00:00:00+09:00',

    schedule: null,
    budget: null,
  },
  {
    id: '',
    name: '테스트 일정',
    departure_date: '2024.04.13.토',
    arrival_date: '2024.04.14.일',
    total_days: 2,
    type: 'CUSTOM_ITINERARY',
    link: null,
    createUserId: 'r1TAHIKorqPVhXAfoJRjuwC2FD33',
    joinedUsers: [],
    createdAt: '2023-04-10T00:00:00+09:00',

    schedule: null,
    expense: null,
  },
]
