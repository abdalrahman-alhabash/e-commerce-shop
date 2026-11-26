import  './Navbar.css'
import { NavLink , useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { AuthContext } from "../context/AuthContext";
import { Link } from 'react-router-dom';
const Navbar =() => {
    const { user, isAuthenticated, logOut } = useContext(AuthContext);
    const {clearCart} = useContext(CartContext);
    const navigate = useNavigate();

    const { cart } = useContext(CartContext);

      const handleLogout = () => {
        logOut();
        clearCart();
        navigate("/login");
    }

    const totalItems = cart.reduce((sum,item)=> sum + (item.quantity || 1),0)

    return(
        <nav className='navbar'>
            <div className="logo">My Store</div>
            <div className='Nav'>
                    <NavLink to="/" >Home</NavLink>
                    <NavLink to="/cart">Cart</NavLink>
                    <NavLink to="/favorite">Favorite</NavLink>
                    {isAuthenticated && user?.role === "admin" &&(
                    <NavLink to="/addProduct">Add Product</NavLink>
                    )}
                    </div>
            <div className="cart-icon-container">
        <Link to="/cart">
        <span className="cart-icon">🛒</span>
        </Link>
        {totalItems > 0 &&  <span className="cart-badge">{totalItems}</span>}
    </div>




                    <div className='nav-logIn'>
                        {isAuthenticated ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ color: '#fff', fontSize: '14px' }}>
                            {user?.username} ({user?.role})
                        </span>
                        <button onClick={handleLogout} style={{ padding: '8px 15px', backgroundColor: '#e63946', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}>
                            Logout 🔒
                        </button>
                    </div>
                ) : (
                    <>
                        <NavLink to="/login" style={{ padding: '8px 15px', backgroundColor: '#007bff', color: '#fff', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
                            Login
                        </NavLink>
                        <NavLink to="/admin-login" style={{ padding: '8px 15px', backgroundColor: '#333', color: '#fff', textDecoration: 'none', borderRadius: '5px', fontWeight: 'bold' }}>
                            Admin Portal
                        </NavLink>
                    </>
                )}
                        </div>

            
        </nav>
    )
}
export default Navbar

