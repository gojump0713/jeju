// 행사 정보·프로그램·서비스의 단일 원본 데이터 (작업지시서 4장, 11.1)
// Desktop/Mobile 모두 이 파일만 참조한다. 값 변경 시 작업지시서와 대조할 것.

export const event = {
  id: 'tilonsoft-the-other-day-2026',
  name: 'TilonSoft The Other Day 2026',
  host: '틸론소프트',
  date: '2026-11-05',
  dateLabel: '2026.11.05 THU',
  dateLabelKo: '2026년 11월 5일(목)',
  timeLabel: '10:00–15:00',
  startDate: '2026-11-05T10:00:00+09:00',
  // endDate: 폐회 종료 시각 미정 → 운영팀 확인 전 생략 (12장)
  venue: '메종글래드 제주 2F 크리스탈홀',
  venueEn: 'MAISON GLAD JEJU · 2F CRYSTAL HALL',
  fee: '무료, 사전등록 완료자 참석',
  contactEmail: 'md@tilon.com',
  keyMessage: 'Cloud에서 AI로, 구축에서 서비스로',
  heroSubcopy: 'AI와 Cloud, 새로운 서비스의 시작을 만나다',
} as const;

// 운영팀 확인 후 기입 (6장 S06, 12장, 15.1). 추정 금지 — null이면 해당 UI를 렌더링하지 않는다.
export const venueInfo: {
  address: string | null; // 검증된 도로명 주소
  mapUrl: string | null; // 검증된 지도 링크 (네이버·카카오 등 장소 페이지)
  mapEmbedUrl: string | null; // 실제 지도 iframe src
} = {
  address: null,
  mapUrl: null,
  mapEmbedUrl: null,
};

export const privacyPolicyUrl: string | null = null; // TODO(운영팀): 개인정보처리방침 URL

export const nav = [
  { label: '초대의 글', href: '#invitation' },
  { label: '행사 소개', href: '#about' },
  { label: '참가신청', href: '#registration' },
] as const;

export type Accent = 'blue' | 'green' | 'yellow' | 'orange';

export interface Service {
  order: string;
  label: string;
  name: string;
  description: string;
  assetId: string;
  accent: Accent;
}

export const services: Service[] = [
  { order: '01', label: 'NEXT VIRTUALIZATION', name: 'DstationX', description: '가상화의 다음 세대', assetId: 'HF-I04', accent: 'blue' },
  { order: '02', label: 'DAAS', name: 'TheOther.Space 2.0', description: 'DstationX 엔진으로 완성한 서비스형 DaaS', assetId: 'HF-I05', accent: 'green' },
  { order: '03', label: 'AI CREATION', name: 'Kstory.ai', description: 'AI 동화 창작·교육 서비스', assetId: 'HF-I06', accent: 'yellow' },
  { order: '04', label: 'SOVEREIGN AI', name: 'TheOther.Town', description: '소버린 AI · GPU 가상화 서비스', assetId: 'HF-I07', accent: 'orange' },
];

export type SessionKind = 'standard' | 'featured' | 'break' | 'closing';

export interface Session {
  start: string;
  end: string | null; // null = 종료 미정 (폐회)
  minutes: number | null;
  title: string;
  subtitle?: string;
  kind: SessionKind;
}

// 발표자·직함은 제공되지 않았으므로 넣지 않는다 (4.4)
export const program: Session[] = [
  { start: '10:00', end: '10:30', minutes: 30, title: '등록 및 시연 부스 관람', kind: 'standard' },
  { start: '10:30', end: '10:40', minutes: 10, title: '개회사', kind: 'standard' },
  { start: '10:40', end: '11:10', minutes: 30, title: 'DstationX, 가상화의 다음 세대', subtitle: '제품군과 고객 도입 사례', kind: 'standard' },
  { start: '11:10', end: '11:30', minutes: 20, title: 'TheOther.Space 2.0', subtitle: 'DstationX 엔진으로 완성한 서비스형 DaaS', kind: 'standard' },
  { start: '11:30', end: '11:50', minutes: 20, title: '틸론 AI 서비스 패밀리 공개', kind: 'standard' },
  { start: '11:50', end: '12:50', minutes: 60, title: '오찬 및 네트워킹', kind: 'standard' },
  { start: '12:50', end: '13:00', minutes: 10, title: '축사', kind: 'standard' },
  { start: '13:00', end: '13:20', minutes: 20, title: '구축에서 구독으로', subtitle: '틸론은 왜 AI 서비스를 만들었는가', kind: 'standard' },
  { start: '13:20', end: '14:00', minutes: 40, title: 'AI와 제주', subtitle: 'AI서비스가 제주 산업에 미치는 영향', kind: 'featured' },
  { start: '14:00', end: '14:20', minutes: 20, title: 'AI 동화 창작 서비스 Kstory.ai 소개', kind: 'standard' },
  { start: '14:20', end: '14:40', minutes: 20, title: 'KT클라우드 공공DaaS 소개', kind: 'standard' },
  { start: '14:40', end: '15:00', minutes: 20, title: '소버린 AI · GPU 가상화 서비스 TheOther.Town 소개', kind: 'standard' },
  { start: '15:00', end: null, minutes: null, title: '폐회, 경품추첨, 기념촬영', kind: 'closing' },
];

export const interestOptions = [
  'DstationX',
  'TheOther.Space 2.0',
  'Kstory.ai',
  'TheOther.Town',
  '공공DaaS',
  'AI/Cloud',
] as const;

// 개인정보 수집·이용 동의 (8.2) — 운영팀 검토용 구성안. 확정되지 않은 값(null)은 페이지에 게시하지 않는다.
export const consent = {
  label: '[필수] 개인정보 수집 및 이용에 동의합니다.',
  rows: [
    { term: '수집·이용 목적', desc: '행사 사전등록 접수, 참석자 확인 및 행사 운영 안내' },
    { term: '필수 수집 항목', desc: '이름, 소속, 연락처, 이메일' },
    { term: '선택 수집 항목', desc: '부서/직책, 관심 서비스, 사전 질문 (입력하신 항목에 한함)' },
    // TODO(운영팀): 정식 수집 주체(법인명)·보유 및 이용 기간·파기 시점 확정 후 기입 (15.1)
    { term: '보유 및 이용 기간', desc: null },
  ],
  refusal:
    '개인정보 수집 및 이용에 동의하지 않으실 수 있으며, 필수 정보 수집에 동의하지 않으시면 온라인 사전등록을 진행할 수 없습니다. 선택 항목은 입력하지 않아도 신청할 수 있습니다.',
} as const;

export const footer = {
  contact: '행사 문의 | md@tilon.com',
  notice: '본 행사는 무료로 진행되며, 사전등록을 완료하신 분에 한해 참석하실 수 있습니다.',
  copyright: 'Copyright ⓒ TILONSoft Co., Ltd. All Rights Reserved.',
} as const;
