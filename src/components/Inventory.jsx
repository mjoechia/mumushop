import { useState } from 'react'
import { INVENTORY } from '../data/fakeData'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const CATEGORIES = ['全部 All', '中药材 Herbs', '精油 Oils', '耗材 Consumables', '仪器耗材 Equipment']

const STATUS_INFO = {
  ok: { label: '充足 OK', cls: 'stock-ok', badge: 'badge-success' },
  low: { label: '偏低 Low', cls: 'stock-low', badge: 'badge-warning' },
  out: { label: '缺货 Out', cls: 'stock-out', badge: 'badge-danger' },
}

// Mock usage trend
const USAGE_TREND = [
  { week: 'W1', usage: 12 },
  { week: 'W2', usage: 18 },
  { week: 'W3', usage: 15 },
  { week: 'W4', usage: 22 },
  { week: 'W5', usage: 19 },
  { week: 'W6', usage: 25 },
]

export default function Inventory() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('全部 All')
  const [showStockIn, setShowStockIn] = useState(false)
  const [showStockOut, setShowStockOut] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [stockInForm, setStockInForm] = useState({ product: '', qty: '', supplier: '', cost: '', notes: '' })

  const filtered = INVENTORY.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.nameEn.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === '全部 All' || item.category.startsWith(category.split(' ')[0])
    return matchSearch && matchCat
  })

  const lowCount = INVENTORY.filter(i => i.status === 'low').length
  const outCount = INVENTORY.filter(i => i.status === 'out').length

  return (
    <div>
      {/* Alert banner */}
      {(lowCount + outCount) > 0 && (
        <div style={{
          background: 'rgba(199,153,58,0.1)', border: '1px solid rgba(199,153,58,0.35)',
          borderRadius: 10, padding: '12px 18px', marginBottom: 20,
          display: 'flex', alignItems: 'center', gap: 12, fontSize: 13
        }}>
          <span style={{ fontSize: 20 }}>⚠️</span>
          <span style={{ fontFamily: 'Noto Serif SC', color: 'var(--warning)', fontWeight: 600 }}>
            库存预警 Stock Alert:
          </span>
          <span style={{ fontFamily: 'Lora', color: 'var(--text-secondary)' }}>
            {outCount} 种缺货 out of stock · {lowCount} 种偏低 low stock
          </span>
          <button className="btn btn-secondary btn-sm" style={{ marginLeft: 'auto' }}>
            快速补货 Quick Reorder
          </button>
        </div>
      )}

      {/* Top bar */}
      <div className="section-header">
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <div className="search-bar">
            <span>🔍</span>
            <input
              placeholder="搜索产品 Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: 200 }}
            />
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                className={`date-range-tab ${category === cat ? 'active' : ''}`}
                onClick={() => setCategory(cat)}
                style={{ padding: '7px 12px', fontSize: 11 }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary" onClick={() => setShowStockIn(true)}>
            ＋ 入库 Stock In
          </button>
          <button className="btn btn-outline" onClick={() => setShowStockOut(true)}>
            − 出库 Stock Out
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: selectedProduct ? '1fr 300px' : '1fr', gap: 20 }}>
        <div className="card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>品名 Product</th>
                  <th>分类 Category</th>
                  <th>库存 Stock</th>
                  <th>单位 Unit</th>
                  <th>预警线 Alert</th>
                  <th>状态 Status</th>
                  <th>操作 Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => {
                  const status = STATUS_INFO[item.status]
                  return (
                    <tr key={item.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedProduct(item)}>
                      <td>
                        <div style={{ fontFamily: 'Noto Serif SC', fontWeight: 600, color: 'var(--brand-dark)' }}>{item.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontFamily: 'Lora' }}>{item.nameEn}</div>
                      </td>
                      <td>
                        <span style={{ fontSize: 11, background: 'rgba(199,169,140,0.15)', color: 'var(--text-secondary)', padding: '3px 8px', borderRadius: 10, fontFamily: 'Lora' }}>
                          {item.category.split(' ')[0]}
                        </span>
                      </td>
                      <td>
                        <span style={{
                          fontFamily: 'Playfair Display', fontSize: 18, fontWeight: 700,
                          color: item.status === 'out' ? 'var(--danger)' : item.status === 'low' ? 'var(--warning)' : 'var(--brand-dark)'
                        }}>
                          {item.stock}
                        </span>
                      </td>
                      <td style={{ fontFamily: 'Lora', color: 'var(--text-secondary)' }}>{item.unit}</td>
                      <td style={{ fontFamily: 'Lora', color: 'var(--text-secondary)' }}>≥ {item.alert}</td>
                      <td>
                        <span className={`badge ${status.badge}`}>{status.label}</span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }} onClick={e => e.stopPropagation()}>
                          <button className="btn btn-outline btn-sm" onClick={() => setSelectedProduct(item)}>查看 View</button>
                          <button className="btn btn-secondary btn-sm" onClick={() => { setStockInForm(f => ({ ...f, product: item.name })); setShowStockIn(true) }}>入库</button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <div style={{ padding: '12px 18px', borderTop: '1px solid var(--border)', fontSize: 12, color: 'var(--text-secondary)', fontFamily: 'Lora' }}>
            显示 {filtered.length} / {INVENTORY.length} 种产品
          </div>
        </div>

        {/* Product detail panel */}
        {selectedProduct && (
          <div className="card" style={{ height: 'fit-content', position: 'sticky', top: 0 }}>
            <div className="card-header">
              <div>
                <span className="card-title-cn">{selectedProduct.name.split(' ')[0]}</span>
                <span className="card-title-en">{selectedProduct.nameEn}</span>
              </div>
              <button onClick={() => setSelectedProduct(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--text-secondary)' }}>×</button>
            </div>
            <div className="card-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
                <div style={{ textAlign: 'center', background: 'var(--background)', borderRadius: 8, padding: 12 }}>
                  <div style={{ fontFamily: 'Playfair Display', fontSize: 28, fontWeight: 700, color: selectedProduct.status === 'out' ? 'var(--danger)' : 'var(--brand-dark)' }}>
                    {selectedProduct.stock}
                  </div>
                  <div style={{ fontSize: 10, fontFamily: 'Noto Serif SC', color: 'var(--text-secondary)' }}>当前库存 Current</div>
                </div>
                <div style={{ textAlign: 'center', background: 'var(--background)', borderRadius: 8, padding: 12 }}>
                  <div style={{ fontFamily: 'Playfair Display', fontSize: 28, fontWeight: 700, color: 'var(--text-secondary)' }}>
                    {selectedProduct.alert}
                  </div>
                  <div style={{ fontSize: 10, fontFamily: 'Noto Serif SC', color: 'var(--text-secondary)' }}>预警线 Alert</div>
                </div>
              </div>

              <div style={{ marginBottom: 4, fontSize: 11, fontFamily: 'Noto Serif SC', color: 'var(--text-secondary)' }}>近6周消耗趋势 Usage Trend</div>
              <ResponsiveContainer width="100%" height={120}>
                <LineChart data={USAGE_TREND} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(212,191,168,0.3)" />
                  <XAxis dataKey="week" tick={{ fontSize: 10, fontFamily: 'Lora', fill: '#6B5648' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fontFamily: 'Lora', fill: '#6B5648' }} axisLine={false} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: 'var(--brand-dark)', border: 'none', borderRadius: 8, fontSize: 12, fontFamily: 'Lora', color: 'var(--white)' }}
                    labelStyle={{ color: 'var(--brand-primary)' }}
                  />
                  <Line type="monotone" dataKey="usage" stroke="var(--brand-primary)" strokeWidth={2} dot={{ fill: 'var(--brand-primary)', r: 3 }} />
                </LineChart>
              </ResponsiveContainer>

              <div style={{ marginTop: 14, display: 'flex', gap: 8 }}>
                <button className="btn btn-primary btn-sm" style={{ flex: 1, justifyContent: 'center' }}
                  onClick={() => { setStockInForm(f => ({ ...f, product: selectedProduct.name })); setShowStockIn(true) }}>
                  ＋ 入库
                </button>
                <button className="btn btn-outline btn-sm" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowStockOut(true)}>
                  − 出库
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Stock In Modal */}
      {showStockIn && (
        <div className="modal-overlay" onClick={() => setShowStockIn(false)}>
          <div className="modal" style={{ maxWidth: 480 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title-cn">入库记录</div>
                <span className="modal-title-en">Stock In</span>
              </div>
              <button className="modal-close" onClick={() => setShowStockIn(false)}>×</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">产品 Product *</label>
                  <select className="form-select" value={stockInForm.product} onChange={e => setStockInForm(f => ({ ...f, product: e.target.value }))}>
                    <option value="">请选择...</option>
                    {INVENTORY.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">数量 Quantity *</label>
                  <input type="number" className="form-input" placeholder="0" min="1" value={stockInForm.qty} onChange={e => setStockInForm(f => ({ ...f, qty: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">成本价 Cost Price</label>
                  <input type="number" className="form-input" placeholder="$0.00" value={stockInForm.cost} onChange={e => setStockInForm(f => ({ ...f, cost: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">供应商 Supplier</label>
                  <input className="form-input" placeholder="供应商名称..." value={stockInForm.supplier} onChange={e => setStockInForm(f => ({ ...f, supplier: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label className="form-label">入库日期 Date</label>
                  <input type="date" className="form-input" defaultValue="2026-03-08" />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">备注 Notes</label>
                  <textarea className="form-textarea" rows={2} placeholder="入库备注..." value={stockInForm.notes} onChange={e => setStockInForm(f => ({ ...f, notes: e.target.value }))} />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowStockIn(false)}>取消 Cancel</button>
              <button className="btn btn-primary" onClick={() => { setShowStockIn(false); alert('入库记录已保存！\nStock In recorded!') }}>
                确认入库 Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stock Out Modal */}
      {showStockOut && (
        <div className="modal-overlay" onClick={() => setShowStockOut(false)}>
          <div className="modal" style={{ maxWidth: 420 }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <div className="modal-title-cn">出库记录</div>
                <span className="modal-title-en">Stock Out</span>
              </div>
              <button className="modal-close" onClick={() => setShowStockOut(false)}>×</button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label className="form-label">产品 Product *</label>
                <select className="form-select">
                  <option value="">请选择...</option>
                  {INVENTORY.map(i => <option key={i.id} value={i.name}>{i.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">数量 Quantity *</label>
                <input type="number" className="form-input" placeholder="0" min="1" />
              </div>
              <div className="form-group">
                <label className="form-label">用途 Purpose</label>
                <select className="form-select">
                  <option>服务使用 Service Use</option>
                  <option>零售销售 Retail Sale</option>
                  <option>损耗/报废 Damage/Write-off</option>
                  <option>其他 Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">备注 Notes</label>
                <textarea className="form-textarea" rows={2} placeholder="出库备注..." />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-outline" onClick={() => setShowStockOut(false)}>取消 Cancel</button>
              <button className="btn btn-primary" onClick={() => { setShowStockOut(false); alert('出库记录已保存！\nStock Out recorded!') }}>
                确认出库 Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
