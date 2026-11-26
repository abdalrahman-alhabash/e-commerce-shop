import './ProductCard.css'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'
import { FavoriteContext } from '../context/FavoriteContext'
import { ProductContext } from '../context/ProductContext'
const ProductCard = ({product}) =>{

    const {addToCart} = useContext(CartContext);
    const {toggleFavorite , isFavorite} = useContext(FavoriteContext);

    const {removeCustomProduct , customProducts} = useContext(ProductContext);

    const isCustom  = customProducts.some((item) => item.id === product.id)

    const liked = isFavorite(product.id);

    return(
    <div className="product-card">
        <img src={product.thumbnail} alt={product.title} />
        <Link to={`/product/${product.id}`}>
        <h3>{product.title}</h3>
        </Link>
        <p className="price">Price : {product.price} $</p>
        <button onClick={() => addToCart(product)}>Add to Cart</button>
        <button 
                onClick={() => toggleFavorite(product)} 
                style={{ backgroundColor: liked ? '#ff4d4d' : '', color: liked ? '#fff' : '' }}
            >
                {liked ? 'Remove from Favorite ❤️' : 'Add to Favorite 🤍'}
            </button>
            {isCustom && (
            <button
            onClick={() => removeCustomProduct(product.id)}
            >
                Delete Product
            </button>
)}
    </div>
    )
}
export default ProductCard