
import { BrowserRouter ,Routes,Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import { CartProvider } from './context/CartContext'
import Checkout from './pages/Checkout'
import Navbar from './components/Navbar'
import CartPage from './pages/CartPage'
import Orders from './pages/Orders'

function App() {
  

  return (
    <CartProvider>
      <BrowserRouter>
        <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<CartPage/>}/>
         <Route path="/checkout" element={<Checkout/>}/>
         <Route path="/orders" element={<Orders/>}/>
      </Routes>
      
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
