import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { ProductContext } from "../context/ProductContext";
import './ProductDetails.css';

const ProductDetails = () => {
    const { addToCart } = useContext(CartContext);
    const { customProducts = [] } = useContext(ProductContext) || {};
    const { id } = useParams();

    const [apiProduct, setApiProduct] = useState(null);
    const [apiLoading, setApiLoading] = useState(true);
    const [notFound, setNotFound] = useState(false);

    const localProduct = customProducts.find(
        item => String(item.id) === String(id)
    );

    useEffect(() => {
        if (localProduct) return;

        let isMounted = true;

        fetch(`https://dummyjson.com/products/${id}`)
            .then(res => res.json())
            .then((data) => {
                if (!isMounted) return;
                if (data.message) {
                    setNotFound(true);
                } else {
                    setApiProduct(data);
                }
                setApiLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching product details:', err);
                if (isMounted) {
                    setNotFound(true);
                    setApiLoading(false);
                }
            });

        return () => { isMounted = false; };
    }, [id, localProduct]);

    const product = localProduct || apiProduct;
    const loading = !localProduct && apiLoading;

    if (loading) {
        return (
    <div className="details-skeleton-container">
      
      <div className="skeleton details-img-skeleton" />
      
      
      <div className="details-info-skeleton">
        <div className="skeleton details-title-skeleton" />
        <div className="skeleton details-price-skeleton" />
        <div className="skeleton details-desc-skeleton" />
        <div className="skeleton details-btn-skeleton" />
      </div>
    </div>
  );
    }

    if (!product || notFound) {
        return <div className="not-found">This Product Is Not Exist❌</div>;
    }

    return (
        <div className="product-card">
            <img 
                src={product.thumbnail || 'https://via.placeholder.com/150'} 
                alt={product.title} 
            />
            <h3>{product.title}</h3>
            <p className="price">Price : {product.price} $</p>
            <p>{product.description}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    );
};

export default ProductDetails;