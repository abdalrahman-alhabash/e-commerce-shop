/* eslint-disable react-refresh/only-export-components */
import {createContext , useState  , useEffect} from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export const CartProvider = ({children}) =>{
    const [cart , setCart] = useState(() =>{
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : []
    });


    useEffect(() => {
        localStorage.setItem("cart" , JSON.stringify(cart));

    }, [cart]);
    
    const addToCart  = (product) => {
        setCart((prevCart) => {
            const existingProduct = prevCart.find((item) => item.id === product.id);

            if(existingProduct){
                return prevCart.map((item)=>
                item.id === product.id
                ? {...item , quantity : (item.quantity || 1) +1}
                : item
                )
                
            }
            else{
                return [...prevCart , { ...product , quantity : 1}]
            }
        });
                toast.success('The Product has been added to the cart  🛒');
    };



    const decreaseQuantity = (id) => {
        setCart((prevCart) =>{
            const existingProduct = prevCart.find((item) => item.id === id);
            if(existingProduct.quantity === 1){
                return prevCart.filter((item) => item.id !== id);
            } else {
                return prevCart.map((item) => 
                item.id === id ? {...item , quantity : item.quantity - 1} : item
                )
            };
        });
    };


    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
        toast.success('The Product has been removed');
    };

    const clearCart = () => {
        setCart([]);
        toast.success('The Cart was emptied successfully');
    }

    return(
        <CartContext.Provider value={{cart , addToCart , removeFromCart , decreaseQuantity , clearCart}}>
            {children}
        </CartContext.Provider>
            
    )
}