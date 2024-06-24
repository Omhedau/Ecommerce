import { useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Instagram from './components/Instagram'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ProductDetail from './pages/ProductDetail'
import RelatedProducts from './components/RelatedProducts'
import Shop from './pages/Shop'
import { Route, Routes } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/> 
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/shop/:gender" element={<Shop/>} />
       <Route path="/product/id/:id" element={<ProductDetail/>} />
       <Route path="/cart" element={<Cart/>} />
       <Route path="/checkout" element={<Checkout/>} />
     </Routes>
     <div className=''>
     <Instagram/>
     <Footer/>
     </div>
    </>
  )
}

export default App
