import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { ProgressProvider } from './hooks/ProgressProvider'
import { TimerProvider } from './hooks/TimerProvider'
import './index.css'

// We put you at the top of each page ourselves (see useScrollToTop), so stop
// the browser from restoring the old offset on back/forward and undoing that.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ProgressProvider>
      <TimerProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </TimerProvider>
    </ProgressProvider>
  </StrictMode>,
)
