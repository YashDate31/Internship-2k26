import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import AddProduct from "./AddProduct";
import BulkUpload from "./BulkUpload";
import ViewProducts from "./ViewProducts";
import Users from "./Users";
import EditUser from "./EditUser";
import EditProduct from "./EditProduct";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/bulkupload" element={<BulkUpload />} />
        <Route path="/viewproducts" element={<ViewProducts />} />
        <Route path="/users" element={<Users />} />
        <Route path="/edit/:id" element={<EditUser />} />
        <Route path="/editproduct/:id" element={<EditProduct />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
