// //counter Example 1
// import {useState} from 'react';
//     function App() {
//       const [count, setCount] = useState(0);
//       return (
//         <div>
//           <h2>Count:{count}</h2>
//             <button onClick={()=>setCount(count+1)}>Increment</button>
//             </div>  
//       );
//     }
//             export default App;
    

//show name Example 2
// import {useState} from 'react';
// function App() {
//     const [name, setName] = useState("");
//     return (
//         <div>
//             <input type="text" placeholder="Enter your name: " onChange={(e)=>setName(e.target.value)}/>
//             <h2>Hello {name}</h2>
//             </div>
//     );
// }
// export default App;


//change color Example 3
// import {useState} from 'react';
// function App() {
//     const [color, setColor] = useState("black");
//     return (
//         <div>
//             <h2 style={{color:color}}>React</h2>
//             <button onClick={()=>setColor("red")}>Red</button>
//             <button onClick={()=>setColor("blue")}>Blue</button>
//             </div>
//     );
// }

// export default App;

//password show hide Example 4
// import { useState } from 'react';

// function App() {
//     const [show, setShow] = useState(false);

//     return (
//         <div>
//             <input 
//                 type={show ? "text" : "password"} 
//                 placeholder="Enter your password" 
//             />
//             <button onClick={() => setShow(!show)}>
//                 {show ? "Hide" : "Show"}
//             </button>
//         </div>
//     );
// }

// export default App;

//linkinf page 
// import { BrowserRouter  , Route, Routes, Link } from 'react-router-dom';
// import Home from './home';
// import About from './about';
// import Contact from './contact';

// function App() {
//     return (
//         <BrowserRouter>
//             <h2>React Routing Example</h2>
            
//                 <Link to="/">Home</Link> |
//                 <Link to="/about">About</Link> |
//                 <Link to="/contact">Contact</Link>
//                 <hr />
//                 <Routes>
//                     <Route path="/" element={<Home/>}/>
//                     <Route path="/about" element={<About/>}/>
//                     <Route path="/contact" element={<Contact/>}/>   
//                 </Routes>
//         </BrowserRouter>
//     );
// }   

// export default App;



//authentication login+ register
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./login";
import Register from "./register";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/">Login</Link>
        <Link to="/register">Register</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;