export const CHECKLISTS = [
  {
    name: '여행 준비물',
    type: 'DEFAULT_TEMPLATE',
    inUse: false,
    createdAt: '2023-10-23T00:00:00+09:00',
    usedAt: '2023-10-23T00:00:00+09:00',
    userId: 'r1TAHIKorqPVhXAfoJRjuwC2FD33',
  },
  {
    name: '2024 호주 여행 준비물',
    type: 'CUSTOM_TEMPLATE',
    inUse: false,
    createdAt: '2023-10-23T00:00:00+09:00',
    usedAt: '2024-03-15T00:00:00+09:00',
    userId: 'r1TAHIKorqPVhXAfoJRjuwC2FD33',
  },
  {
    name: '제주여행',
    type: 'CUSTOM_TEMPLATE',
    inUse: false,
    createdAt: '2023-10-23T00:00:00+09:00',
    usedAt: '2023-11-15T00:00:00+09:00',
    userId: 'r1TAHIKorqPVhXAfoJRjuwC2FD33',
  },
  {
    name: '2024 일본 온천여행',
    type: 'CUSTOM_TEMPLATE',
    inUse: true,
    createdAt: '2024-01-10T00:00:00+09:00',
    usedAt: '2024-01-15T00:00:00+09:00',
    userId: 'r1TAHIKorqPVhXAfoJRjuwC2FD33',
  },
  {
    name: '우정여행',
    type: 'SHARE_TEMPLATE',
    inUse: false,
    createdAt: '2023-03-23T00:00:00+09:00',
    usedAt: '2023-03-23T00:00:00+09:00',
    userId: 'r1TAHIKorqPVhXAfoJRjuwC2FD33',
  },
  {
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
    isFolded: false,
  },
  {
    name: '의류',
    order: 2,
    isFolded: true,
  },
  {
    name: '스킨케어',
    order: 3,
    isFolded: true,
  },
  {
    name: '약',
    order: 4,
    isFolded: false,
  },
  {
    name: '가져가면 좋아요',
    order: 5,
    isFolded: true,
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
