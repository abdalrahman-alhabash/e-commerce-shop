import { useContext, useState } from "react"
import axios from "axios";
import './AddProduct.css'
import { ProductContext } from "../context/ProductContext";
import toast from "react-hot-toast";

const AddProduct = () => {

    const { addProduct} = useContext(ProductContext);

    const[formData,setFormData] = useState({
        title : '',
        price: '',
        category: '',
        image:'',
        description: '',
    });
    const[loading , setLoading] = useState(false);

    const handelChange = (e) => {
        setFormData({...formData,[e.target.name] : e.target.value})
    }

    const handelSubmit =  async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const response = await axios.post('https://dummyjson.com/products/add' , {
                title : formData.title,
                price : parseFloat(formData.price),
                category : formData.category,
                thumbnail : formData.image  || 'https://via.placeholder.com/150',
                description : formData.description, 
            });

            console.log("Response From Server " , response.data);

            const newProductObj = {
                id :  Date.now(),
                title : formData.title,
                price : parseFloat(formData.price),
                category : formData.category,
                thumbnail : formData.image || 'https://via.placeholder.com/150',
                description : formData.description, 
            }
            addProduct(newProductObj);

            toast.success('The new Product has been Added ✨')

            setFormData({
        title: '',
        price: '',
        category: '',
        image: '',
        description: '',
      });

        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product. Please try again.");
        } finally {
            setLoading(false);
        };
        
    };

    return(
        <div className="addProduct-page">
            <h2>Add Product</h2>
            <div className="addProduct-container">
                <form className="addProduct-form" onSubmit={handelSubmit}>
                    <label>Title</label>
                    <input
                     type="text"
                     name="title"
                     value={formData.title}
                     placeholder="Title"
                     required 
                     onChange={handelChange} />

                    <label>Price</label>
                    <input
                     type="number"
                      step="0.01"
                      name="price"
                      value={formData.price}
                      placeholder="Price (e.g. 19.99)"
                      required
                      onChange={handelChange} />

                    <label>Category</label>
                    <input type="text" name="category" value={formData.category}  placeholder="category" required  onChange={handelChange} />

                    <label>Image</label>
                    <input type="text" name="image" value={formData.image} placeholder="Image URL (e.g. https://...)"   onChange={handelChange} />

                    <label>Description</label>
                    <textarea name="description" value={formData.description} required onChange={handelChange}></textarea>

                    <button className="addProduct-btn" type="submit" disabled={loading}>
                        {loading ? "Adding Product .... " : "Add Product"}
                    </button>
                </form>
            </div>
        </div>
    )
}
export default AddProduct