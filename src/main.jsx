import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import TodayPricePage from './pages/TodayPricePage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LiveMarketDataProviderContext } from './providers/LiveMarketDataProvider'
import { ChakraProvider } from '@chakra-ui/react'
import MainLayout from './layout/Layout'
import RightShareAdj from './pages/calculator/RightShareAdj'
import BonusShareAdj from './pages/calculator/BonusShareAdj'
import Dividend from './pages/calculator/Dividend'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        index: true,
        element: <HomePage />,
      },
      {
        path: '/today-price',
        element: <TodayPricePage />,
      },
      {
        path: '/right-share-adjustment',
        element: <RightShareAdj />
      },
      {
        path: '/bonus-share-adjustment',
        element: <BonusShareAdj />
      },
      {
        path: '/dividend-calculator',
        element: <Dividend />
      },
      {
        path: '/share-transaction-calculator',
        element: <ShareTransactionCalculator />
      },

    ]
  },
])

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <LiveMarketDataProviderContext>
          <RouterProvider router={router} />
        </LiveMarketDataProviderContext>
      </QueryClientProvider>
    </ChakraProvider>
  </React.StrictMode>,
)
