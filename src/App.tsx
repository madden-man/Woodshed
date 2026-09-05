import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import TopicPage from './pages/TopicPage'
import KeysPage from './pages/KeysPage'
import CurriculumPage from './pages/CurriculumPage'
import RegimenPage from './pages/RegimenPage'
import AskPage from './pages/AskPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="wiki/:slug" element={<TopicPage />} />
        <Route path="keys" element={<KeysPage />} />
        <Route path="curriculum" element={<CurriculumPage />} />
        <Route path="ask" element={<AskPage />} />
        {/* No number: pick up wherever you left off. */}
        <Route path="regimen" element={<RegimenPage />} />
        <Route path="regimen/:number" element={<RegimenPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
