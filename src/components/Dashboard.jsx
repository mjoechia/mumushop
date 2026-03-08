import { useNavigate } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { REVENUE_DATA, APPOINTMENTS } from '../data/fakeData'

const todayAppts = APPOINTMENTS.filter(a => a.date === 'mon').slice(0, 7)

const statusLabels = {
  confirmed: { label: '已确认 Confirmed', cls: 'badge-success' },
  pending: { label: '待确认 Pending', cls: 'badge-warning' },
  completed: { label: '已完成 Done', cls: 'badge-standard' },
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: 'var(--brand-dark)', padding: '10px 14px', borderRadius: 8, color: 'var(--white)' }}>
        <div style={{ fontFamily: 'Noto Serif SC', fontSize: 12, marginBottom: 4 }}>{label}</div>
        <div style={{ fontFamily: 'Playfair Display', fontSize: 18, fontWeight: 700, color: 'var(--brand-primary)' }}>
          ${payload[0].value.toLocaleString()}
        </div>
      </div>
    )
  }
  return null
}

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div>
      {/* Stat Cards */}
      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <span className="stat-label-cn">今日预约</span>
          <span className="stat-label-en">Today's Bookings</span>
          <div className="stat-value">12</div>
          <div className="stat-change">↑ 2 vs yesterday</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💵</div>
          <span className="stat-label-cn">本月营业额</span>
          <span className="stat-label-en">Monthly Revenue</span>
          <div className="stat-value">$48,320</div>
          <div className="stat-change">↑ 8.4% vs last month</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <span className="stat-label-cn">活跃会员</span>
          <span className="stat-label-en">Active Members</span>
          <div className="stat-value">284</div>
          <div className="stat-change">↑ 9 new this month</div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚠️</div>
          <span className="stat-label-cn">待处理事项</span>
          <span className="stat-label-en">Pending Tasks</span>
          <div className="stat-value" style={{ color: 'var(--warning)' }}>5</div>
          <div className="stat-change" style={{ color: 'var(--warning)' }}>Needs attention</div>
        </div>
      </div>

      {/* Main grid */}
      <div className="dashboard-grid">
        {/* Today's appointments */}
        <div className="card">
          <div className="card-header">
            <div>
              <span className="card-title-cn">今日预约</span>
              <span className="card-title-en">Today's Appointments</span>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('/calendar')}>
              查看全部 View All
            </button>
          </div>
          <div className="card-body" style={{ padding: '8px 22px' }}>
            <ul className="appointment-list">
              {todayAppts.map(appt => (
                <li key={appt.id} className="appointment-item">
                  <div className="appt-time">{appt.time}</div>
                  <div className="appt-info">
                    <span className="appt-customer">{appt.customer}</span>
                    <span className="appt-service">{appt.service}</span>
                  </div>
                  <div className="appt-therapist" style={{ fontFamily: 'Noto Serif SC', fontSize: 12 }}>
                    {appt.therapist}
                  </div>
                  <span className={`badge ${statusLabels[appt.status]?.cls}`} style={{ fontSize: 10 }}>
                    {appt.status === 'confirmed' ? '已确认' : appt.status === 'pending' ? '待确认' : '已完成'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Quick actions */}
        <div className="card">
          <div className="card-header">
            <div>
              <span className="card-title-cn">快速操作</span>
              <span className="card-title-en">Quick Actions</span>
            </div>
          </div>
          <div className="card-body">
            <div className="quick-actions">
              <button className="quick-action-btn" onClick={() => navigate('/calendar')}>
                <div className="qa-icon">📅</div>
                <div>
                  <span className="qa-label-cn">新增预约</span>
                  <span className="qa-label-en">New Booking</span>
                </div>
              </button>
              <button className="quick-action-btn" onClick={() => navigate('/crm')}>
                <div className="qa-icon">👤</div>
                <div>
                  <span className="qa-label-cn">新增会员</span>
                  <span className="qa-label-en">Add Member</span>
                </div>
              </button>
              <button className="quick-action-btn" onClick={() => navigate('/pos')}>
                <div className="qa-icon">💳</div>
                <div>
                  <span className="qa-label-cn">开启收银台</span>
                  <span className="qa-label-en">Open POS</span>
                </div>
              </button>
              <button className="quick-action-btn" onClick={() => navigate('/inventory')}>
                <div className="qa-icon">📦</div>
                <div>
                  <span className="qa-label-cn">库存预警 (2)</span>
                  <span className="qa-label-en">Low Stock Alert</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue chart */}
      <div className="card">
        <div className="card-header">
          <div>
            <span className="card-title-cn">近7日营业额</span>
            <span className="card-title-en">Revenue — Last 7 Days</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontFamily: 'Playfair Display' }}>
            Total: $<strong style={{ color: 'var(--brand-dark)', fontSize: 16 }}>56,320</strong>
          </div>
        </div>
        <div className="card-body">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={REVENUE_DATA} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,191,168,0.3)" vertical={false} />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 11, fontFamily: 'Noto Serif SC', fill: '#6B5648' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fontFamily: 'Lora', fill: '#6B5648' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={v => `$${(v/1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(199,169,140,0.08)' }} />
              <Bar dataKey="revenue" fill="var(--brand-primary)" radius={[6, 6, 0, 0]} maxBarSize={56} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
