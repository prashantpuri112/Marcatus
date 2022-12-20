import { Box } from '@chakra-ui/react'
import React, { FC, PropsWithChildren } from 'react'
import Footer from './Footer'
import Header from './Header'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <Box width={'100%'}>
      <Header />
      <Outlet />
      <Footer />
    </Box>
  )
}

export default MainLayout
