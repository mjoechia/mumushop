import { useState } from 'react'
import { SERVICES, PRODUCTS, PACKAGES, MEMBERS, MEMBER_TIERS, THERAPISTS } from '../data/fakeData'

const PAYMENT_METHODS = [
  { id: 'cash', cn: '现金', en: 'Cash', icon: '💵' },
  { id: 'card', cn: '信用卡', en: 'Card', icon: '💳' },
  { id: 'wechat', cn: '微信支付', en: 'WeChat Pay', icon: '💚' },
  { id: 'alipay', cn: '支付宝', en: 'Alipay', icon: '🔵' },
  { id: 'balance', cn: '会员余额', en: 'Member Balance', icon: '👛' },
]

function getMemberTier(tierId) {
  return MEMBER_TIERS[tierId] || MEMBER_TIERS.standard
}

// Pre-select 李美玲
const DEFAULT_MEMBER = MEMBERS.find(m => m.name === '李美玲')

export default function POS() {
  const [selectedMember, setSelectedMember] = useState(DEFAULT_MEMBER)
  const [memberSearch, setMemberSearch] = useState('')
  const [showMemberList, setShowMemberList] = useState(false)
  const [cart, setCart] = useState([
    // Pre-populate with Tuina as per demo flow
    { id: 's1', cn: '推拿', en: 'Tuina', price: 88, memberPrice: 78, qty: 1, type: 'service' }
  ])
  const [activeTab, setActiveTab] = useState('services')
  const [paymentMethod, setPaymentMethod] = useState('balance')
  const [showSuccess, setShowSuccess] = useState(false)
  const [therapist, setTherapist] = useState('张师傅')

  const tier = getMemberTier(selectedMember?.tier)
  const discount = selectedMember ? tier.discount : 1

  const filteredMembers = MEMBERS.filter(m =>
    m.name.includes(memberSearch) || m.phone.includes(memberSearch)
  )

  const addToCart = (item, type) => {
    setCart(prev => {
      const existing = prev.find(c => c.id === item.id)
      if (existing) {
        return prev.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c)
      }
      return [...prev, { ...item, qty: 1, type }]
    })
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(c => c.id !== id))
  }

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(c => {
      if (c.id !== id) return c
      const newQty = c.qty + delta
      return newQty <= 0 ? null : { ...c, qty: newQty }
    }).filter(Boolean))
  }

  const getItemPrice = (item) => {
    if (!selectedMember) return item.price
    return item.memberPrice || Math.round(item.price * discount)
  }

  const subtotal = cart.reduce((s, item) => s + getItemPrice(item) * item.qty, 0)
  const originalTotal = cart.reduce((s, item) => s + item.price * item.qty, 0)
  const savedAmount = originalTotal - subtotal

  const handleCheckout = () => {
    if (cart.length === 0) return
    setShowSuccess(true)
  }

  const handleSuccessClose = () => {
    setShowSuccess(false)
    setCart([])
    setSelectedMember(DEFAULT_MEMBER)
  }

  const ALL_SERVICES_FLAT = Object.entries(SERVICES)

  return (
    <div className="pos-layout">
      {/* LEFT: Customer Panel */}
      <div className="pos-panel">
        <div className="pos-panel-header">
          <div className="pos-panel-title-cn">客户</div>
          <span className="pos-panel-title-en">Customer</span>
        </div>
        <div className="pos-panel-body">
          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <div className="search-bar" style={{ marginBottom: 0 }}>
              <span style={{ color: 'var(--text-secondary)' }}>🔍</span>
              <input
                placeholder="搜索会员姓名或手机..."
                value={memberSearch}
                onChange={e => { setMemberSearch(e.target.value); setShowMemberList(true) }}
                onFocus={() => setShowMemberList(true)}
                style={{ width: '100%' }}
              />
            </div>
            {showMemberList && memberSearch && (
              <div style={{
                position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--white)',
                border: '1px solid var(--border)', borderRadius: 8, boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                zIndex: 50, maxHeight: 200, overflowY: 'auto', marginTop: 4
              }}>
                {filteredMembers.map(m => (
                  <div
                    key={m.id}
                    onClick={() => { setSelectedMember(m); setMemberSearch(''); setShowMemberList(false) }}
                    style={{
                      padding: '10px 14px', cursor: 'pointer', borderBottom: '1px solid rgba(212,191,168,0.3)',
                      fontSize: 13, fontFamily: 'Noto Serif SC'
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--background)'}
                    onMouseLeave={e => e.currentTarget.style.background = ''}
                  >
                    <div style={{ fontWeight: 600 }}>{m.name}</div>
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'Lora' }}>
                      {m.phone} · {getMemberTier(m.tier).label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Walk-in option */}
          <button
            className="btn btn-outline btn-sm"
            style={{ width: '100%', marginBottom: 14, justifyContent: 'center' }}
            onClick={() => { setSelectedMember(null); setMemberSearch('') }}
          >
            散客结账 Walk-in (No Member)
          </button>

          {/* Selected customer card */}
          {selectedMember ? (
            <div className="customer-card">
              <div className="cust-name">{selectedMember.name}</div>
              <div className="cust-phone">{selectedMember.phone}</div>
              <div className="cust-tier-badge">
                {getMemberTier(selectedMember.tier).label} · {Math.round((1 - discount) * 100 * 10) / 10}折优惠
              </div>
              <div className="cust-balance">
                余额 Balance: <span>${selectedMember.balance.toLocaleString()}</span>
              </div>
              {selectedMember.sessions.length > 0 && (
                <div className="session-pills">
                  {selectedMember.sessions.map(s => (
                    <div key={s.service} className="session-pill">
                      {s.service}: {s.total - s.used}次剩余
                    </div>
                  ))}
                </div>
              )}
              <div style={{ marginTop: 12, fontSize: 11, color: 'rgba(226,207,187,0.6)', fontFamily: 'Lora' }}>
                健康档案 · {selectedMember.constitution}
              </div>
            </div>
          ) : (
            <div style={{
              background: 'var(--background)', border: '2px dashed var(--border)', borderRadius: 10,
              padding: 20, textAlign: 'center', color: 'var(--text-secondary)'
            }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>👤</div>
              <div style={{ fontFamily: 'Noto Serif SC', fontSize: 14, fontWeight: 600 }}>散客</div>
              <div style={{ fontSize: 11, fontFamily: 'Lora' }}>Walk-in Customer · No Discount</div>
            </div>
          )}

          {/* Therapist selector */}
          <div className="form-group" style={{ marginTop: 16 }}>
            <label className="form-label">治疗师 Therapist</label>
            <select
              className="form-select"
              value={therapist}
              onChange={e => setTherapist(e.target.value)}
            >
              {THERAPISTS.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* MIDDLE: Service Selection */}
      <div className="pos-panel">
        <div className="pos-panel-header">
          <div className="pos-panel-title-cn">选择服务 / 产品</div>
          <span className="pos-panel-title-en">Select Service / Product</span>
        </div>
        {/* Tabs */}
        <div className="tabs" style={{ borderBottom: '1px solid var(--border)', flexShrink: 0 }}>
          {[
            { key: 'services', cn: '服务', en: 'Services' },
            { key: 'products', cn: '产品', en: 'Products' },
            { key: 'packages', cn: '套餐', en: 'Packages' },
          ].map(tab => (
            <button
              key={tab.key}
              className={`tab-item ${activeTab === tab.key ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.cn} <span style={{ fontSize: 10, opacity: 0.7 }}>{tab.en}</span>
            </button>
          ))}
        </div>
        <div className="pos-panel-body" style={{ padding: 0 }}>
          {activeTab === 'services' && (
            <div>
              {ALL_SERVICES_FLAT.map(([cat, items]) => (
                <div key={cat}>
                  <div className="service-category-header">{cat}</div>
                  <div className="service-grid">
                    {items.map(svc => (
                      <button
                        key={svc.id}
                        className="service-card"
                        onClick={() => addToCart(svc, 'service')}
                      >
                        <span className="svc-cn">{svc.cn}</span>
                        <span className="svc-en">{svc.en}</span>
                        <span className="svc-price">${svc.price}</span>
                        {selectedMember && (
                          <span className="svc-member-price">
                            会员价 ${svc.memberPrice || Math.round(svc.price * discount)}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'products' && (
            <div className="service-grid">
              {PRODUCTS.map(p => (
                <button key={p.id} className="service-card" onClick={() => addToCart(p, 'product')}>
                  <span className="svc-cn">{p.cn}</span>
                  <span className="svc-en">{p.en}</span>
                  <span className="svc-price">${p.price}</span>
                  {selectedMember && <span className="svc-member-price">会员价 ${p.memberPrice}</span>}
                </button>
              ))}
            </div>
          )}
          {activeTab === 'packages' && (
            <div className="service-grid" style={{ gridTemplateColumns: '1fr' }}>
              {PACKAGES.map(pkg => (
                <button key={pkg.id} className="service-card" onClick={() => addToCart(pkg, 'package')}>
                  <span className="svc-cn">{pkg.cn}</span>
                  <span className="svc-en">{pkg.en}</span>
                  <span className="svc-price">${pkg.price}</span>
                  <span className="svc-member-price">{pkg.sessions} sessions</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT: Checkout Panel */}
      <div className="pos-panel">
        <div className="pos-panel-header">
          <div className="pos-panel-title-cn">结账</div>
          <span className="pos-panel-title-en">Order & Checkout</span>
        </div>

        {/* Order items */}
        <div className="order-items">
          {cart.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">🛒</div>
              <span className="empty-state-text">请选择服务</span>
              <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'Lora', marginTop: 4, display: 'block' }}>
                Select services to begin
              </span>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="order-item">
                <div className="order-item-name">
                  <div style={{ fontFamily: 'Noto Serif SC', fontSize: 13, fontWeight: 600 }}>{item.cn}</div>
                  <div style={{ fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'Lora' }}>{item.en}</div>
                  {selectedMember && item.memberPrice && item.price !== getItemPrice(item) && (
                    <div style={{ fontSize: 10, color: 'var(--brand-primary)', fontFamily: 'Lora' }}>
                      <s style={{ color: 'var(--text-secondary)' }}>${item.price}</s> → 会员价
                    </div>
                  )}
                </div>
                <div className="qty-controls">
                  <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                  <span className="qty-value">{item.qty}</span>
                  <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>＋</button>
                </div>
                <div className="order-item-price">${getItemPrice(item) * item.qty}</div>
                <button className="order-item-remove" onClick={() => removeFromCart(item.id)}>×</button>
              </div>
            ))
          )}
        </div>

        {/* Totals + payment */}
        <div className="order-totals">
          {selectedMember && savedAmount > 0 && (
            <>
              <div className="total-row">
                <span style={{ fontFamily: 'Noto Serif SC' }}>小计 Subtotal</span>
                <span>${originalTotal}</span>
              </div>
              <div className="total-row">
                <span style={{ fontFamily: 'Noto Serif SC', color: 'var(--brand-primary)' }}>
                  {getMemberTier(selectedMember.tier).label} 折扣 Discount
                </span>
                <span style={{ color: 'var(--brand-primary)' }}>−${savedAmount}</span>
              </div>
            </>
          )}
          <div className="total-row grand-total">
            <span>合计 TOTAL</span>
            <span style={{ color: 'var(--brand-primary)' }}>${subtotal}</span>
          </div>

          {/* Payment methods */}
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginBottom: 8, fontFamily: 'Noto Serif SC' }}>
              支付方式 Payment Method
            </div>
            <div className="payment-methods">
              {PAYMENT_METHODS.map(pm => (
                <button
                  key={pm.id}
                  className={`payment-method-btn ${paymentMethod === pm.id ? 'selected' : ''}`}
                  onClick={() => setPaymentMethod(pm.id)}
                >
                  <div>{pm.icon}</div>
                  <div style={{ fontFamily: 'Noto Serif SC', marginTop: 2 }}>{pm.cn}</div>
                  <div style={{ fontSize: 9, opacity: 0.7, fontFamily: 'Lora' }}>{pm.en}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Balance warning */}
          {paymentMethod === 'balance' && selectedMember && subtotal > selectedMember.balance && (
            <div style={{
              background: 'rgba(160,80,80,0.1)', border: '1px solid rgba(160,80,80,0.3)',
              borderRadius: 8, padding: '8px 12px', marginBottom: 10, fontSize: 12,
              color: 'var(--danger)', fontFamily: 'Noto Serif SC'
            }}>
              ⚠ 余额不足 Insufficient balance (${selectedMember?.balance})
            </div>
          )}

          <button
            className="checkout-btn"
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            ✓ 完成结账 Complete Payment
          </button>
          <button
            className="btn btn-outline"
            style={{ width: '100%', marginTop: 8, justifyContent: 'center' }}
            onClick={() => setCart([])}
          >
            清空 Clear All
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="modal-overlay">
          <div className="modal receipt-modal">
            <div className="modal-body" style={{ textAlign: 'center', padding: '32px 28px' }}>
              <div className="receipt-check">✅</div>
              <div style={{ fontFamily: 'Noto Serif SC', fontSize: 20, fontWeight: 700, color: 'var(--brand-dark)' }}>
                结账成功！
              </div>
              <div style={{ fontFamily: 'Playfair Display', fontSize: 13, color: 'var(--text-secondary)', marginTop: 4, letterSpacing: '0.1em' }}>
                Payment Completed
              </div>
              <div className="receipt-amount">${subtotal}</div>

              <div className="receipt-details">
                {cart.map(item => (
                  <div key={item.id} className="receipt-row">
                    <span style={{ fontFamily: 'Noto Serif SC' }}>{item.cn} × {item.qty}</span>
                    <span style={{ fontFamily: 'Playfair Display', fontWeight: 600 }}>${getItemPrice(item) * item.qty}</span>
                  </div>
                ))}
                <div className="receipt-row">
                  <span style={{ fontFamily: 'Noto Serif SC', color: 'var(--text-secondary)' }}>客户 Customer</span>
                  <span>{selectedMember?.name || '散客 Walk-in'}</span>
                </div>
                <div className="receipt-row">
                  <span style={{ fontFamily: 'Noto Serif SC', color: 'var(--text-secondary)' }}>治疗师 Therapist</span>
                  <span>{therapist}</span>
                </div>
                <div className="receipt-row">
                  <span style={{ fontFamily: 'Noto Serif SC', color: 'var(--text-secondary)' }}>支付方式 Payment</span>
                  <span>{PAYMENT_METHODS.find(p => p.id === paymentMethod)?.cn}</span>
                </div>
                {selectedMember && savedAmount > 0 && (
                  <div className="receipt-row" style={{ color: 'var(--brand-primary)' }}>
                    <span style={{ fontFamily: 'Noto Serif SC' }}>会员节省 Member Saved</span>
                    <span style={{ fontFamily: 'Playfair Display', fontWeight: 700 }}>−${savedAmount}</span>
                  </div>
                )}
              </div>

              <div style={{ marginTop: 22, display: 'flex', gap: 10, justifyContent: 'center' }}>
                <button className="btn btn-outline" onClick={handleSuccessClose}>
                  打印收据 Print Receipt
                </button>
                <button className="btn btn-primary" onClick={handleSuccessClose}>
                  完成 Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
