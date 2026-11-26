import './ProductCardSkeleton.css';

const ProductCardSkeleton = () => {
  return (
    <div className="skeleton-cards">

      <div className="skeleton   skeleton-img"  />

      <div className="skeleton   skeleton-title"  />

      <div className="skeleton   skeleton-price"  />

      <div className="skeleton   skeleton-btn" />
    </div>
  );
};

export default ProductCardSkeleton;