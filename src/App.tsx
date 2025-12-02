// src/App.tsx
import React, { Suspense } from 'react'
import Hearts from './Hearts'

import { FadeIn, ScrollIndicator } from './layout/styles'
import ScrollGalleryPage from './pages/ScrollGallery'
import './index.css'

const App: React.FC = () => {
  return (
    <div className="app-root">
      {/* Hero section with hearts background + overlay */}
      <section className="hero-section">
        <Suspense fallback={null}>
          <Hearts speed={8} />
          <FadeIn />
          <ScrollIndicator>
            <span>Scroll</span>
          </ScrollIndicator>
          {/* Scrollable R3F gallery section */}
          <section className="gallery-section">
            <ScrollGalleryPage />
          </section>

        </Suspense>
      </section>


    </div>
  )
}

export default App
