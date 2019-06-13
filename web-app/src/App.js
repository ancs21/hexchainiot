import React from 'react'
import { Router } from '@reach/router'

import Dashboard from './pages/dashboard'

function App() {
  return (
    <Router>
      <Dashboard path="/" />
    </Router>
  )
}

export default App
