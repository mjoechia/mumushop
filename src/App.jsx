import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import BookingCalendar from './components/BookingCalendar'
import POS from './components/POS'
import CRM from './components/CRM'
import Analytics from './components/Analytics'
import Commission from './components/Commission'
import Inventory from './components/Inventory'
import Promotions from './components/Promotions'
import './styles/components.css'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="calendar" element={<BookingCalendar />} />
        <Route path="pos" element={<POS />} />
        <Route path="crm" element={<CRM />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="commission" element={<Commission />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="promotions" element={<Promotions />} />
      </Route>
    </Routes>
  )
}
