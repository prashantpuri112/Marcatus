import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { LiveMarketDataProviderContext } from './providers/LiveMarketDataProvider'
import { ChakraProvider } from '@chakra-ui/react'
import MainLayout from './layout/Layout'
import RightShareAdj from './pages/calculator/RightShareAdj'
import BonusShareAdj from './pages/calculator/BonusShareAdj'
import Dividend from './pages/calculator/Dividend'
import ShareTransactionCalculator from './pages/calculator/ShareTransactionCalculator'
import Register from './pages/auth/Register'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'
import NewsDetail from './pages/NewsDetail'
import ResetPassword from './pages/auth/ResetPassword'
import News from './pages/News'
import Forex from './pages/Economy/Forex'
import { UserContext, UserProvider } from './context/userContext'
import ProfileUpdate from './pages/auth/ProfileUpdate'
import TopTurnoversAll from './pages/Market/TopTurnoversAll'
import Porfolio from './pages/pms/Porfolio'
import StockComparison from './pages/Market/StockComparison'
import TopSectorsAll from './pages/Market/TopSectorsAll'
import TopBrokersAll from './components/TopBrokerAll'
import LiveTrading from './pages/LiveTrading'
import StockMarket from './pages/Market/StockMarket'
import ShareBuy from './pages/calculator/sharebuy'

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
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/reset-password/:email',
        element: <ResetPassword />,
      },
      {
        path: '/user/profile',
        element: <ProfileUpdate />
      },
      {
        path: '/market/live-trading',
        element: <LiveTrading />,
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
        path: '/share-buy',
        element: <ShareBuy />
      },
      // {
      //   path: '/dividend-calculator',
      //   element: <Dividend />
      // },
      {
        path: '/share-transaction-calculator',
        element: <ShareTransactionCalculator />
      },
      {
        path: '/news/category/:category',
        element: <News />
      },
      {
        path: '/news/:slug',
        element: <NewsDetail />
      },
      {
        path: '/economy/forex',
        element: <Forex />
      },
      {
        path: '/market/top-turnovers',
        element: <TopTurnoversAll />
      },
      {
        path: '/market/live-trading',
        element: <Forex />
      },
      {
        path: '/market/top-sectors',
        element: <TopSectorsAll />
      },
      {
        path: '/market/top-brokers',
        element: <TopBrokersAll />
      },

      // PMS
      {
        path: '/portfolio',
        element: <Porfolio />
      },


      // Comparison
      {
        path: '/listed-companies',
        element: <StockMarket />
      },
      {
        path: '/stocks-comparison',
        element: <StockComparison />
      }

    ]
  },
])


const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <LiveMarketDataProviderContext>
            <ToastContainer />
            <RouterProvider router={router} />
          </LiveMarketDataProviderContext>
        </QueryClientProvider>
      </ChakraProvider>
    </UserProvider>
  </React.StrictMode>,
)
