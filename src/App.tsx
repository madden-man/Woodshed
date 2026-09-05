import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import TopicPage from './pages/TopicPage'
import KeysPage from './pages/KeysPage'
import RegimenPage from './pages/RegimenPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="wiki/:slug" element={<TopicPage />} />
        <Route path="keys" element={<KeysPage />} />
        <Route path="regimen" element={<RegimenPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
