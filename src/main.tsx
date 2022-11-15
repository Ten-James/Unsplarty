import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom'
import App from './view/App'
import Admin from './view/admin'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Router>
      <Routes>
      <Route path='/admin'  element={<Admin />} />
      <Route path="/" element={<App/>} />
      </Routes>
    </Router>
  </React.StrictMode>
)
