import { useState } from 'react'
import { MEMBERS, MEMBER_TIERS } from '../data/fakeData'

const TIER_OPTIONS = [
  { value: 'all', label: '全部 All' },
  { value: 'standard', label: '普通会员' },
  { value: 'silver', label: '银卡' },
  { value: 'gold', label: '金卡' },
  { value: 'vip', label: 'VIP' },
  { value: 'svip', label: 'SVIP' },
  { value: 'elite', label: '至尊' },
]

const MEMBER_DETAIL_TABS = ['基本信息 Profile', '消费记录 History', '疗程余额 Sessions', '健康档案 Health']

function TierBadge({ tier }) {
  const t = MEMBER_TIERS[tier] || MEMBER_TIERS.standard
  return <span className={`badge ${t.badgeClass}`}>{t.label}</span>
}

function MemberDetailPanel({ member, onClose }) {
  const [activeTab, setActiveTab] = useState(0)

  if (!member) return null

  const tier = MEMBER_TIERS[member.tier] || MEMBER_TIERS.standard

  return (
    <div className="card" style={{ position: 'sticky', top: 0 }}>
      {/* Profile header */}
      <div className="member-profile-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div className="member-profile-name">{member.name}</div>
            <div className="member-profile-phone">{member.phone}</div>
            <div style={{ marginTop: 10 }}>
              <TierBadge tier={member.tier} />
              <span style={{ marginLeft: 10, fontSize: 12, color: 'rgba(226,207,187,0.7)', fontFamily: 'Lora' }}>
                {Math.round((1 - tier.discount) * 100)}% discount
              </span>
            </div>
            <div style={{ marginTop: 8, fontSize: 18, color: 'var(--brand-primary)', fontFamily: 'Playfair Display', fontWeight: 700 }}>
              ${member.balance.toLocaleString()} <span style={{ fontSize: 11, fontFamily: 'Lora', color: 'rgba(226,207,187,0.6)', fontWeight: 400 }}>balance</span>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'rgba(226,207,187,0.6)', cursor: 'pointer', fontSize: 22 }}>
            ×
          </button>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 12, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 11, background: 'rgba(199,169,140,0.15)', color: 'var(--brand-primary)', padding: '3px 8px', borderRadius: 10, fontFamily: 'Lora' }}>
            入会 {member.joinDate}
          </div>
          <div style={{ fontSize: 11, background: 'rgba(199,169,140,0.15)', color: 'var(--brand-primary)', padding: '3px 8px', borderRadius: 10, fontFamily: 'Lora' }}>
            上次 {member.lastVisit}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs" style={{ paddingTop: 0 }}>
        {MEMBER_DETAIL_TABS.map((t, i) => (
          <button
            key={t}
            className={`tab-item ${activeTab === i ? 'active' : ''}`}
            style={{ fontSize: 12, padding: '8px 12px' }}
            onClick={() => setActiveTab(i)}
          >
            {t}
          </button>
        ))}
      </div>

      <div style={{ padding: '18px 20px' }}>
        {/* Profile tab */}
        {activeTab === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              { label: '出生日期 DOB', value: member.dob },
              { label: '地址 Address', value: member.address },
              { label: '中医体质 Constitution', value: member.constitution },
              { label: '过敏史 Allergies', value: member.allergies },
            ].map(row => (
              <div key={row.label} style={{ borderBottom: '1px solid var(--border)', paddingBottom: 10 }}>
                <div style={{ fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'Noto Serif SC', marginBottom: 3, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{row.label}</div>
                <div style={{ fontSize: 13, color: 'var(--brand-dark)', fontFamily: 'Noto Serif SC' }}>{row.value}</div>
              </div>
            ))}
            <div style={{ marginTop: 4 }}>
              <button className="btn btn-outline btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                ✏ 编辑资料 Edit Profile
              </button>
            </div>
          </div>
        )}

        {/* Transaction history */}
        {activeTab === 1 && (
          <div>
            {member.transactions.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📋</div>
                <span className="empty-state-text">暂无消费记录</span>
              </div>
            ) : (
              <div>
                {member.transactions.map((tx, i) => (
                  <div key={i} style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 0', borderBottom: '1px solid rgba(212,191,168,0.35)'
                  }}>
                    <div>
                      <div style={{ fontFamily: 'Noto Serif SC', fontSize: 13, fontWeight: 600, color: 'var(--brand-dark)' }}>{tx.service}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'Lora' }}>{tx.date} · {tx.therapist}</div>
                    </div>
                    <div style={{ fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 700, color: 'var(--brand-dark)' }}>
                      ${tx.amount}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Sessions */}
        {activeTab === 2 && (
          <div>
            {member.sessions.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">🎟</div>
                <span className="empty-state-text">暂无套餐</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {member.sessions.map((s, i) => {
                  const pct = Math.round((s.used / s.total) * 100)
                  return (
                    <div key={i} style={{ background: 'var(--background)', borderRadius: 8, padding: '12px 14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontFamily: 'Noto Serif SC', fontSize: 13, fontWeight: 600, color: 'var(--brand-dark)' }}>{s.service}</span>
                        <span style={{ fontFamily: 'Playfair Display', fontSize: 14, color: 'var(--brand-primary)' }}>
                          {s.total - s.used} <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'Lora' }}>/ {s.total} left</span>
                        </span>
                      </div>
                      <div style={{ background: 'var(--border)', borderRadius: 4, height: 6, overflow: 'hidden' }}>
                        <div style={{ width: `${pct}%`, height: '100%', background: 'var(--brand-primary)', borderRadius: 4 }} />
                      </div>
                      <div style={{ fontSize: 10, color: 'var(--text-secondary)', marginTop: 4, fontFamily: 'Lora' }}>{s.used} used · {s.total - s.used} remaining</div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* Health records */}
        {activeTab === 3 && (
          <div>
            <div style={{ background: 'rgba(199,169,140,0.08)', border: '1px solid var(--border)', borderRadius: 8, padding: '14px 16px', marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'Noto Serif SC', marginBottom: 6 }}>治疗师备注 Therapist Notes</div>
              <div style={{ fontSize: 13, color: 'var(--text-primary)', fontFamily: 'Noto Serif SC', lineHeight: 1.8 }}>{member.healthNotes}</div>
            </div>
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'Noto Serif SC', marginBottom: 6 }}>中医体质 TCM Constitution Type</div>
              <span className="badge badge-primary" style={{ fontSize: 13, padding: '5px 14px' }}>{member.constitution}</span>
            </div>
            <textarea
              className="form-textarea"
              rows={3}
              placeholder="添加新备注... Add new health note..."
              style={{ marginTop: 14 }}
            />
            <button className="btn btn-secondary btn-sm" style={{ marginTop: 8, width: '100%', justifyContent: 'center' }}>
              保存备注 Save Note
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function CRM() {
  const [search, setSearch] = useState('')
  const [tierFilter, setTierFilter] = useState('all')
  const [selectedMember, setSelectedMember] = useState(MEMBERS[0])
  const [showAddModal, setShowAddModal] = useState(false)

  const filtered = MEMBERS.filter(m => {
    const matchSearch = m.name.includes(search) || m.phone.includes(search)
    const matchTier = tierFilter === 'all' || m.tier === tierFilter
    return matchSearch && matchTier
  })

  return (
    <div>
      {/* Top bar */}
      <div className="section-header">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="search-bar">
            <span>🔍</span>
            <input
              placeholder="搜索姓名/手机 Search..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <select
            className="form-select"
            style={{ width: 150, padding: '7px 10px', fontSize: 13 }}
            value={tierFilter}
            onChange={e => setTierFilter(e.target.value)}
          >
            {TIER_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          ＋ 新增会员 Add Member
        </button>
      </div>

      <div className="crm-layout">
        {/* Member table */}
        <div className="card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>姓名 Name</th>
                  <th>手机 Phone</th>
                  <th>会员等级 Tier</th>
                  <th>余额 Balance</th>
                  <th>上次到访 Last Visit</th>
                  <th>疗程 Sessions</th>
                  <th>操作 Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(m => (
                  <tr
                    key={m.id}
                    className={`member-row ${selectedMember?.id === m.id ? 'selected' : ''}`}
                    onClick={() => setSelectedMember(m)}
                  >
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div className="member-avatar">{m.name[0]}</div>
                        <span style={{ fontFamily: 'Noto Serif SC', fontWeight: 600 }}>{m.name}</span>
                      </div>
                    </td>
                    <td style={{ fontFamily: 'Lora', color: 'var(--text-secondary)' }}>{m.phone}</td>
                    <td><TierBadge tier={m.tier} /></td>
                    <td>
                      <span style={{ fontFamily: 'Playfair Display', fontWeight: 600, color: m.balance > 0 ? 'var(--brand-dark)' : 'var(--text-secondary)' }}>
                        ${m.balance.toLocaleString()}
                      </span>
                    </td>
                    <td style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'Lora' }}>{m.lastVisit}</td>
                    <td>
                      {m.sessions.length > 0 ? (
                        <span style={{ fontSize: 12, fontFamily: 'Noto Serif SC' }}>
                          {m.sessions.map(s => `${s.service}: ${s.total - s.used}`).join(', ')}
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-secondary)', fontSize: 12 }}>—</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: 6 }} onClick={e => e.stopPropagation()}>
                        <button className="btn btn-outline btn-sm" onClick={() => setSelectedMember(m)}>
                          查看 View
                        </button>
                        <button className="btn btn-secondary btn-sm">
                          储值 Top Up
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'Lora' }}>
            显示 {filtered.length} / {MEMBERS.length} 位会员 · Showing {filtered.length} of {MEMBERS.length} members
          </div>
        </div>

        {/* Member detail */}
        {selectedMember && (
          <MemberDetailPanel member={selectedMember} onClose={() => setSelectedMember(null)} />
        )}
      </div>

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" style={{ maxWidth: 560 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title-cn">新增会员</div>
                <span className="modal-title-en">Register New Member</span>
              </div>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">姓名 Name *</label>
                  <input className="form-input" placeholder="请输入姓名..." required />
                </div>
                <div className="form-group">
                  <label className="form-label">手机 Phone *</label>
                  <input className="form-input" placeholder="9xxx xxxx" required />
                </div>
                <div className="form-group">
                  <label className="form-label">出生日期 DOB</label>
                  <input type="date" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">会员等级 Tier</label>
                  <select className="form-select">
                    {Object.entries(MEMBER_TIERS).map(([k, v]) => (
                      <option key={k} value={k}>{v.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">地址 Address</label>
                  <input className="form-input" placeholder="请输入地址..." />
                </div>
                <div className="form-group">
                  <label className="form-label">中医体质 Constitution</label>
                  <select className="form-select">
                    {['平和质','气虚质','阳虚质','阴虚质','痰湿质','湿热质','血瘀质','气郁质','特禀质'].map(t => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">过敏史 Allergies</label>
                  <input className="form-input" placeholder="如无请填写'无'" />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">备注 Notes</label>
                  <textarea className="form-textarea" rows={3} placeholder="健康状况备注..." />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowAddModal(false)}>取消 Cancel</button>
              <button className="btn btn-primary" onClick={() => { setShowAddModal(false); alert('会员已成功添加！\nMember registered successfully!') }}>
                确认添加 Register
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
