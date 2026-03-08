import { useState } from 'react'
import { CAMPAIGNS } from '../data/fakeData'

const TEMPLATES = [
  {
    id: 'birthday',
    icon: '🎂',
    cn: '生日优惠',
    en: 'Birthday Special',
    desc: '自动在会员生日月发送专属优惠',
    descEn: 'Auto-sends exclusive offer in member\'s birthday month',
    isAuto: true,
    preview: '亲爱的 {姓名}，生日快乐！🎉 特送您本月专属九折优惠，期待您的光临～'
  },
  {
    id: 'upgrade',
    icon: '⭐',
    cn: '会员升级提醒',
    en: 'Tier Upgrade Nudge',
    desc: '提醒距升级差额的会员升级',
    descEn: 'Nudge members close to next tier',
    isAuto: true,
    preview: '您好 {姓名}，再消费 ${差额} 即可升级至 {下一等级}，享受更多专属优惠！'
  },
  {
    id: 'recall',
    icon: '💌',
    cn: '流失召回',
    en: 'Lapsed Member Recall',
    desc: '60天未到访会员自动唤醒',
    descEn: 'Auto-recall members inactive for 60+ days',
    isAuto: true,
    preview: '亲爱的 {姓名}，好久不见！我们想念您 💆‍♀️ 特为您保留专属优惠，欢迎回来～'
  },
  {
    id: 'custom',
    icon: '✏️',
    cn: '自定义活动',
    en: 'Custom Campaign',
    desc: '创建个性化推广活动',
    descEn: 'Create custom promotional campaigns',
    isAuto: false,
    preview: ''
  },
]

const STATUS_INFO = {
  active: { label: '进行中 Active', badge: 'badge-success' },
  completed: { label: '已结束 Done', badge: 'badge-standard' },
  draft: { label: '草稿 Draft', badge: 'badge-warning' },
}

const TARGET_OPTIONS = ['全体会员 All Members', '普通会员 Standard', '银卡 Silver', '金卡 Gold', 'VIP', 'SVIP', '至尊 Elite', '60天未到访 Lapsed 60d', '生日月会员 Birthday Month']
const CHANNEL_OPTIONS = [
  { id: 'wechat', cn: '微信', icon: '💚' },
  { id: 'sms', cn: 'SMS短信', icon: '📱' },
  { id: 'inapp', cn: '应用内通知', icon: '🔔' },
]

const STEP_LABELS = ['选择模板 Template', '目标群体 Target', '发送渠道 Channel', '预览发送 Preview']

