import { Navbar } from '@/components/global/navbar/navbar'
import Home from '@/components/home/home-component'
import React from 'react'

const HomePage = async () => {
  return (
    <>
      <Navbar />
      <Home />
    </>
  )
}

export default HomePage
