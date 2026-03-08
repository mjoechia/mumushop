export const THERAPISTS = [
  { id: 1, name: '陈师傅', nameEn: 'Therapist Chen', specialty: 'TCM', color: 'chen' },
  { id: 2, name: '王师傅', nameEn: 'Therapist Wang', specialty: 'Physiotherapy', color: 'wang' },
  { id: 3, name: '李老师', nameEn: 'Teacher Li', specialty: 'Beauty', color: 'li' },
  { id: 4, name: '张师傅', nameEn: 'Therapist Zhang', specialty: 'Fasciotome/Tuina', color: 'zhang' },
];

export const SERVICES = {
  '招牌疗愈 Flagship': [
    { id: 's1', cn: '推拿', en: 'Tuina', price: 88, memberPrice: 78, duration: 60 },
    { id: 's2', cn: '拨筋', en: 'Tendon Stretch', price: 88, memberPrice: 78, duration: 60 },
    { id: 's3', cn: '筋膜刀', en: 'Fasciotome', price: 128, memberPrice: 118, duration: 60 },
    { id: 's4', cn: '刮痧', en: 'Guasha', price: 58, memberPrice: 52, duration: 45 },
  ],
  '中医理疗 TCM': [
    { id: 's5', cn: '艾灸', en: 'Moxibustion', price: 68, memberPrice: 62, duration: 45 },
    { id: 's6', cn: '针灸', en: 'Acupuncture', price: 88, memberPrice: 83, duration: 60 },
    { id: 's7', cn: '头疗', en: 'Head Spa', price: 68, memberPrice: 62, duration: 45 },
  ],
  '美容护肤 Beauty': [
    { id: 's8', cn: '基础美容', en: 'Basic Facial', price: 88, memberPrice: 80, duration: 60 },
    { id: 's9', cn: '深层清洁', en: 'Deep Cleanse', price: 128, memberPrice: 116, duration: 75 },
    { id: 's10', cn: '补水保湿', en: 'Hydration Therapy', price: 108, memberPrice: 98, duration: 60 },
  ],
  '美甲 Nail': [
    { id: 's11', cn: '基础美甲', en: 'Basic Nail Art', price: 68, memberPrice: 62, duration: 60 },
    { id: 's12', cn: '精致美甲', en: 'Premium Nail Art', price: 128, memberPrice: 116, duration: 90 },
  ],
};

export const PRODUCTS = [
  { id: 'p1', cn: '木质精油', en: 'Wood Essential Oil', price: 128, memberPrice: 115 },
  { id: 'p2', cn: '艾草精华液', en: 'Mugwort Essence', price: 88, memberPrice: 79 },
  { id: 'p3', cn: '经络活化霜', en: 'Meridian Cream', price: 198, memberPrice: 178 },
  { id: 'p4', cn: '草本沐浴盐', en: 'Herbal Bath Salt', price: 68, memberPrice: 61 },
];

export const PACKAGES = [
  { id: 'pkg1', cn: '推拿10次套餐', en: 'Tuina 10-Session', price: 780, sessions: 10 },
  { id: 'pkg2', cn: '拨筋8次套餐', en: 'Tendon Stretch 8-Session', price: 580, sessions: 8 },
  { id: 'pkg3', cn: '艾灸10次套餐', en: 'Moxibustion 10-Session', price: 580, sessions: 10 },
  { id: 'pkg4', cn: '美容月卡6次', en: 'Facial Monthly 6-Session', price: 480, sessions: 6 },
];

export const MEMBER_TIERS = {
  standard: { label: '普通会员', labelEn: 'Standard', threshold: 0, badgeClass: 'badge-standard', discount: 1.0 },
  silver: { label: '银卡', labelEn: 'Silver $3K', threshold: 3000, badgeClass: 'badge-silver', discount: 0.95 },
  gold: { label: '金卡', labelEn: 'Gold $5K', threshold: 5000, badgeClass: 'badge-gold', discount: 0.92 },
  vip: { label: 'VIP', labelEn: 'VIP $10K', threshold: 10000, badgeClass: 'badge-vip', discount: 0.88 },
  svip: { label: 'SVIP', labelEn: 'SVIP $20K', threshold: 20000, badgeClass: 'badge-svip', discount: 0.85 },
  elite: { label: '至尊', labelEn: 'Elite $50K', threshold: 50000, badgeClass: 'badge-elite', discount: 0.80 },
};

