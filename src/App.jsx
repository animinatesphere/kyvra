import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import SiteLayout from './layouts/SiteLayout'
import Home from './pages/site/Home'
import About from './pages/site/About'
import Work from './pages/site/Work'
import Services from './pages/site/Services'
import Contact from './pages/site/Contact'
import Blog from './pages/site/Blog'
import NotFound from './pages/site/NotFound'
import AdminLayout from './admin/AdminLayout'
import Login from './admin/Login'
import Dashboard from './admin/Dashboard'
import Leads from './admin/Leads'
import Invoices from './admin/Invoices'
import Settings from './admin/Settings'
import CrudPage from './admin/CrudPage'
import { configs } from './admin/configs'
import { useStore } from './store/Store'

function Protected({ children }) {
  const { authed } = useStore()
  return authed ? children : <Navigate to="/admin/login" replace />
}

export default function App() {
  const location = useLocation()
  const area = location.pathname.startsWith('/admin') ? 'admin' : location.pathname

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={area}>
        <Route element={<SiteLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work" element={<Work />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin" element={<Protected><AdminLayout /></Protected>}>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="settings" element={<Settings />} />
          {Object.entries(configs).map(([slug, cfg]) => (
            <Route key={slug} path={slug} element={<CrudPage key={slug} config={cfg} />} />
          ))}
        </Route>

        <Route path="*" element={<SiteLayout />}>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  )
}
