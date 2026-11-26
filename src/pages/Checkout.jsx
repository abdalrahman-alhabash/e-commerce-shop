import './Checkout.css';
import { CartContext } from '../context/CartContext';
import { useContext , useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Checkout = () => {

   const {cart , clearCart} = useContext(CartContext);

   const totalPrice = cart.reduce((sum , item) => sum + (item.price * item.quantity) ,0);

   const [formData , setFormData]   = useState({
    fullName : '',
    phone: '',
    address: '',
    city:'',
   });

   const [isSubmitted , setIsSubmitted]  = useState(false);

   const handelChange = (e) => {
    setFormData({...formData , [e.target.name ] : e.target.value})
   };

   const handelSubmit = (e) => {
    e.preventDefault();

    if(cart.length === 0){
        toast.error('your Cart Is Empty');
        return;
    }

    toast.success('Your order has been completed successfully ');
    setIsSubmitted(true);
    clearCart();
   };



   if(isSubmitted){
    return(
    <div className='checkout-success'>
        <h2>🎉 Thank you for your order!</h2>
        <p>We have received your order and will process it soon.</p>
        <Link to={"/"}>
        <button>Back TO Home</button>
        </Link>
    </div>
    )
   }

   return(
        <div className='checkout-page'>

            <h2>Checkout Details</h2>

            <div className='checkout-container'>
                <form className='checkout-form' onSubmit={handelSubmit}>
                    <h3>Shipping Information</h3>
                    <label>Full Name</label>
                    <input type="text" 
                    name='fullName'
                    value={formData.fullName}
                    onChange={handelChange}
                    required
                    placeholder='John Doe'
                    />

                    <label>Phone Number</label>
          <input 
            type="tel" 
            name="phone" 
            value={formData.phone} 
            onChange={handelChange} 
            required 
            placeholder="+963..."
          />

          <label>Address</label>
          <input 
            type="text" 
            name="address" 
            value={formData.address} 
            onChange={handelChange} 
            required 
            placeholder="Street name, Building..."
          />

          <label>City</label>
          <input 
            type="text" 
            name="city" 
            value={formData.city} 
            onChange={handelChange} 
            required 
            placeholder="Damascus"
          />
          <button type='submit' className='confirm-btn'>Confirm Order</button>
                </form>


        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cart.map((item) => (
              <div key={item.id} className="summary-item">
                <span>{item.title} (x{item.quantity})</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <hr />
          <div className="summary-total">
            <strong>Total Amount:</strong>
            <strong>${totalPrice.toFixed(2)}</strong>
          </div>
        </div>






            </div>
        </div>
   )

}
export default Checkout 