export const MEMBERS = [
  {
    id: 1, name: '李美玲', phone: '9123 4567', tier: 'vip',
    balance: 8240, joinDate: '2022-03-15', lastVisit: '2026-03-06',
    dob: '1982-05-20', address: '九龙湾宏开道15号',
    constitution: '气虚质', allergies: '对薄荷敏感',
    healthNotes: '长期颈椎不适，左肩肌肉紧张，建议每月2-3次推拿调理',
    sessions: [
      { service: '推拿', used: 4, total: 10 },
      { service: '艾灸', used: 2, total: 10 },
    ],
    transactions: [
      { date: '2026-03-06', service: '推拿 Tuina', amount: 78, therapist: '张师傅' },
      { date: '2026-02-20', service: '拨筋 Tendon Stretch', amount: 78, therapist: '陈师傅' },
      { date: '2026-02-05', service: '艾灸 Moxibustion', amount: 62, therapist: '陈师傅' },
      { date: '2026-01-18', service: '推拿 Tuina', amount: 78, therapist: '张师傅' },
    ],
  },
  {
    id: 2, name: '张小红', phone: '9234 5678', tier: 'gold',
    balance: 2150, joinDate: '2023-01-08', lastVisit: '2026-03-01',
    dob: '1990-11-12', address: '铜锣湾轩尼诗道98号',
    constitution: '阴虚质', allergies: '无',
    healthNotes: '睡眠质量欠佳，建议头疗配合艾灸调理',
    sessions: [
      { service: '头疗', used: 3, total: 6 },
    ],
    transactions: [
      { date: '2026-03-01', service: '头疗 Head Spa', amount: 62, therapist: '王师傅' },
      { date: '2026-02-12', service: '美容基础 Facial', amount: 80, therapist: '李老师' },
    ],
  },
  {
    id: 3, name: '王雅婷', phone: '9345 6789', tier: 'svip',
    balance: 15600, joinDate: '2021-06-22', lastVisit: '2026-03-05',
    dob: '1975-08-30', address: '中环皇后大道中100号',
    constitution: '痰湿质', allergies: '对坚果过敏',
    healthNotes: '体型偏胖，建议减脂调理疗程，多做筋膜刀',
    sessions: [
      { service: '筋膜刀', used: 6, total: 10 },
      { service: '推拿', used: 2, total: 10 },
    ],
    transactions: [
      { date: '2026-03-05', service: '筋膜刀 Fasciotome', amount: 118, therapist: '张师傅' },
      { date: '2026-02-22', service: '筋膜刀 Fasciotome', amount: 118, therapist: '张师傅' },
      { date: '2026-02-08', service: '推拿 Tuina', amount: 78, therapist: '陈师傅' },
    ],
  },
  {
    id: 4, name: '陈丽华', phone: '9456 7890', tier: 'silver',
    balance: 680, joinDate: '2024-02-14', lastVisit: '2026-02-28',
    dob: '1995-03-08', address: '荃湾青山道250号',
    constitution: '血瘀质', allergies: '无',
    healthNotes: '长期办公室工作，腰背酸痛',
    sessions: [],
    transactions: [
      { date: '2026-02-28', service: '刮痧 Guasha', amount: 52, therapist: '陈师傅' },
    ],
  },
  {
    id: 5, name: '林秀芳', phone: '9567 8901', tier: 'elite',
    balance: 42800, joinDate: '2020-09-10', lastVisit: '2026-03-07',
    dob: '1968-12-25', address: '浅水湾影湾园1号',
    constitution: '平和质', allergies: '无',
    healthNotes: '整体健康状况良好，定期保养为主',
    sessions: [
      { service: '推拿', used: 1, total: 10 },
      { service: '艾灸', used: 4, total: 10 },
      { service: '美容', used: 2, total: 6 },
    ],
    transactions: [
      { date: '2026-03-07', service: '艾灸 Moxibustion', amount: 62, therapist: '陈师傅' },
      { date: '2026-02-25', service: '推拿 Tuina', amount: 78, therapist: '张师傅' },
      { date: '2026-02-10', service: '美容基础 Facial', amount: 80, therapist: '李老师' },
    ],
  },
  {
    id: 6, name: '刘晓燕', phone: '9678 9012', tier: 'gold',
    balance: 3420, joinDate: '2022-11-30', lastVisit: '2026-02-20',
    dob: '1988-07-15', address: '沙田银城街1号',
    constitution: '湿热质', allergies: '对某些精油敏感',
    healthNotes: '肩颈问题明显，每月定期推拿',
    sessions: [
      { service: '拨筋', used: 5, total: 8 },
    ],
    transactions: [
      { date: '2026-02-20', service: '拨筋 Tendon Stretch', amount: 78, therapist: '陈师傅' },
    ],
  },
  {
    id: 7, name: '赵婷婷', phone: '9789 0123', tier: 'vip',
    balance: 6800, joinDate: '2021-04-18', lastVisit: '2026-03-04',
    dob: '1985-09-22', address: '将军澳唐俊街8号',
    constitution: '气郁质', allergies: '无',
    healthNotes: '情绪压力大，建议针灸配合调理',
    sessions: [
      { service: '针灸', used: 3, total: 10 },
      { service: '头疗', used: 1, total: 6 },
    ],
    transactions: [
      { date: '2026-03-04', service: '针灸 Acupuncture', amount: 83, therapist: '陈师傅' },
      { date: '2026-02-18', service: '头疗 Head Spa', amount: 62, therapist: '王师傅' },
    ],
  },
  {
    id: 8, name: '黄美华', phone: '9890 1234', tier: 'standard',
    balance: 0, joinDate: '2025-08-05', lastVisit: '2026-01-15',
    dob: '1998-01-30', address: '元朗教育路28号',
    constitution: '特禀质', allergies: '对花粉过敏',
    healthNotes: '新会员，首次体验推拿',
    sessions: [],
    transactions: [
      { date: '2026-01-15', service: '推拿 Tuina', amount: 88, therapist: '张师傅' },
    ],
  },
  {
    id: 9, name: '周淑贤', phone: '9901 2345', tier: 'silver',
    balance: 1200, joinDate: '2023-09-12', lastVisit: '2026-02-25',
    dob: '1992-04-18', address: '大埔广福道108号',
    constitution: '阳虚质', allergies: '无',
    healthNotes: '四肢容易冰冷，建议艾灸调理',
    sessions: [
      { service: '艾灸', used: 6, total: 10 },
    ],
    transactions: [
      { date: '2026-02-25', service: '艾灸 Moxibustion', amount: 62, therapist: '陈师傅' },
    ],
  },
  {
    id: 10, name: '吴美华', phone: '9012 3456', tier: 'gold',
    balance: 4780, joinDate: '2022-05-20', lastVisit: '2026-03-02',
    dob: '1980-06-10', address: '香港岛北角英皇道200号',
    constitution: '平和质', allergies: '无',
    healthNotes: '定期美容及推拿，皮肤状况良好',
    sessions: [
      { service: '美容', used: 4, total: 6 },
      { service: '推拿', used: 7, total: 10 },
    ],
    transactions: [
      { date: '2026-03-02', service: '美容深层 Deep Cleanse', amount: 116, therapist: '李老师' },
    ],
  },
  {
    id: 11, name: '郑雅芳', phone: '9123 5678', tier: 'vip',
    balance: 9200, joinDate: '2021-12-01', lastVisit: '2026-03-06',
    dob: '1977-10-05', address: '九龙塘律伦街12号',
    constitution: '气虚质', allergies: '对咖啡因敏感',
    healthNotes: '更年期调理，需特别注意情绪及睡眠',
    sessions: [
      { service: '针灸', used: 2, total: 10 },
      { service: '艾灸', used: 8, total: 10 },
    ],
    transactions: [
      { date: '2026-03-06', service: '针灸 Acupuncture', amount: 83, therapist: '陈师傅' },
      { date: '2026-02-22', service: '艾灸 Moxibustion', amount: 62, therapist: '陈师傅' },
    ],
  },
  {
    id: 12, name: '许淑惠', phone: '9234 6789', tier: 'standard',
    balance: 0, joinDate: '2025-12-10', lastVisit: '2026-02-01',
    dob: '2000-02-14', address: '屯门蓝地青麟路8号',
    constitution: '痰湿质', allergies: '无',
    healthNotes: '学生，学习压力大，头痛频发',
    sessions: [],
    transactions: [
      { date: '2026-02-01', service: '头疗 Head Spa', amount: 68, therapist: '王师傅' },
    ],
  },
];

