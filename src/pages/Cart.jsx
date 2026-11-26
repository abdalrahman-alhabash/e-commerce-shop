import './Cart.css'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'
const Cart = () =>{
    
    const {cart , removeFromCart  , decreaseQuantity , addToCart , clearCart} = useContext(CartContext);

    const totalPrice  = cart.reduce((sum,item) => sum + item.price * (item.quantity || 1),0);
    if(cart.length === 0){
        return(
    <div className="cart-page">
        <h2>Shopping Page</h2>
        <p className='cart-empty'>Your Cart is empty 🛒.</p>
    </div>
);
    }


    return(
        <div className="cart-page">

        <h2>Shopping Cart</h2>

        <div className='clear-btn'>
        <button onClick={clearCart}>Clear Cart</button>
        </div>
        
        <div className="cart-items">
            {cart.map(item => (
                <div key={item.id} className="cart-item">
                    <img src={item.thumbnail} alt={item.title} />
                    <Link to={`/product/${item.id}`}>
                    <h3>{item.title}</h3>
                    </Link>
                    <p className="price">Price : {item.price} $</p>
                    
                    <div className='quantity-contolars'>
                         <p>Quantity : {item.quantity}</p>
                        <button onClick={() => decreaseQuantity(item.id)}>-</button>
                         <button onClick={() => addToCart(item)}>+</button>
                    </div>

                    <p>Total : ${(item.quantity * item.price).toFixed(2)}</p>
                    <button className='remove-btn' onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
            ))}
        </div>
        <div className="cart-summry">
            <h3>Total : {totalPrice.toFixed(2)}</h3>
            <Link to={"/checkout"}>
            <button className='checkout-btn'>Proceed to Checkout</button>
            </Link>
            
        </div>
    </div>
    )

} 
export default Cart