export default function Promotions() {
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState({ target: TARGET_OPTIONS[0], channels: ['wechat'], customMessage: '' })

  const handleTemplateSelect = (t) => {
    setSelectedTemplate(t)
    setStep(0)
    setShowCreateModal(true)
  }

  const canProceed = () => {
    if (step === 0) return !!selectedTemplate
    if (step === 1) return !!formData.target
    if (step === 2) return formData.channels.length > 0
    return true
  }

  const toggleChannel = (ch) => {
    setFormData(f => ({
      ...f,
      channels: f.channels.includes(ch) ? f.channels.filter(c => c !== ch) : [...f.channels, ch]
    }))
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontFamily: 'Noto Serif SC', fontSize: 16, color: 'var(--brand-dark)', marginBottom: 4 }}>促销活动管理</h2>
          <p style={{ fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'Lora' }}>Marketing Campaign Management</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setSelectedTemplate(TEMPLATES[3]); setStep(0); setShowCreateModal(true) }}>
          ＋ 创建活动 Create Campaign
        </button>
      </div>

      <div className="promotions-layout">
        {/* Campaign templates */}
        <div>
          <div style={{ marginBottom: 14 }}>
            <span style={{ fontFamily: 'Noto Serif SC', fontSize: 14, fontWeight: 600, color: 'var(--brand-dark)' }}>活动模板</span>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'Lora', display: 'block', marginTop: 1 }}>Campaign Templates</span>
          </div>
          <div className="template-cards">
            {TEMPLATES.map(t => (
              <div
                key={t.id}
                className={`template-card ${selectedTemplate?.id === t.id ? 'selected' : ''}`}
                onClick={() => handleTemplateSelect(t)}
              >
                <div className="template-icon">{t.icon}</div>
                <span className="template-name-cn">{t.cn}</span>
                <span className="template-name-en">{t.en}</span>
                {t.isAuto && <div className="template-auto-badge">⚡ 自动触发 Auto-trigger</div>}
                <p style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'Lora', marginTop: 8, lineHeight: 1.6 }}>
                  {t.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Active campaigns */}
        <div>
          <div style={{ marginBottom: 14 }}>
            <span style={{ fontFamily: 'Noto Serif SC', fontSize: 14, fontWeight: 600, color: 'var(--brand-dark)' }}>进行中的活动</span>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'Lora', display: 'block', marginTop: 1 }}>Active Campaigns</span>
          </div>

          <div className="card" style={{ marginBottom: 20 }}>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>活动名称 Campaign</th>
                    <th>目标群体 Target</th>
                    <th>渠道 Channel</th>
                    <th>状态 Status</th>
                    <th>已发 Sent</th>
                    <th>转化率 CVR</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {CAMPAIGNS.map(c => {
                    const status = STATUS_INFO[c.status] || STATUS_INFO.active
                    return (
                      <tr key={c.id}>
                        <td>
                          <div style={{ fontFamily: 'Noto Serif SC', fontWeight: 600, color: 'var(--brand-dark)' }}>{c.name}</div>
                        </td>
                        <td style={{ fontSize: 12, fontFamily: 'Noto Serif SC', color: 'var(--text-secondary)' }}>{c.target}</td>
                        <td>
                          <span style={{ fontSize: 11, background: 'rgba(199,169,140,0.15)', color: 'var(--text-secondary)', padding: '3px 8px', borderRadius: 10, fontFamily: 'Lora' }}>
                            {c.channel}
                          </span>
                        </td>
                        <td><span className={`badge ${status.badge}`}>{status.label}</span></td>
                        <td style={{ fontFamily: 'Playfair Display', fontWeight: 700 }}>{c.sent}</td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ flex: 1, background: 'var(--background)', borderRadius: 4, height: 6, overflow: 'hidden', minWidth: 60 }}>
                              <div style={{ width: c.rate, height: '100%', background: parseInt(c.rate) > 50 ? 'var(--success)' : 'var(--brand-primary)', borderRadius: 4 }} />
                            </div>
                            <span style={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: 13 }}>{c.rate}</span>
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 6 }}>
                            <button className="btn btn-outline btn-sm">详情 Details</button>
                            {c.status === 'active' && <button className="btn btn-danger btn-sm" style={{ fontSize: 10, padding: '4px 8px' }}>停止</button>}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
            {[
              { cn: '本月总发送', en: 'Total Sent', value: '402', icon: '📤' },
              { cn: '平均转化率', en: 'Avg Conversion', value: '38.5%', icon: '📊' },
              { cn: '活动产生营收', en: 'Campaign Revenue', value: '$28,400', icon: '💰' },
            ].map(s => (
              <div key={s.cn} className="card">
                <div className="card-body" style={{ textAlign: 'center', padding: '16px' }}>
                  <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontFamily: 'Playfair Display', fontSize: 22, fontWeight: 700, color: 'var(--brand-dark)', marginBottom: 4 }}>{s.value}</div>
                  <div style={{ fontFamily: 'Noto Serif SC', fontSize: 11, color: 'var(--text-secondary)' }}>{s.cn}</div>
                  <div style={{ fontFamily: 'Lora', fontSize: 9, color: 'var(--text-secondary)', opacity: 0.7 }}>{s.en}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Campaign Modal */}
      {showCreateModal && selectedTemplate && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal" style={{ maxWidth: 560 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title-cn">{selectedTemplate.cn} {selectedTemplate.icon}</div>
                <span className="modal-title-en">Create Campaign</span>
              </div>
              <button className="modal-close" onClick={() => setShowCreateModal(false)}>×</button>
            </div>
            <div className="modal-body">
              {/* Step indicator */}
              <div className="step-indicator">
                {STEP_LABELS.map((label, i) => (
                  <>
                    <div key={label} className={`step-dot ${i < step ? 'done' : i === step ? 'active' : ''}`}>
                      {i < step ? '✓' : i + 1}
                    </div>
                    {i < STEP_LABELS.length - 1 && (
                      <div key={`line-${i}`} className={`step-line ${i < step ? 'done' : ''}`} />
                    )}
                  </>
                ))}
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'Lora', marginBottom: 20, textAlign: 'center' }}>
                {STEP_LABELS[step]}
              </div>

              {/* Step 0: Template */}
              {step === 0 && (
                <div>
                  <div style={{ background: 'rgba(199,169,140,0.08)', border: '1px solid var(--border)', borderRadius: 10, padding: '16px 18px' }}>
                    <div style={{ fontSize: 28, marginBottom: 8 }}>{selectedTemplate.icon}</div>
                    <div style={{ fontFamily: 'Noto Serif SC', fontSize: 16, fontWeight: 700, color: 'var(--brand-dark)' }}>{selectedTemplate.cn}</div>
                    <div style={{ fontFamily: 'Lora', fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>{selectedTemplate.en}</div>
                    <div style={{ fontFamily: 'Lora', fontSize: 12, color: 'var(--text-secondary)', marginTop: 8, lineHeight: 1.7 }}>{selectedTemplate.descEn}</div>
                    {selectedTemplate.isAuto && (
                      <div style={{ marginTop: 10, fontSize: 11, color: 'var(--success)', background: 'rgba(122,158,126,0.1)', padding: '6px 10px', borderRadius: 6, fontFamily: 'Lora' }}>
                        ⚡ This campaign triggers automatically — no manual scheduling needed
                      </div>
                    )}
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <label className="form-label">活动名称 Campaign Name</label>
                    <input className="form-input" defaultValue={`${selectedTemplate.cn} — ${new Date().toLocaleDateString('zh-HK', { month: 'long' })}`} />
                  </div>
                </div>
              )}

              {/* Step 1: Target */}
              {step === 1 && (
                <div>
                  <label className="form-label" style={{ marginBottom: 12 }}>选择目标群体 Select Target Audience</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {TARGET_OPTIONS.map(t => (
                      <label key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', padding: '10px 14px', borderRadius: 8, border: `1px solid ${formData.target === t ? 'var(--brand-primary)' : 'var(--border)'}`, background: formData.target === t ? 'rgba(199,169,140,0.08)' : 'var(--white)', transition: 'all 0.15s' }}>
                        <input type="radio" name="target" value={t} checked={formData.target === t} onChange={() => setFormData(f => ({ ...f, target: t }))} style={{ accentColor: 'var(--brand-primary)' }} />
                        <span style={{ fontFamily: 'Noto Serif SC', fontSize: 13, color: 'var(--brand-dark)' }}>{t}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Channel */}
              {step === 2 && (
                <div>
                  <label className="form-label" style={{ marginBottom: 12 }}>选择发送渠道 Select Channel (可多选)</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {CHANNEL_OPTIONS.map(ch => (
                      <label key={ch.id} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', padding: '12px 16px', borderRadius: 8, border: `1px solid ${formData.channels.includes(ch.id) ? 'var(--brand-primary)' : 'var(--border)'}`, background: formData.channels.includes(ch.id) ? 'rgba(199,169,140,0.08)' : 'var(--white)', transition: 'all 0.15s' }}>
                        <input type="checkbox" checked={formData.channels.includes(ch.id)} onChange={() => toggleChannel(ch.id)} style={{ accentColor: 'var(--brand-primary)', width: 16, height: 16 }} />
                        <span style={{ fontSize: 20 }}>{ch.icon}</span>
                        <span style={{ fontFamily: 'Noto Serif SC', fontSize: 13, color: 'var(--brand-dark)' }}>{ch.cn}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Preview */}
              {step === 3 && (
                <div>
                  <div style={{ background: 'var(--background)', borderRadius: 10, padding: '20px', marginBottom: 16 }}>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'Noto Serif SC', marginBottom: 8 }}>消息预览 Message Preview</div>
                    <div style={{ background: 'var(--white)', borderRadius: 8, padding: '14px 16px', border: '1px solid var(--border)', fontFamily: 'Noto Serif SC', fontSize: 14, lineHeight: 1.8, color: 'var(--brand-dark)' }}>
                      {selectedTemplate.preview || '您好，感谢您一直以来对木木d店的支持！特为您带来专属优惠，期待您的光临～ 🌿'}
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {[
                      { label: '目标群体 Target', value: formData.target },
                      { label: '发送渠道 Channels', value: formData.channels.map(c => CHANNEL_OPTIONS.find(o => o.id === c)?.cn).join(', ') },
                      { label: '预计发送 Est. Recipients', value: '~48 members' },
                      { label: '发送时间 Send Time', value: '立即发送 Immediately' },
                    ].map(row => (
                      <div key={row.label} style={{ background: 'var(--background)', borderRadius: 8, padding: '10px 14px' }}>
                        <div style={{ fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'Noto Serif SC', marginBottom: 3 }}>{row.label}</div>
                        <div style={{ fontSize: 13, fontFamily: 'Noto Serif SC', color: 'var(--brand-dark)', fontWeight: 600 }}>{row.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => step > 0 ? setStep(s => s - 1) : setShowCreateModal(false)}>
                {step === 0 ? '取消 Cancel' : '← 上一步 Back'}
              </button>
              {step < 3 ? (
                <button className="btn btn-primary" onClick={() => setStep(s => s + 1)} disabled={!canProceed()}>
                  下一步 Next →
                </button>
              ) : (
                <button className="btn btn-primary" onClick={() => { setShowCreateModal(false); alert('活动已成功发布！\nCampaign launched successfully!') }}>
                  ✓ 立即发送 Send Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