// Get a week of dates starting from Monday
export function getWeekDates(startDate) {
  const dates = [];
  const d = new Date(startDate);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  for (let i = 0; i < 7; i++) {
    dates.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

export const TIME_SLOTS = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00','20:00','21:00'];

export const APPOINTMENTS = [
  { id: 1, customerId: 1, customer: '李美玲', service: '推拿 Tuina', therapistId: 4, therapist: '张师傅', date: 'mon', time: '09:00', duration: 60, status: 'confirmed', notes: '颈椎重点护理' },
  { id: 2, customerId: 2, customer: '张小红', service: '头疗 Head Spa', therapistId: 2, therapist: '王师傅', date: 'mon', time: '11:00', duration: 45, status: 'confirmed', notes: '' },
  { id: 3, customerId: 3, customer: '王雅婷', service: '筋膜刀 Fasciotome', therapistId: 4, therapist: '张师傅', date: 'mon', time: '14:00', duration: 60, status: 'confirmed', notes: '大腿及腹部重点' },
  { id: 4, customerId: 7, customer: '赵婷婷', service: '针灸 Acupuncture', therapistId: 1, therapist: '陈师傅', date: 'mon', time: '16:00', duration: 60, status: 'pending', notes: '' },
  { id: 5, customerId: 5, customer: '林秀芳', service: '艾灸 Moxibustion', therapistId: 1, therapist: '陈师傅', date: 'tue', time: '10:00', duration: 45, status: 'confirmed', notes: '腰部及腹部' },
  { id: 6, customerId: 10, customer: '吴美华', service: '美容基础 Facial', therapistId: 3, therapist: '李老师', date: 'tue', time: '13:00', duration: 60, status: 'confirmed', notes: '' },
  { id: 7, customerId: 6, customer: '刘晓燕', service: '拨筋 Tendon Stretch', therapistId: 1, therapist: '陈师傅', date: 'tue', time: '15:00', duration: 60, status: 'confirmed', notes: '肩颈' },
  { id: 8, customerId: 11, customer: '郑雅芳', service: '针灸 Acupuncture', therapistId: 1, therapist: '陈师傅', date: 'wed', time: '09:00', duration: 60, status: 'confirmed', notes: '更年期调理' },
  { id: 9, customerId: 4, customer: '陈丽华', service: '刮痧 Guasha', therapistId: 1, therapist: '陈师傅', date: 'wed', time: '11:00', duration: 45, status: 'confirmed', notes: '' },
  { id: 10, customerId: 1, customer: '李美玲', service: '艾灸 Moxibustion', therapistId: 1, therapist: '陈师傅', date: 'wed', time: '14:00', duration: 45, status: 'confirmed', notes: '' },
  { id: 11, customerId: 8, customer: '黄美华', service: '推拿 Tuina', therapistId: 4, therapist: '张师傅', date: 'thu', time: '10:00', duration: 60, status: 'pending', notes: '首次体验' },
  { id: 12, customerId: 9, customer: '周淑贤', service: '艾灸 Moxibustion', therapistId: 1, therapist: '陈师傅', date: 'thu', time: '13:00', duration: 45, status: 'confirmed', notes: '手脚冰冷调理' },
  { id: 13, customerId: 2, customer: '张小红', service: '美容基础 Facial', therapistId: 3, therapist: '李老师', date: 'fri', time: '11:00', duration: 60, status: 'confirmed', notes: '' },
  { id: 14, customerId: 3, customer: '王雅婷', service: '推拿 Tuina', therapistId: 4, therapist: '张师傅', date: 'fri', time: '15:00', duration: 60, status: 'confirmed', notes: '' },
  { id: 15, customerId: 5, customer: '林秀芳', service: '基础美甲 Nail Art', therapistId: 3, therapist: '李老师', date: 'sat', time: '10:00', duration: 60, status: 'confirmed', notes: '' },
  { id: 16, customerId: 7, customer: '赵婷婷', service: '头疗 Head Spa', therapistId: 2, therapist: '王师傅', date: 'sat', time: '14:00', duration: 45, status: 'confirmed', notes: '' },
  { id: 17, customerId: 11, customer: '郑雅芳', service: '艾灸 Moxibustion', therapistId: 1, therapist: '陈师傅', date: 'sun', time: '11:00', duration: 45, status: 'confirmed', notes: '' },
  { id: 18, customerId: 6, customer: '刘晓燕', service: '筋膜刀 Fasciotome', therapistId: 4, therapist: '张师傅', date: 'sun', time: '15:00', duration: 60, status: 'confirmed', notes: '' },
];

export const REVENUE_DATA = [
  { day: '周一 Mon', revenue: 6240 },
  { day: '周二 Tue', revenue: 7820 },
  { day: '周三 Wed', revenue: 5430 },
  { day: '周四 Thu', revenue: 8160 },
  { day: '周五 Fri', revenue: 9340 },
  { day: '周六 Sat', revenue: 11200 },
  { day: '周日 Sun', revenue: 8130 },
];

export const MONTHLY_REVENUE = [
  { month: '十月 Oct', revenue: 142000, members: 248 },
  { month: '十一月 Nov', revenue: 158000, members: 256 },
  { month: '十二月 Dec', revenue: 174000, members: 261 },
  { month: '一月 Jan', revenue: 162000, members: 268 },
  { month: '二月 Feb', revenue: 149000, members: 275 },
  { month: '三月 Mar', revenue: 186420, members: 284 },
];

export const SERVICE_REVENUE = [
  { name: 'TCM 中医', value: 52400, fill: '#C7A98C' },
  { name: '推拿 Tuina', value: 41200, fill: '#3B2B22' },
  { name: '美容 Beauty', value: 38600, fill: '#7A9E7E' },
  { name: '美甲 Nail', value: 22800, fill: '#C7993A' },
  { name: '套餐 Packages', value: 31420, fill: '#E2CFBB' },
];

export const TOP_SERVICES = [
  { rank: 1, service: '推拿 Tuina', sessions: 248, revenue: 19344 },
  { rank: 2, service: '筋膜刀 Fasciotome', sessions: 186, revenue: 21948 },
  { rank: 3, service: '艾灸 Moxibustion', sessions: 204, revenue: 12648 },
  { rank: 4, service: '拨筋 Tendon Stretch', sessions: 168, revenue: 13104 },
  { rank: 5, service: '基础美容 Facial', sessions: 142, revenue: 11360 },
  { rank: 6, service: '头疗 Head Spa', sessions: 138, revenue: 8556 },
  { rank: 7, service: '针灸 Acupuncture', sessions: 96, revenue: 7968 },
  { rank: 8, service: '刮痧 Guasha', sessions: 88, revenue: 4576 },
  { rank: 9, service: '深层美容 Deep Cleanse', sessions: 72, revenue: 8352 },
  { rank: 10, service: '美甲 Nail Art', sessions: 110, revenue: 7480 },
];

export const TIER_DISTRIBUTION = [
  { tier: '普通会员 Standard', count: 48, pct: '16.9%', class: 'badge-standard' },
  { tier: '银卡 Silver', count: 72, pct: '25.4%', class: 'badge-silver' },
  { tier: '金卡 Gold', count: 86, pct: '30.3%', class: 'badge-gold' },
  { tier: 'VIP', count: 52, pct: '18.3%', class: 'badge-vip' },
  { tier: 'SVIP', count: 18, pct: '6.3%', class: 'badge-svip' },
  { tier: '至尊 Elite', count: 8, pct: '2.8%', class: 'badge-elite' },
];

export const STAFF_PERFORMANCE = [
  { name: '陈师傅', specialty: 'TCM', sessions: 286, revenue: 64820, rating: 4.9 },
  { name: '王师傅', specialty: 'Physiotherapy', sessions: 218, revenue: 48400, rating: 4.7 },
  { name: '李老师', specialty: 'Beauty', sessions: 196, revenue: 42600, rating: 4.8 },
  { name: '张师傅', specialty: 'Fasciotome', sessions: 192, revenue: 30600, rating: 4.9 },
];

export const COMMISSION_DATA = [
  { id: 1, name: '陈师傅', serviceComm: 7778, productComm: 420, total: 8198, status: 'pending' },
  { id: 2, name: '王师傅', serviceComm: 5808, productComm: 280, total: 6088, status: 'pending' },
  { id: 3, name: '李老师', serviceComm: 7668, productComm: 560, total: 8228, status: 'pending' },
  { id: 4, name: '张师傅', serviceComm: 4590, productComm: 196, total: 4786, status: 'pending' },
  { id: 5, name: '林助理', serviceComm: 1240, productComm: 88, total: 1328, status: 'paid' },
  { id: 6, name: '陈前台', serviceComm: 0, productComm: 320, total: 320, status: 'paid' },
];

export const COMMISSION_RULES = [
  { service: '推拿 / 拨筋 Tuina/Tendon', rate: '15%' },
  { service: 'TCM 中医理疗', rate: '12%' },
  { service: '美容 / 美甲 Beauty/Nail', rate: '18%' },
  { service: '套餐销售 Packages', rate: '8%' },
  { service: '产品零售 Products', rate: '20%' },
];

export const COMMISSION_BREAKDOWN = {
  1: [
    { date: '2026-03-01', customer: '李美玲', service: '推拿 Tuina', amount: 78, comm: 12 },
    { date: '2026-03-02', customer: '郑雅芳', service: '针灸 Acupuncture', amount: 83, comm: 10 },
    { date: '2026-03-03', customer: '周淑贤', service: '艾灸 Moxibustion', amount: 62, comm: 7 },
    { date: '2026-03-04', customer: '林秀芳', service: '艾灸 Moxibustion', amount: 62, comm: 7 },
    { date: '2026-03-05', customer: '赵婷婷', service: '针灸 Acupuncture', amount: 83, comm: 10 },
  ],
  4: [
    { date: '2026-03-01', customer: '王雅婷', service: '筋膜刀 Fasciotome', amount: 118, comm: 18 },
    { date: '2026-03-02', customer: '李美玲', service: '推拿 Tuina', amount: 78, comm: 12 },
    { date: '2026-03-03', customer: '黄美华', service: '推拿 Tuina', amount: 88, comm: 13 },
    { date: '2026-03-04', customer: '刘晓燕', service: '筋膜刀 Fasciotome', amount: 118, comm: 18 },
  ],
};

export const INVENTORY = [
  { id: 1, name: '当归 Angelica Root', nameEn: 'Angelica Root', category: '中药材 Herbs', stock: 2.5, unit: 'kg', alert: 1, status: 'ok' },
  { id: 2, name: '艾叶 Mugwort Leaf', nameEn: 'Mugwort Leaf', category: '中药材 Herbs', stock: 8.2, unit: 'kg', alert: 2, status: 'ok' },
  { id: 3, name: '红花 Safflower', nameEn: 'Safflower', category: '中药材 Herbs', stock: 0.8, unit: 'kg', alert: 1, status: 'low' },
  { id: 4, name: '木质精油 Wood Oil', nameEn: 'Wood Essential Oil', category: '精油 Oils', stock: 12, unit: 'bottles', alert: 5, status: 'ok' },
  { id: 5, name: '薰衣草精油 Lavender Oil', nameEn: 'Lavender Oil', category: '精油 Oils', stock: 3, unit: 'bottles', alert: 5, status: 'low' },
  { id: 6, name: '玫瑰精油 Rose Oil', nameEn: 'Rose Oil', category: '精油 Oils', stock: 0, unit: 'bottles', alert: 3, status: 'out' },
  { id: 7, name: '一次性床单 Bed Sheets', nameEn: 'Disposable Bed Sheet', category: '耗材 Consumables', stock: 480, unit: 'pcs', alert: 100, status: 'ok' },
  { id: 8, name: '一次性毛巾 Towels', nameEn: 'Disposable Towel', category: '耗材 Consumables', stock: 85, unit: 'pcs', alert: 100, status: 'low' },
  { id: 9, name: '手套 Gloves', nameEn: 'Gloves', category: '耗材 Consumables', stock: 600, unit: 'pairs', alert: 200, status: 'ok' },
  { id: 10, name: '针灸针 Acupuncture Needles', nameEn: 'Acupuncture Needles', category: '仪器耗材 Equipment', stock: 2000, unit: 'pcs', alert: 500, status: 'ok' },
  { id: 11, name: '刮痧板 Guasha Board', nameEn: 'Guasha Board', category: '仪器耗材 Equipment', stock: 8, unit: 'pcs', alert: 3, status: 'ok' },
  { id: 12, name: '艾灸盒 Moxibustion Box', nameEn: 'Moxibustion Box', category: '仪器耗材 Equipment', stock: 2, unit: 'pcs', alert: 3, status: 'low' },
  { id: 13, name: '经络活化霜 Meridian Cream', nameEn: 'Meridian Cream', category: '精油 Oils', stock: 24, unit: 'tubes', alert: 10, status: 'ok' },
  { id: 14, name: '草本浴盐 Herbal Bath Salt', nameEn: 'Herbal Bath Salt', category: '耗材 Consumables', stock: 36, unit: 'bags', alert: 15, status: 'ok' },
  { id: 15, name: '艾草精华液 Mugwort Essence', nameEn: 'Mugwort Essence', category: '精油 Oils', stock: 0, unit: 'bottles', alert: 5, status: 'out' },
];

export const CAMPAIGNS = [
  { id: 1, name: '三月生日优惠 Birthday Special', target: 'VIP生日会员', channel: 'WeChat', status: 'active', sent: 12, converted: 9, rate: '75%' },
  { id: 2, name: '银卡升级提醒 Silver Upgrade', target: '银卡会员', channel: 'SMS', status: 'active', sent: 72, converted: 18, rate: '25%' },
  { id: 3, name: '流失召回 60天未到访 Lapse Recall', target: '60天未到访会员', channel: 'WeChat', status: 'active', sent: 34, converted: 11, rate: '32%' },
  { id: 4, name: '三八妇女节特惠 Women\'s Day', target: '全体会员', channel: 'WeChat + SMS', status: 'completed', sent: 284, converted: 86, rate: '30%' },
];

export const HEATMAP_DATA = (() => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const hours = ['9am','10am','11am','12pm','1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm'];
  const weights = {
    Mon: [1, 2, 3, 1, 2, 4, 5, 4, 3, 2, 1, 1, 0],
    Tue: [1, 3, 4, 2, 3, 5, 6, 5, 4, 2, 1, 1, 0],
    Wed: [2, 3, 5, 2, 4, 6, 7, 5, 3, 2, 1, 1, 0],
    Thu: [1, 2, 4, 2, 3, 5, 6, 5, 4, 3, 2, 1, 0],
    Fri: [2, 4, 6, 3, 5, 7, 8, 7, 5, 3, 2, 1, 0],
    Sat: [3, 6, 8, 5, 7, 9, 10, 8, 6, 4, 3, 2, 1],
    Sun: [2, 5, 7, 4, 6, 8, 9, 7, 5, 3, 2, 1, 0],
  };
  return { days, hours, weights };
})();
