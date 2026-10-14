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
  venue: '메종글래드 제주 2F 제이드홀',
  venueEn: 'MAISON GLAD JEJU · 2F JADE HALL',
  fee: '무료, 사전등록 완료자 참석',
  contactEmail: 'md@tilon.com',
  keyMessage: 'Cloud에서 AI로, 구축에서 서비스로',
  heroSubcopy: 'AI와 Cloud, 새로운 서비스의 시작을 만나다',
} as const;

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
  { start: '10:00', end: '10:30', minutes: 30, title: '등록 및 시연 부스 관람', kind: 'break' },
  { start: '10:30', end: '10:40', minutes: 10, title: '개회사', kind: 'standard' },
  { start: '10:40', end: '11:10', minutes: 30, title: 'DstationX, 가상화의 다음 세대', subtitle: '제품군과 고객 도입 사례', kind: 'featured' },
  { start: '11:10', end: '11:30', minutes: 20, title: 'TheOther.Space 2.0', subtitle: 'DstationX 엔진으로 완성한 서비스형 DaaS', kind: 'featured' },
  { start: '11:30', end: '11:50', minutes: 20, title: '틸론 AI 서비스 패밀리 공개', kind: 'featured' },
  { start: '11:50', end: '12:50', minutes: 60, title: '오찬 및 네트워킹', kind: 'break' },
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

export const footer = {
  contact: '행사 문의 | md@tilon.com',
  notice: '본 행사는 무료로 진행되며, 사전등록을 완료하신 분에 한해 참석하실 수 있습니다.',
  copyright: 'Copyright ⓒ TILONSoft Co., Ltd. All Rights Reserved.',
} as const;
