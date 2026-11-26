/* eslint-disable react-refresh/only-export-components */
import { createContext , useState , useEffect  } from "react";
import toast from "react-hot-toast";

export const ProductContext = createContext();

export const ProductProvider  = ({children}) => {

    const[customProducts , setCustumProducts] = useState(() => {
        const saved = localStorage.getItem("custom_products")
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("custom_products" , JSON.stringify(customProducts))
    } , [customProducts]);

    const addProduct = (newProduct) => {
        setCustumProducts((prev) => [newProduct , ...prev])
    }

    const removeCustomProduct = (id) => {
        setCustumProducts((prev) => prev.filter((item) => item.id !== id));
        toast.success('Product Deleted Successfully 🗑️')
    }

    return(
        <ProductContext.Provider value={{customProducts , addProduct , removeCustomProduct}}>
            {children}
        </ProductContext.Provider>
    )
}