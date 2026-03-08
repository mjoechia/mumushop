# 木木d店 · Mumuddian Wellness ERP — Demo

**Live Demo:** https://mjoechia.github.io/mumushop/

A sales demo for a premium Traditional Chinese Medicine (TCM) and wellness spa chain management system. Built to showcase ERP capabilities across bookings, POS, CRM, analytics, inventory, staff commissions, and marketing automation.

---

## The Business

**木木d店 (Mumuddian)** is a premium Chinese wellness therapy chain offering an integrated suite of TCM and modern wellness services. Their clientele skews female, values holistic health, and operates on a high-value membership model with tiered top-up levels.

### Service Categories

| Category | Services |
|----------|----------|
| 镇店之宝 Flagship | Tuina 推拿, Herbal Oil Meridian Dredging, Fasciotome 筋膜刀, Moxibustion 艾灸, Tendon Stretching 拨筋 |
| 中医 TCM | Consultation 挂号, Acupuncture 针灸, Guasha/Cupping 刮痧/拔罐, Chinese Herb Bath 中药浴, TCM Foot Soak |
| 物理治疗 Physiotherapy | Post-surgical rehab, Stroke & neurological rehab, Sports injury, Scoliosis, Chronic pain management |
| 筋膜刀 Fasciotome | Head / Neck & Shoulder / Back / Lumbar / Limb / Plantar myofascial release |
| 拨筋 Tendon Stretching | Facial meridian therapy, Head / Neck / Abdominal / Limb stretching |
| 头疗 Head Spa | Basic Scalp, Herbal Sleep, Jingyan Shuheng, Revitalizing Hair Growth |
| 美容 Beauty | Basic Facial, Meridian Lifting, Advanced Therapy, Body Whitening |
| 美甲 Nail Art | Natural nails, Extensions, Eyelashes, Makeup, Semi-permanent |
| 调理套盒 Therapy Kits | Neck & Shoulder / Spleen & Stomach / Breast / Ovarian / TCM Kidney kits |

### Pricing Logic
- **Original price** applies to walk-in customers
- **Member price** applies automatically based on tier
- **Small package (小疗程):** Buy $1,000 get $100 bonus sessions (most flagship services)
- **Therapy kits (套盒):** Fixed 10-session packages at $2,280–$3,680
- **Physiotherapy** does not participate in member discounts

### Membership Tiers

| Tier | Top-up Required | Benefits |
|------|----------------|---------|
| 普通会员 Standard | $3,000 | Member pricing, free infrared sauna |
| 银卡 Silver | $5,000 | 8.8折 (12% off), acupuncture 9.2折, free sauna + family |
| VIP 金卡 | $10,000 | 8.5折 (15% off), acupuncture 9折, VIP slippers/tea set/oil |
| SVIP | $20,000 | 8折 (20% off), acupuncture 8.8折, VIP gifts |
| 至尊 Prestige | $50,000+ | Custom expert wellness plan + premium health check + medical concierge |

---

## ERP System Modules

### 1. 总览 Dashboard
Entry overview for managers. Shows today's bookings, monthly revenue, active member count, and a 7-day revenue chart. Quick-access buttons for common actions.

### 2. 预约日历 Booking Calendar
Weekly appointment grid (9am–9pm, Mon–Sun) with therapist colour-coding. Staff can view their schedule, create new bookings, and inspect appointment details. Connects online booking flow to the backend calendar.

### 3. 收银台 POS — Point of Sale
The primary daily transaction interface. Supports:
- Member lookup with auto-applied tier discount
- Walk-in customers
- Service and product selection by category
- Cart management with line-item controls
- Payment via Cash / Card / WeChat Pay / Alipay / Member Balance
- Session/package redemption
- Receipt generation and member balance top-up

### 4. 会员管理 CRM
Full customer lifecycle management:
- Searchable member list with tier badges and session balances
- Individual profiles with health notes and TCM constitution type (体质)
- Visit and transaction history timeline
- Package balance tracker (sessions used vs. remaining)
- Health records for treatment continuity

### 5. 数据分析 Analytics
Management intelligence dashboard:
- Revenue KPIs, new member growth, average spend, renewal rate, staff utilisation
- Monthly revenue + member growth trend chart
- Revenue breakdown by service category (donut chart)
- Booking density heatmap by day/hour
- Top-10 services and member tier distribution tables
- Staff performance table

### 6. 员工提成 Staff Commission
Tracks and calculates therapist commissions:
- Per-service commission rates (15% Tuina/Fasciotome, 12% TCM, 18% Beauty, 20% product retail)
- Monthly summary per therapist
- Drill-down to individual session breakdown
- Payout status tracking (pending / paid)

### 7. 进销存 Inventory Management
Stock control for consumables, herbs, oils, and equipment supplies:
- Real-time stock level with alert thresholds
- Stock-in / stock-out modals
- Product categories: herbs 中药材, oils 精油, consumables 耗材, equipment supplies
- Usage trend chart per product
- Auto-deduct on POS checkout (flow concept)

### 8. 促销活动 Marketing Promotions
Automated campaign management:
- Pre-built trigger templates: Birthday Special, Tier Upgrade Nudge, Lapsed Member Recall
- Target segmentation by tier, last visit date, or all members
- Channels: WeChat, SMS, In-app
- 4-step campaign wizard: Template → Target → Channel → Preview & Send
- Active campaign performance tracking (sent / conversion)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Routing | React Router DOM v6 |
| Charts | Recharts |
| Styling | CSS Variables (no framework) |
| Fonts | Playfair Display, Lora, Noto Serif SC (Google Fonts) |
| Deployment | GitHub Pages via `gh-pages` |

---

## Brand Design System

| Token | Value | Usage |
|-------|-------|-------|
| `--brand-primary` | `#C7A98C` | Cards, buttons, highlights |
| `--brand-secondary` | `#E2CFBB` | Panels, section backgrounds |
| `--brand-dark` | `#3B2B22` | Headlines, primary buttons |
| `--background` | `#F6F1EC` | Page background |
| `--text-primary` | `#3B2B22` | Body text |
| `--text-secondary` | `#6B5648` | Labels, metadata |

The visual identity communicates **premium traditional wellness** — warm, organic, calm, and credible. Not clinical, not cheap.

---

## Local Development

```bash
cd demo/
npm install
npm run dev        # http://localhost:5173
```

## Deploy to GitHub Pages

```bash
npm run deploy     # builds + pushes to gh-pages branch
```

---

## Demo Narrative (Sales Flow)

1. **Customer books online** → appears on Booking Calendar
2. **Therapist completes session** → POS checkout with member discount auto-applied
3. **Session recorded** → inventory deducted, commission calculated
4. **Auto promotion triggered** → WeChat follow-up / upgrade nudge sent
5. **Manager reviews analytics** → revenue, top services, member tier breakdown
6. **CRM lookup** → full customer history, remaining sessions, health notes
