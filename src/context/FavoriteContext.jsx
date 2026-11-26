/* eslint-disable react-refresh/only-export-components */
import {createContext , useState  , useEffect} from "react";
import toast from "react-hot-toast";
export const FavoriteContext = createContext();

export const FavoriteProvider = ({children}) => {

    const [favorite , setFavorite] = useState(() => {
        const save = localStorage.getItem('favorite');
        return save ? JSON.parse(save) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorite" , JSON.stringify(favorite));
    } , [favorite]);



    const toggleFavorite = (product) => {
        setFavorite((prev) => {
            const exists = prev.find((item) => item.id === product.id);
            if (exists) {
                toast.success('Removed from favorites 🤍');
                return prev.filter((item) => item.id !== product.id);
            } else {
                toast.success('Added to favorites ❤️');
                return [...prev, product];
            }
        });
    };

    const isFavorite = (id) => {
    return favorite.some((item) => item.id === id);
};







return(
    <FavoriteContext.Provider value={{favorite ,toggleFavorite ,isFavorite }}>
        {children}
    </FavoriteContext.Provider>
)
}