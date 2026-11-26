
import './App.css'
import Navbar from './components/Navbar'
import { Route  , Routes} from 'react-router-dom'
import Home from './pages/Home'
import Cart from './pages/Cart'
import ProductDetails from './pages/ProductDetails'
import Checkout from './pages/Checkout'
import AddProduct from './pages/AddProduct'
import { Toaster } from 'react-hot-toast'
import Favorite from './pages/Favorite'
import Login from './pages/Login'
import AdminLogin from './pages/AdminLogin'
import { ProtectedRoute , AdminRoute } from './components/ProtectedRoute'

function App() {
  

  return (
    <div>
      
      <Navbar/>
      <Toaster 
        position="top-center" 
        reverseOrder={false} 
        containerStyle={{
          top: '20%', 
        }}
        toastOptions={{
          duration: 3000, 
          style: {
            background: '#333',
            color: '#fff',
            padding: '12px 20px',
            borderRadius: '8px',
          },
        }}
      />

      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/admin-login' element={<AdminLogin/>}></Route>
        <Route path='/Cart' element={<Cart/>}></Route>
        <Route path='/product/:id' element={<ProductDetails/>}></Route>
        <Route path='/Checkout' element={
          <ProtectedRoute>
          <Checkout/>
          </ProtectedRoute>
          }></Route>

        <Route path='/addProduct' element={
          <AdminRoute>
          <AddProduct/>
          </AdminRoute>
          }></Route>

        <Route path='/favorite' element={
          <ProtectedRoute>
          <Favorite/>
          </ProtectedRoute>
          }></Route>
      </Routes>
    </div>
  )
}

export default App
