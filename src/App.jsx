
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Products from './pages/Products'
import NotFound from './pages/NotFound'
import { Header } from './components/Header'

function App() {

  return (
    <>
      <BrowserRouter>
      <Header />
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/products/:id' element={<Products />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
