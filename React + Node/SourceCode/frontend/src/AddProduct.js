import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const saveProduct = () => {
    const userId = localStorage.getItem("userId");
    if (!userId || userId === "null" || userId === "undefined") {
      alert("You must be logged in to add a product!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("user_id", userId);
    formData.append("image", image);

    axios.post("http://localhost:5000/addproduct", formData)
      .then((res) => {
        alert(res.data);
        navigate("/viewproducts");
      })
      .catch((err) => {
        console.error(err);
        const errMsg = err.response && err.response.data ? err.response.data : "Failed to add product. Please check the console.";
        alert(typeof errMsg === 'string' ? errMsg : JSON.stringify(errMsg));
      });
  }

  return (
    <div className="box">
      <h2>Add Product</h2>
      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <br /><br />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <br /><br />
      <button onClick={saveProduct}>
        Add Product
      </button>
    </div>
  );
}

export default AddProduct;
