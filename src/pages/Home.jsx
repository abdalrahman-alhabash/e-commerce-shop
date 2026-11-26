import axios from "axios";
import { useState , useEffect, useContext } from "react";
import ProductCard from "../components/ProductCard";
import   './Home.css'
import { ProductContext } from "../context/ProductContext";
import ProductCardSkeleton from "../components/ProductCardSkeleton";

const Home = () => {

    const {customProducts = []} = useContext(ProductContext) || {};

    const [products , setProducts] = useState([]);

    const[searchTerm  , setSearchTerm] = useState('');
    const[selectedCategory  , setSelectedCategory] = useState('all');
    const [sortBy , setsortBy] = useState('defualt');
    const[loading , setLoading] = useState(true);

     const [currentPage, setCurrentPage] = useState(1);
     const productsPerPage = 8;


    useEffect(() =>{

    axios.get('https://dummyjson.com/products')
    .then(response => {
        setProducts(response.data.products);
        setLoading(false);
    })
    .catch(error => {
        console.error("Error fetching data :", error);
        setLoading(false);
    })
    },[]);


    const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handleSotrChange = (e) => {
    setsortBy(e.target.value);
  }

    const allProducts = [...customProducts, ...products];

    if(loading){
        return (
      <div className="skeleton-loading">
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
    }


            const filteredProducts = allProducts.filter((product) => {
                const matchesSearch = product.title
                .toLowerCase()
                .includes(searchTerm.toLowerCase());


                const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

                return matchesSearch && matchesCategory ;
            });

            const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sortBy === 'price-low-to-high') {
            return a.price - b.price;
        } else if (sortBy === 'price-high-to-low') {
            return b.price - a.price;
        } else if (sortBy === 'name') {
            return a.title.localeCompare(b.title);
        }
        return 0; 
    });


            const indexOfLastProduct = currentPage * productsPerPage;
            const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
            const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);
            const totalPages = Math.ceil(sortedProducts.length / productsPerPage);


    return(

       

        <div className="Home-page">

             <div className="filter-container">
            <input type="text" placeholder="Search Products" value={searchTerm}  onChange={handleSearchChange} />
            <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="all">All</option>
                <option value="beauty">Beauty</option>
                <option value="fragrances">Fragrances</option>
                <option value="furniture">Furniture</option>
                <option value="groceries">Groceries</option>
            </select>
            <select className="sort-select" value={sortBy} onChange={handleSotrChange}>
            <option value="default">Default</option>
            <option value="price-low-to-high">Price : Low To High</option>
            <option value="price-high-to-low">Price : High To Low</option>
            <option value="name">Name A-Z</option>
          </select>
        </div>
                <div className="Products-grid">
            {currentProducts.length > 0 ?(
            currentProducts.map(product => (
        <ProductCard key={product.id} product={product} />
      ))
    ) :(
        <p>There is No Product Matches</p>
    )}
      </div>
       {totalPages > 1 && (
        <div className="pagination">
          <button 
            disabled={currentPage === 1} 
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={currentPage === index + 1 ? 'active' : ''}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}

          <button 
            disabled={currentPage === totalPages} 
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </button>
        </div>
      )}
        </div>
    );
};
export default Home

