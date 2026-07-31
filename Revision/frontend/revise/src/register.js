import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // const handleChange = (e) => {
    //   setUser({ ...user, [e.target.name]: e.target.value });
    // };

    // const validate = () => {
    //   let newErrors = {};

    //   if (user.name.trim() === "") {
    //       newErrors.name = "Name is required";
    //   }

    //   if (user.email === "") {
    //       newErrors.email = "Email is required";
    //   } else if (!/\S+@\S+\.\S+/.test(user.email)) {
    //       newErrors.email = "Invalid email";
    //   }

    //   if (user.password === "") {
    //       newErrors.password = "Password is required";
    //   } else if (user.password.length < 6) {
    //       newErrors.password = "Password must be at least 6 characters";
    //   }

    //   setErrors(newErrors);
    //   return Object.keys(newErrors).length === 0;
    // };

    const handleChange = (e) => {

        const { name, value } = e.target;
        // debugger;

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
            if (value.length < 6) {
                error = "Password should be at least 6 characters";
            }
        }

        setErrors({
            ...errors,
            [name]: error
        });
    };

    const validate = () => {
        let newErrors = {};

        if (user.name.trim() === "") {
            newErrors.name = "Name is required";
        }

        if (user.email === "") {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
            newErrors.email = "Invalid email";
        }

        if (user.password === "") {
            newErrors.password = "Password is required";
        } else if (user.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const register = () => {
        if (validate()) {
            console.log("FRONTEND: Sending this data to API ->", user);
            axios.post("http://localhost:5000/register", {
                name: user.name,
                email: user.email,
                password: user.password
            }).then((res) => {
                if (res.data && res.data.code) {
                    alert("Database Error: " + res.data.code);
                } else {
                    alert("Registration Successful");
                    navigate("/");
                }
            }).catch((err) => {
                if (err.response && err.response.data && err.response.data.message) {
                    alert("Registration Failed: " + err.response.data.message);
                } else {
                    alert("Network Error! Is your backend server and MySQL running? Details: " + err.message);
                }
            });
        }
    }

    return (
        <div className="box">
            <h2>Register</h2>

            <input
                type="text"
                name="name"
                placeholder="Enter Name"
                value={user.name}
                onChange={handleChange}
            />
            <p style={{ color: "red", margin: "0 0 10px 0", fontSize: "14px", textAlign: "left" }}>{errors.name}</p>

            <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={user.email}
                onChange={handleChange}
            />
            <p style={{ color: "red", margin: "0 0 10px 0", fontSize: "14px", textAlign: "left" }}>{errors.email}</p>

            <input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={user.password}
                onChange={handleChange}
            />
            <p style={{ color: "red", margin: "0 0 10px 0", fontSize: "14px", textAlign: "left" }}>{errors.password}</p>

            <button onClick={register}>
                Register
            </button>
            <br /><br />
            <Link to="/">
                Already have account? Login
            </Link>
        </div>
    );
}

export default Register;
