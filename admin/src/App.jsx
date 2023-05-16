import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ChakraProvider } from '@chakra-ui/react';
import { UserProvider } from './context/userContext';
import Dashboard from './pages/Dashboard';
import CreateNews from './pages/CreateNews';
import NewsDetail from './pages/NewsDetail';
import ProfileUpdate from './pages/ProfileUpdate';
import ExtractData from './pages/ExtractData';

function App() {

  const token = localStorage.getItem('stock_token')

  return (
    <div className="App">
      <UserProvider>
        <ChakraProvider>
          <ToastContainer />
          <Router>
            <Routes>
              {
                token ?
                  <>
                    <Route exact path='/' element={<Dashboard />} />
                    <Route exact path='/news/create' element={<CreateNews />} />
                    <Route exact path='/news/update/:newsSlug' element={<CreateNews />} />
                    <Route exact path='/news/:slug' element={<NewsDetail />} />
                    <Route exact path='/user/profile' element={<ProfileUpdate />} />
                    <Route exact path='/extract-data' element={<ExtractData />} />
                  </> :
                  <Route exact path='/' element={<Login />} />
              }
            </Routes>
          </Router>
        </ChakraProvider>
      </UserProvider>
    </div>
  )
}

export default App
