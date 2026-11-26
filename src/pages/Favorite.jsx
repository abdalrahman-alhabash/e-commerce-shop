import { useContext } from "react"
import { FavoriteContext } from "../context/FavoriteContext"
import { Link } from "react-router-dom";
const Favorite = () => {
    const {toggleFavorite , isFavorite , favorite} = useContext(FavoriteContext);


    return (
        <div className="favorite-page">
            <h2>My Favorite Products ❤️</h2>
            
            {favorite.length === 0 ? (
                <p>No favorite products added yet.</p>
            ) : (
                favorite.map(item => {
                    const liked = isFavorite(item.id);
                    return (
                        <div key={item.id} className="cart-item">
                            <img src={item.thumbnail} alt={item.title} />
                            <Link to={`/product/${item.id}`}>
                                <h3>{item.title}</h3>
                            </Link>
                            <p className="price">Price : {item.price} $</p>
                            <button 
                            className="remove-favorite-btn"
                onClick={() => toggleFavorite(item)} 
                style={{ backgroundColor: liked ? '#ff4d4d' : '', color: liked ? '#fff' : '',  width : '100px', margin : '10px', 
                    border : 'none', borderRadius : '8px' , padding : '10px' , fontSize : '13px' , fontWeight : '500'
                }}
            >
                {liked ? 'Remove from Favorite ❤️' : 'Add to Favorite 🤍'}
            </button>
                        </div>
                    );
                })
            )}
        </div>
    );
}
export default Favorite