import { useState } from 'react'
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, PieChart, Pie, Cell, ComposedChart
} from 'recharts'
import {
  MONTHLY_REVENUE, SERVICE_REVENUE, TOP_SERVICES, TIER_DISTRIBUTION,
  STAFF_PERFORMANCE, HEATMAP_DATA
} from '../data/fakeData'

const DATE_RANGES = ['本月 This Month', '上月 Last Month', '本季 This Quarter', '自定义 Custom']

const KPI_DATA = [
  { cn: '总营业额', en: 'Total Revenue', value: '$186,420', icon: '💵', change: '+12.3%' },
  { cn: '新增会员', en: 'New Members', value: '34', icon: '👤', change: '+8 vs last month' },
  { cn: '服务次数', en: 'Service Sessions', value: '892', icon: '✨', change: '+6.4%' },
  { cn: '平均客单价', en: 'Avg Spend/Visit', value: '$209', icon: '📈', change: '+5.1%' },
  { cn: '会员续费率', en: 'Renewal Rate', value: '78%', icon: '🔄', change: '+2.1%' },
  { cn: '员工效率', en: 'Staff Utilization', value: '84%', icon: '⚡', change: '+1.5%' },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--brand-dark)', padding: '10px 14px', borderRadius: 8, color: 'var(--white)', minWidth: 160 }}>
        <div style={{ fontFamily: 'Noto Serif SC', fontSize: 12, marginBottom: 6, color: 'var(--brand-primary)' }}>{label}</div>
        {payload.map(p => (
          <div key={p.dataKey} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, marginBottom: 3 }}>
            <span style={{ fontSize: 11, fontFamily: 'Lora', color: p.color }}>{p.name}</span>
            <span style={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: 14 }}>
              {p.dataKey === 'revenue' ? `$${p.value.toLocaleString()}` : p.value}
            </span>
          </div>
        ))}
      </div>
    )
  }
  return null
}

const PieTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--brand-dark)', padding: '8px 12px', borderRadius: 8, color: 'var(--white)' }}>
        <div style={{ fontFamily: 'Noto Serif SC', fontSize: 12, color: 'var(--brand-primary)' }}>{payload[0].name}</div>
        <div style={{ fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 700 }}>${payload[0].value.toLocaleString()}</div>
      </div>
    )
  }
  return null
}

