
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Products from './pages/Products'
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Signup from './pages/Signup'
import CreateProduct from './pages/CreateProduct'
import EditProduct from './pages/EditProduct'
import { Header } from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './contexts/AuthContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          {/* Rotas públicas */}
          <Route path='/' element={<Home />} />
          <Route path='/products/:id' element={<Products />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          
          {/* Rotas protegidas */}
          <Route
            path='/products/new'
            element={
              <PrivateRoute>
                <CreateProduct />
              </PrivateRoute>
            }
          />
          <Route
            path='/products/:id/edit'
            element={
              <PrivateRoute>
                <EditProduct />
              </PrivateRoute>
            }
          />
          
          {/* Rota 404 */}
          <Route path='*' element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
