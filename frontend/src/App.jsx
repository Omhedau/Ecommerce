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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Navbar/> 
     <div className=''>
     {/* <Home/> */}
     {/* <Cart/> */}
     {/* <Checkout/> */}
     <ProductDetail/>
     <Shop/>
     <Instagram/>
     <Footer/>
     </div>
    </>
  )
}

export default App
