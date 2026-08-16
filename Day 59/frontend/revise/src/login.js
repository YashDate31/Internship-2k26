import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });

    let error = "";
    if (name === "email") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Invalid Email";
      }
    }
    if (name === "password") {
      if (value.length === 0) {
        error = "Password is required";
      }   
    }

    setErrors({
      ...errors,
      [name]: error
    });
  };

  const validate = () => {
    let newErrors = {};

    if (user.email === "") {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      newErrors.email = "Invalid email";
    }

    if (user.password === "") {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const login = () => {
    if (validate()) {
      console.log("FRONTEND: Sending this data to API ->", user);
      axios.post("http://localhost:5000/login", {
        email: user.email,
        password: user.password
      }).then((res) => {
        if (res.data && res.data.code) {
          alert("Database Error: " + res.data.code);
        } else {
          alert("Login Successful");
          navigate("/home"); // Adjust the redirect route as needed
        }
      }).catch((err) => {
        if (err.response && err.response.data && err.response.data.message) {
          alert("Login Failed: " + err.response.data.message);
        } else {
          alert("Network Error or Invalid Credentials. Details: " + err.message);
        }
      });
    }
  }

  return (
    <div className="box">
      <h2>Login</h2>
      
      <input
        type="email"
        name="email"
        placeholder="Enter Email"
        value={user.email}
        onChange={handleChange}
      />
      <p style={{color:"red", margin: "0 0 10px 0", fontSize: "14px", textAlign: "left"}}>{errors.email}</p>
      
      <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={user.password}
        onChange={handleChange}
      />
      <p style={{color:"red", margin: "0 0 10px 0", fontSize: "14px", textAlign: "left"}}>{errors.password}</p>
      
      <button onClick={login}>
        Login
      </button>
      <br /><br />
      <Link to="/register">
        Don't have an account? Register
      </Link>
    </div>
  );
}

export default Login;
