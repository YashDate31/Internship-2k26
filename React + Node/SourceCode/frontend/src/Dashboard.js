import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
    navigate("/");
  }

  return (
    <div className="box">
      <h2>Welcome {localStorage.getItem("userName")}</h2>
      <Link to="/addproduct">
        <button>Add Product</button>
      </Link>
      <br /><br />
      <Link to="/bulkupload">
        <button>Bulk Import</button>
      </Link>
      <br /><br />
      <Link to="/viewproducts">
        <button>View Products</button>
      </Link>
      <br /><br />
      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;