function HeatmapGrid() {
  const { days, hours, weights } = HEATMAP_DATA
  const maxVal = 10

  const getColor = (val) => {
    const intensity = val / maxVal
    if (intensity === 0) return 'rgba(212,191,168,0.15)'
    if (intensity < 0.3) return `rgba(199,169,140,${0.2 + intensity * 0.4})`
    if (intensity < 0.6) return `rgba(199,169,140,${0.5 + intensity * 0.3})`
    if (intensity < 0.8) return `rgba(59,43,34,${0.5 + intensity * 0.3})`
    return `rgba(59,43,34,${0.7 + intensity * 0.2})`
  }

  return (
    <div>
      <div className="heatmap-header">
        <div style={{ width: 40 }} />
        {days.map(d => (
          <div key={d} className="heatmap-day-label">{d}</div>
        ))}
      </div>
      <div className="heatmap-grid">
        {hours.map((h, hi) => (
          <div key={h} className="heatmap-row">
            <div className="heatmap-time-label">{h}</div>
            {days.map(d => {
              const val = weights[d][hi]
              return (
                <div
                  key={d}
                  className="heatmap-cell"
                  style={{ background: getColor(val) }}
                  title={`${d} ${h}: ${val} bookings`}
                >
                  {val > 0 ? val : ''}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, paddingLeft: 52, fontSize: 11, fontFamily: 'Lora', color: 'var(--text-secondary)' }}>
        <span>空闲 Low</span>
        {[0.15, 0.35, 0.55, 0.75, 0.95].map((v, i) => (
          <div key={i} style={{ width: 20, height: 12, borderRadius: 2, background: `rgba(199,169,140,${v})` }} />
        ))}
        <span>繁忙 High</span>
      </div>
    </div>
  )
}

export default function Analytics() {
  const [dateRange, setDateRange] = useState(0)

  return (
    <div>
      {/* Date range tabs */}
      <div className="date-range-tabs">
        {DATE_RANGES.map((r, i) => (
          <button
            key={r}
            className={`date-range-tab ${dateRange === i ? 'active' : ''}`}
            onClick={() => setDateRange(i)}
          >
            {r}
          </button>
        ))}
      </div>

      {/* KPI cards */}
      <div className="kpi-cards-6">
        {KPI_DATA.map(k => (
          <div key={k.cn} className="kpi-card">
            <div className="kpi-icon">{k.icon}</div>
            <div className="kpi-value">{k.value}</div>
            <span className="kpi-label-cn">{k.cn}</span>
            <span className="kpi-label-en">{k.en}</span>
            <div style={{ fontSize: 10, color: 'var(--success)', marginTop: 6, fontFamily: 'Lora' }}>{k.change}</div>
          </div>
        ))}
      </div>

      {/* Revenue + Pie charts */}
      <div className="analytics-grid-2" style={{ marginBottom: 20 }}>
        <div className="card">
          <div className="card-header">
            <div>
              <span className="card-title-cn">月度营业额 & 会员增长</span>
              <span className="card-title-en">Monthly Revenue & Member Growth (6 months)</span>
            </div>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={240}>
              <ComposedChart data={MONTHLY_REVENUE} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,191,168,0.3)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 10, fontFamily: 'Noto Serif SC', fill: '#6B5648' }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="left" tick={{ fontSize: 10, fontFamily: 'Lora', fill: '#6B5648' }} axisLine={false} tickLine={false} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 10, fontFamily: 'Lora', fill: '#6B5648' }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(199,169,140,0.08)' }} />
                <Legend
                  formatter={(value) => <span style={{ fontSize: 11, fontFamily: 'Lora', color: '#6B5648' }}>{value === 'revenue' ? '营业额 Revenue' : '会员数 Members'}</span>}
                />
                <Bar yAxisId="left" dataKey="revenue" name="revenue" fill="var(--brand-primary)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Line yAxisId="right" type="monotone" dataKey="members" name="members" stroke="var(--brand-dark)" strokeWidth={2.5} dot={{ fill: 'var(--brand-dark)', strokeWidth: 2, r: 4 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <span className="card-title-cn">服务类别营收占比</span>
              <span className="card-title-en">Revenue by Service Category</span>
            </div>
          </div>
          <div className="card-body">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  data={SERVICE_REVENUE}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={100}
                  dataKey="value"
                  nameKey="name"
                  paddingAngle={3}
                >
                  {SERVICE_REVENUE.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<PieTooltip />} />
                <Legend
                  formatter={(value) => <span style={{ fontSize: 11, fontFamily: 'Noto Serif SC', color: '#6B5648' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables row */}
      <div className="analytics-grid-2" style={{ marginBottom: 20 }}>
        <div className="card">
          <div className="card-header">
            <div>
              <span className="card-title-cn">服务营收排行</span>
              <span className="card-title-en">Top 10 Services by Revenue</span>
            </div>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>服务 Service</th>
                  <th>次数 Sessions</th>
                  <th>营收 Revenue</th>
                </tr>
              </thead>
              <tbody>
                {TOP_SERVICES.map(s => (
                  <tr key={s.rank}>
                    <td style={{ fontFamily: 'Playfair Display', fontWeight: 700, color: s.rank <= 3 ? 'var(--brand-primary)' : 'var(--text-secondary)' }}>
                      {s.rank <= 3 ? '🥇🥈🥉'[s.rank - 1] : s.rank}
                    </td>
                    <td style={{ fontFamily: 'Noto Serif SC', fontWeight: 500 }}>{s.service}</td>
                    <td style={{ fontFamily: 'Lora' }}>{s.sessions}</td>
                    <td style={{ fontFamily: 'Playfair Display', fontWeight: 700, color: 'var(--brand-dark)' }}>${s.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <span className="card-title-cn">会员等级分布</span>
              <span className="card-title-en">Member Tier Distribution</span>
            </div>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>等级 Tier</th>
                  <th>人数 Count</th>
                  <th>占比 %</th>
                  <th>分布 Bar</th>
                </tr>
              </thead>
              <tbody>
                {TIER_DISTRIBUTION.map(t => (
                  <tr key={t.tier}>
                    <td><span className={`badge ${t.class}`}>{t.tier.split(' ')[0]}</span></td>
                    <td style={{ fontFamily: 'Playfair Display', fontWeight: 700 }}>{t.count}</td>
                    <td style={{ fontFamily: 'Lora', color: 'var(--text-secondary)' }}>{t.pct}</td>
                    <td style={{ width: 100 }}>
                      <div style={{ background: 'var(--background)', borderRadius: 4, height: 8, overflow: 'hidden' }}>
                        <div style={{ width: t.pct, height: '100%', background: 'var(--brand-primary)', borderRadius: 4 }} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'Lora' }}>
            <span>总计 Total: 284 members</span>
          </div>
        </div>
      </div>

      {/* Heatmap + Staff table */}
      <div className="analytics-grid-2">
        <div className="card">
          <div className="card-header">
            <div>
              <span className="card-title-cn">预约热力图</span>
              <span className="card-title-en">Booking Density Heatmap</span>
            </div>
          </div>
          <div className="card-body" style={{ padding: '12px 16px' }}>
            <HeatmapGrid />
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <span className="card-title-cn">员工绩效</span>
              <span className="card-title-en">Staff Performance</span>
            </div>
          </div>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>员工 Staff</th>
                  <th>服务次数 Sessions</th>
                  <th>营收 Revenue</th>
                  <th>评分 Rating</th>
                </tr>
              </thead>
              <tbody>
                {STAFF_PERFORMANCE.map(s => (
                  <tr key={s.name}>
                    <td>
                      <div style={{ fontFamily: 'Noto Serif SC', fontWeight: 600 }}>{s.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'Lora' }}>{s.specialty}</div>
                    </td>
                    <td style={{ fontFamily: 'Playfair Display', fontWeight: 700 }}>{s.sessions}</td>
                    <td style={{ fontFamily: 'Playfair Display', fontWeight: 700, color: 'var(--brand-primary)' }}>${s.revenue.toLocaleString()}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ color: '#f0c040', fontSize: 14 }}>★</span>
                        <span style={{ fontFamily: 'Playfair Display', fontWeight: 700 }}>{s.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'Lora' }}>
              <span>总服务次数 Total Sessions: 892</span>
              <span>总营收 Total Revenue: $186,420</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
