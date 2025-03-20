import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Login.css";
import { useNavigate } from "react-router-dom";
import Zohoimg from "../assets/zoho-img.png";
import nec_logo from "../assets/nec_logo_2.jpg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect them to the correct dashboard
    const storedUser = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");

    if (storedUser && storedRole) {
      navigate(storedRole === "admin" ? "/admin-home" : "/home");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const { message, role } = response.data;

        // Store login details
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);

        alert(message); // Show success message

        // Redirect user based on role
        navigate(role === "admin" ? "/admin-home" : "/home");
      }
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <div className="college-info">
            <img src={nec_logo} alt="College Logo" className="college-logo" />
            <div className="college-text">
              <h1 className="college-name">National Engineering College</h1>
              <p className="college-address">K.R. Nagar, Kovilpatti - 628 503</p>
            </div>
          </div>
          <div className="other-info">
            <div className="tnea-code">
              <p>TNEA Counselling Code</p>
              <h2>4962</h2>
            </div>
          </div>
        </div>
      </header>

      <div className="center">
        <div className="container">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="userid"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
            <br /><br />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
            <br /><br />
            <button type="submit" id="login">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;





// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles/Login.css";
// // import { assets } from "../../../assets/assets";
// import { useNavigate } from "react-router-dom";
// import Zohoimg from '../assets/zoho-img.png';
// import nec_logo from '../assets/nec_logo_2.jpg';

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     // If user is already logged in, redirect to their respective dashboard
//     const storedUser = localStorage.getItem("username");
//     const storedRole = localStorage.getItem("role");

//     if (storedUser && storedRole) {
//       if (storedRole === "student") {
//         navigate("/student");
//       } else if (storedRole === "admin") {
//         navigate("/admin");
//       }
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:5000/api/login", {
//         username,
//         password,
//       });

//       const { message, role } = response.data;

//       if (response.status === 200) {
//         alert(message); // Show success message
//         localStorage.setItem("username", username); // Store username
//         localStorage.setItem("role", role); // Store role

//         // Redirect based on role
//         if (role === "student") {
//           navigate("/student");
//         } else if (role === "admin") {
//           navigate("/admin");
//         } else {
//           alert("Unknown role");
//         }
//       }
//     } catch (error) {
//       if (error.response && error.response.status === 401) {
//         alert("Invalid username or password.");
//       } else {
//         alert("An error occurred. Please try again.");
//       }
//     }
//   };

//   return (
//     <>
//       <header className="header">
//         <div className="header-content">
//           <div className="college-info">
//             <img src={nec_logo} alt="College Logo" className="college-logo" />
//             <div className="college-text">
//               <h1 className="college-name">National Engineering College</h1>
//               <p className="college-address">K.R. Nagar, Kovilpatti - 628 503</p>
//             </div>
//           </div>
//           <div className="other-info">
//             <div className="tnea-code">
//               <p>TNEA Counselling Code</p>
//               <h2>4962</h2>
//             </div>
//             {/* <img src={Zohoimg} alt="Principal or Representative" className="person-image" /> */}
//           </div>
//         </div>
//       </header>
//       <div className="center">
//         {/* <img src={Zohoimg} className="banner"/> */}
//         <div className="container">
//           <h2>Login</h2>
//           {/* <img src={nec_logo} alt="Logo" style={{ width: "80px", marginBottom: "10px" }} /> */}
//           <form onSubmit={handleSubmit}>
            
//               <input type="text" id="userid" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" required />
           
//             <br /><br/>
            
//               <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required />
            
//             <br /><br/>
//             <button type="submit" id="login">
//               Login
//             </button>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;



// // import React, { useState } from "react";
// // import axios from "axios"; // Import Axios for API calls
// // // import "./Login.css";
// // // import { assets } from "../../../assets/assets"; // Assuming the assets object contains your paths.
// // import { useNavigate } from "react-router-dom";

// // const Login = () => {
// //   const [username, setUsername] = useState("");
// //   const [password, setPassword] = useState("");
// //   const navigate = useNavigate();

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const response = await axios.post("http://localhost:5000/api/login", {
// //         username,
// //         password,
// //       });
// //       const { message, role } = response.data;

// //       if (response.status === 200) {
// //         alert(response.data.message); // Show success message
// //       }
// //       if (role === "student") {
// //         navigate("/student");
// //       } else if (role === "admin") {
// //         navigate("/admin-home");
// //       } else {
// //         alert("Unknown role");
// //       }
// //     } catch (error) {
// //       if (error.response && error.response.status === 401) {
// //         alert("Invalid username or password.");
// //       } else {
// //         alert("An error occurred. Please try again.");
// //       }
// //     }
// //   };

// //   return (
// //     <>
// //       <header className="header">
// //         <div className="header-content">
// //           <div className="college-info">
// //             {/* <img src={assets.nec} alt="College Logo" className="college-logo" /> */}
// //             <div className="college-text">
// //               <h1 className="college-name">National Engineering College</h1>
// //               <p className="college-address">K.R. Nagar, Kovilpatti - 628 503</p>
// //             </div>
// //           </div>
// //           <div className="other-info">
// //             <div className="tnea-code">
// //               <p>TNEA Counselling Code</p>
// //               <h2>4962</h2>
// //             </div>
// //             {/* <img src={assets.nec_person} alt="Principal or Representative" className="person-image" /> */}
// //           </div>
// //         </div>
// //       </header>
// //       <div className="center">
// //         {/* <img src={assets.nec_banner} className="banner"/> */}
// //       <div className="container">
// //         <h2>Login</h2>
// //         {/* <img src={assets.nec_logo_header} alt="Logo" style={{ width: "80px", marginBottom: "10px" }} /> */}
// //         <form onSubmit={handleSubmit}>
// //           <label>
// //             Username:
// //             <input type="text" value={username} onChange={e =>setUsername(e.target.value)} placeholder="Enter username" required />
// //           </label>
// //           <br />
// //           <label>
// //             Password:
// //             <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required />
// //           </label>
// //           <br />
// //           <button type="submit" style={{ backgroundColor: "green", color: "white" }}>
// //             Login / Register
// //           </button>
// //         </form>
// //       </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default Login;