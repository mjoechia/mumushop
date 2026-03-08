import { useState } from 'react'
import { COMMISSION_DATA, COMMISSION_RULES, COMMISSION_BREAKDOWN } from '../data/fakeData'

export default function Commission() {
  const [selectedMonth, setSelectedMonth] = useState('2026-03')
  const [selectedStaff, setSelectedStaff] = useState(null)

  const totalComm = COMMISSION_DATA.reduce((s, c) => s + c.total, 0)
  const pendingComm = COMMISSION_DATA.filter(c => c.status === 'pending').reduce((s, c) => s + c.total, 0)

  return (
    <div>
      {/* Header */}
      <div className="section-header">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div>
            <label className="form-label" style={{ marginBottom: 4 }}>月份 Month</label>
            <input
              type="month"
              className="form-input"
              value={selectedMonth}
              onChange={e => setSelectedMonth(e.target.value)}
              style={{ width: 160 }}
            />
          </div>
          <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
            <div style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 16px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Playfair Display', fontSize: 20, fontWeight: 700, color: 'var(--brand-dark)' }}>${totalComm.toLocaleString()}</div>
              <div style={{ fontSize: 10, color: 'var(--text-secondary)', fontFamily: 'Noto Serif SC' }}>总提成 Total</div>
            </div>
            <div style={{ background: 'rgba(199,153,58,0.1)', border: '1px solid rgba(199,153,58,0.3)', borderRadius: 8, padding: '8px 16px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Playfair Display', fontSize: 20, fontWeight: 700, color: 'var(--warning)' }}>${pendingComm.toLocaleString()}</div>
              <div style={{ fontSize: 10, color: 'var(--warning)', fontFamily: 'Noto Serif SC' }}>待发放 Pending</div>
            </div>
          </div>
        </div>
        <button className="btn btn-primary">
          ↓ 导出报表 Export Report
        </button>
      </div>

      <div className="commission-layout">
        {/* Main table */}
        <div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header">
              <div>
                <span className="card-title-cn">提成汇总</span>
                <span className="card-title-en">Commission Summary — {selectedMonth}</span>
              </div>
            </div>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>员工 Staff</th>
                    <th>服务提成 Service Comm</th>
                    <th>产品提成 Product Comm</th>
                    <th>总提成 Total</th>
                    <th>状态 Status</th>
                    <th>操作 Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {COMMISSION_DATA.map(staff => (
                    <tr key={staff.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedStaff(staff)}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                          <div style={{
                            width: 34, height: 34, borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--brand-primary), var(--brand-secondary))',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: 'Noto Serif SC', fontWeight: 700, fontSize: 13, color: 'var(--brand-dark)'
                          }}>
                            {staff.name[0]}
                          </div>
                          <span style={{ fontFamily: 'Noto Serif SC', fontWeight: 600 }}>{staff.name}</span>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 700, color: 'var(--brand-dark)' }}>
                          ${staff.serviceComm.toLocaleString()}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontFamily: 'Playfair Display', fontSize: 16, fontWeight: 700, color: 'var(--text-secondary)' }}>
                          ${staff.productComm.toLocaleString()}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontFamily: 'Playfair Display', fontSize: 18, fontWeight: 700, color: 'var(--brand-primary)' }}>
                          ${staff.total.toLocaleString()}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${staff.status === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                          {staff.status === 'paid' ? '已发放 Paid' : '待发放 Pending'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: 6 }} onClick={e => e.stopPropagation()}>
                          <button className="btn btn-outline btn-sm" onClick={() => setSelectedStaff(staff)}>明细 Detail</button>
                          {staff.status === 'pending' && (
                            <button className="btn btn-secondary btn-sm">发放 Pay</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={2} style={{ fontFamily: 'Noto Serif SC', fontWeight: 700, fontSize: 13, color: 'var(--brand-dark)', padding: '14px 16px' }}>
                      合计 Total
                    </td>
                    <td style={{ fontFamily: 'Playfair Display', fontWeight: 700, padding: '14px 16px', color: 'var(--text-secondary)' }}>
                      ${COMMISSION_DATA.reduce((s, c) => s + c.productComm, 0).toLocaleString()}
                    </td>
                    <td style={{ fontFamily: 'Playfair Display', fontWeight: 700, fontSize: 20, padding: '14px 16px', color: 'var(--brand-primary)' }}>
                      ${totalComm.toLocaleString()}
                    </td>
                    <td colSpan={2} />
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Staff breakdown drill-down */}
          {selectedStaff && COMMISSION_BREAKDOWN[selectedStaff.id] && (
            <div className="card">
              <div className="card-header">
                <div>
                  <span className="card-title-cn">{selectedStaff.name} — 服务明细</span>
                  <span className="card-title-en">Session Breakdown</span>
                </div>
                <button className="btn btn-outline btn-sm" onClick={() => setSelectedStaff(null)}>关闭 Close</button>
              </div>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>日期 Date</th>
                      <th>客户 Customer</th>
                      <th>服务 Service</th>
                      <th>金额 Amount</th>
                      <th>提成 Commission</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMMISSION_BREAKDOWN[selectedStaff.id].map((row, i) => (
                      <tr key={i}>
                        <td style={{ fontFamily: 'Lora', color: 'var(--text-secondary)' }}>{row.date}</td>
                        <td style={{ fontFamily: 'Noto Serif SC', fontWeight: 600 }}>{row.customer}</td>
                        <td style={{ fontFamily: 'Noto Serif SC' }}>{row.service}</td>
                        <td style={{ fontFamily: 'Playfair Display', fontWeight: 600 }}>${row.amount}</td>
                        <td style={{ fontFamily: 'Playfair Display', fontWeight: 700, color: 'var(--brand-primary)' }}>${row.comm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Commission rules panel */}
        <div>
          <div className="commission-rules">
            <div style={{ marginBottom: 16 }}>
              <span className="card-title-cn">提成规则</span>
              <span className="card-title-en" style={{ display: 'block', marginTop: 2 }}>Commission Rate Rules</span>
            </div>
            {COMMISSION_RULES.map((rule, i) => (
              <div key={i} className="commission-rule-item">
                <div>
                  <span className="rule-service">{rule.service}</span>
                </div>
                <span className="rule-rate">{rule.rate}</span>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: '12px', background: 'rgba(199,169,140,0.1)', borderRadius: 8, fontSize: 11, fontFamily: 'Lora', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
              * 提成按实际到账金额计算<br/>
              * Commission calculated on actual collected amount<br/>
              * 套餐售出时一次性计提<br/>
              * Package commission paid at time of sale
            </div>
          </div>

          {/* Quick stats */}
          <div className="card" style={{ marginTop: 16 }}>
            <div className="card-header">
              <div>
                <span className="card-title-cn">本月提成最高</span>
                <span className="card-title-en">Top Earner This Month</span>
              </div>
            </div>
            <div className="card-body">
              {[...COMMISSION_DATA].sort((a, b) => b.total - a.total).slice(0, 3).map((s, i) => (
                <div key={s.id} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '10px 0', borderBottom: i < 2 ? '1px solid rgba(212,191,168,0.35)' : 'none'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: 18 }}>{'🥇🥈🥉'[i]}</span>
                    <span style={{ fontFamily: 'Noto Serif SC', fontWeight: 600, fontSize: 14 }}>{s.name}</span>
                  </div>
                  <span style={{ fontFamily: 'Playfair Display', fontWeight: 700, color: 'var(--brand-primary)', fontSize: 16 }}>
                    ${s.total.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
