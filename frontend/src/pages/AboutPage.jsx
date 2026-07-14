import React from 'react'
import Nav from '../component/Nav'
import About from '../component/About'
import Footer from '../component/Footer'

function AboutPage() {
  return (
    <div className="w-full min-h-screen relative">
      <div className="absolute top-0 left-0 w-full z-50">
        <Nav />
      </div>
      <div className="pt-[70px]">
        <About />
      </div>
      <Footer />
    </div>
  )
}

export default AboutPage
