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
      }
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
