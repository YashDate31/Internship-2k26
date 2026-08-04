import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchName, setSearchName] = useState("");
  const [searchCategory, setSearchCategory] = useState("");

  const limit = 5;

  const getProducts = async (currentPage = 1) => {
    const id = localStorage.getItem("userId");
    if (!id) return;

    const res = await axios.get(
      `http://localhost:5000/products/${id}?page=${currentPage}&limit=${limit}&name=${searchName}&category=${searchCategory}`
    );

    setProducts(res.data.data || []);
    setTotalPages(res.data.totalPages || 1);
  };

  useEffect(() => {
    getProducts(1);
  }, []);


  const handleSearch = async () => {
    setPage(1);
    await getProducts(1);
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/deleteproducts/${productId}`);
        // Refresh product list
        getProducts(page);
      } catch (error) {
        alert("Failed to delete product");
        console.error("Error deleting product:", error);
      }
    }
  };

  //api pagination
  const handlePageChange = async (newPage) => {
    setPage(newPage);
    await getProducts(newPage);
  };

  return (
    <div>
      <h2 align="center">My Products</h2>
      <center>
        <Link to="/dashboard">
          <button>Back</button>
        </Link>
      </center>


      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', margin: '20px 0' }}>
        <input
          type="text"
          placeholder="Search by Product Name..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          style={{ padding: "10px", width: "300px", border: "1px solid #ccc", fontSize: "14px" }}
        />
        <input
          type="text"
          placeholder="Search by Category..."
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
          style={{ padding: "10px", width: "200px", borderRadius: "5px", border: "1px solid #ccc", fontSize: "14px" }}
        />
        <button onClick={handleSearch} style={{ padding: "10px 20px", cursor: "pointer", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "5px", fontSize: "14px", fontWeight: "bold" }}>
          Search
        </button>
      </div>

      <br />

      {/* Product Cards */}
      {products.length > 0 ? (
        products.map((item) => (
          <div className="card" key={item.id}>
            <img
              src={"http://localhost:5000/uploads/" + item.image}
              alt={item.name}
            />
            <h3>{item.name}</h3>
            <h4>₹ {item.price}</h4>
            <p>{item.category}</p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
              <Link to={`/editproduct/${item.id}`} style={{ padding: "5px 10px", backgroundColor: "#ffc107", color: "#000", textDecoration: "none", borderRadius: "5px" }}>
                Edit
              </Link>
              <button onClick={() => handleDelete(item.id)} style={{ padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <p align="center">No products found.</p>
      )}

      <br />
      {/* Pagination Controls */}
      <center style={{ marginTop: "20px", marginBottom: "40px" }}>
        <button
          disabled={page === 1}
          onClick={() => handlePageChange(page - 1)}>
          Previous
        </button>
        <span style={{ margin: "0 20px" }}>
          Page {page} of {totalPages === 0 ? 1 : totalPages}
        </span>
        <button
          disabled={page >= totalPages}
          onClick={() => handlePageChange(page + 1)}>
          Next
        </button>
      </center>
    </div>
  );
}

export default ViewProducts;
