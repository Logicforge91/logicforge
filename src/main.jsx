import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import WebsiteView from './views/WebsiteView.jsx'
import './styles.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WebsiteView />
  </StrictMode>,
)
