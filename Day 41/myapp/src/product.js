// import "./Product.css";

function Product(props) {
    return (
        <div style={{border: "1px solid black", padding: "10px", margin: "10px", borderRadius: "5px"}}>
        <div className="product-card">
            <h3>{props.name}</h3>
            <p><strong>Price:</strong> ₹{props.price}</p>
            <p><strong>Category:</s`trong> {props.category}</p>
        </div>
        </div>
    );
}

export default Product;