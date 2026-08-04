import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    axios.post("http://localhost:5000/login", {
      email,
      password
    }).then((res) => {
      if (res.data.status) {
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("userName", res.data.name);
        alert("Login Successful");
        navigate("/dashboard");
      } else {
        alert("Invalid Email or Password");
      }
    });
  }

  return (
    <div className="box">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={user.password}
        onChange={handleChange}
    /> */}
      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>
        Login
      </button>
      <br /><br />
      <Link to="/register">
        New User? Register
      </Link>
    </div>
  );
}

export default Login;
