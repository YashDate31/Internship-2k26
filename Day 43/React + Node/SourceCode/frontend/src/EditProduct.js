import React from "react";
import { useParams, Link } from "react-router-dom";

function EditProduct() {
    const { id } = useParams();

    return (
        <div>
            <h2>Edit Product</h2>
            <p>Editing product with ID: {id}</p>
            <Link to="/viewproducts">Back to Products</Link>
        </div>
    );
}

export default EditProduct;
