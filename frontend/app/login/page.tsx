// "use client";
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from 'axios';
// import { getLocalStorgeToken } from "../../components/getToken";



// const LoginPage = () => {
  
//   const token = getLocalStorgeToken();
//   useEffect(() => {
//     if (token) {
//       window.location.href = "/product";
//     }
// }, [token]);

//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     username: ""
//   });

//   const handleToggleForm = () => {
//     setIsLogin(!isLogin);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };


//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     try {
//       let response;
//       if (isLogin) {
//         response = await axios.post("https://api-three-murex.vercel.app/api/login", formData);
//       } else {
//         response = await axios.post("https://api-three-murex.vercel.app/api/admin/signup", formData);
//       }
//       const { token } = response.data;
//       if (token) {
//         try {
//           if (typeof window !== 'undefined') {
//             localStorage.setItem('token', token);
//           }
//         } catch (error) {
//           console.error('Error while setting token in localStorage:', error);
//         }
//       } else {
//         try {
//           if (typeof window !== 'undefined') {
//             localStorage.removeItem('token');
//           }
//         } catch (error) {
//           console.error('Error while removing token from localStorage:', error);
//         }
//       }
//       console.log(response.data);
//       window.location.reload();
//     } catch (error) {
//       console.error("API Error:", error);
//     }
//   };
  

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <motion.div
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="p-8 bg-white rounded-lg shadow-red-600"
//       >
//         <h2 className="text-3xl mb-4">{isLogin ? "Login" : "Sign Up"}</h2>
//         <form className="space-y-4" onSubmit={handleSubmit}>
//           {!isLogin && (
//             <div className="flex flex-col">
//               <label htmlFor="username" className="mb-1">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="border border-gray-300 rounded-md px-3 py-2"
//               />
//             </div>
//           )}
//           <div className="flex flex-col">
//             <label htmlFor="email" className="mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label htmlFor="password" className="mb-1">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="border border-gray-300 rounded-md px-3 py-2"
//             />
//           </div>
          
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
//           >
//             {isLogin ? "Login" : "Sign Up"}
//           </button>
//         </form>
//         <p className="mt-4">
//           {isLogin ? "Don't have an account?" : "Already have an account?"}
//           <button
//             type="button"
//             onClick={handleToggleForm}
//             className="ml-1 text-blue-500 hover:underline"
//           >
//             {isLogin ? "Sign up here" : "Login here"}
//           </button>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default LoginPage;



// "use client";
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { getLocalStorgeToken } from "../../components/getToken";
// import Image from "next/image";

// const LoginPage = () => {
//   const token = getLocalStorgeToken();
//   useEffect(() => {
//     if (token) {
//       window.location.href = "/product";
//     }
//   }, [token]);

//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     username: ""
//   });

//   const handleToggleForm = () => {
//     setIsLogin(!isLogin);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = isLogin
//         ? "https://api-three-murex.vercel.app/api/login"
//         : "https://api-three-murex.vercel.app/api/admin/signup";
//       const response = await axios.post(url, formData);
//       const { token } = response.data;
//       if (token) {
//         localStorage.setItem("token", token);
//         window.location.reload();
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <motion.div
//         initial={{ opacity: 0, scale: 0.9 }}
//         animate={{ opacity: 1, scale: 1 }}
//         transition={{ duration: 0.5 }}
//         className="w-2/3 h-3/4  p-8 rounded-lg shadow-lg bg-white"
//       >
//         <div className="flex justify-center mb-4">
//           <motion.button
//             className={`px-4 py-2 w-1/2 transition-colors rounded-t-lg ${
//               isLogin ? "bg-black text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setIsLogin(true)}
//           >
//             Login
//           </motion.button>
//           <motion.button
//             className={`px-4 py-2 w-1/2 transition-colors rounded-t-lg ${
//               !isLogin ? "bg-black text-white" : "bg-gray-200"
//             }`}
//             onClick={() => setIsLogin(false)}
//           >
//             Sign Up
//           </motion.button>
//         </div>
//         <motion.div
//           key={isLogin ? "login" : "signup"}
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           exit={{ opacity: 0, x: -50 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h2 className="text-2xl text-center mb-4">
//             {isLogin ? "Login" : "Sign Up"}
//           </h2>
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             {!isLogin && (
//               <div className="flex flex-col">
//                 <label htmlFor="username">Username</label>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   className="border rounded-md px-3 py-2"
//                 />
//               </div>
//             )}
//             <div className="flex flex-col">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="border rounded-md px-3 py-2"
//               />
//             </div>
//             <div className="flex flex-col">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="border rounded-md px-3 py-2"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full bg-black text-white py-2 rounded-md transition"
//             >
//               {isLogin ? "Login" : "Sign Up"}
//             </button>
//           </form>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default LoginPage;










// "use client";
// import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import { getLocalStorgeToken } from "../../components/getToken";
// import Button from "@/components/Button";
// import Image from "next/image";

// const LoginPage = () => {
//   const token = getLocalStorgeToken();
//   useEffect(() => {
//     if (token) {
//       window.location.href = "/product";
//     }
//   }, [token]);

//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//     username: ""
//   });

//   const handleToggleForm = () => {
//     setIsLogin(!isLogin);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const url = isLogin
//         ? "https://api-three-murex.vercel.app/api/login"
//         : "https://api-three-murex.vercel.app/api/admin/signup";
//       const response = await axios.post(url, formData);
//       const { token } = response.data;
//       if (token) {
//         localStorage.setItem("token", token);
//         window.location.reload();
//       }
//     } catch (error) {
//       console.error("API Error:", error);
//     }
//   };

//   return (
//     <div className="flex h-screen  items-center justify-center">
      
//       <div className="relative w-2/3 h-3/4  shadow-lg rounded-lg overflow-hidden flex">
//       <Image
//         className="flex"
//         src="/Background4.gif"
//         width={1100}
//         height={1000}
//         alt="Website logo"
//       />
//         <motion.div 
//           initial={{ x: 0 }}
//           animate={{ x: isLogin ? 0 : "+50%" }}
//           transition={{ duration: 0.5 }}
//           className="absolute w-full h-full flex"
//         >
//           <div className={`bg-transparent backdrop-blur-md w-1/2 flex flex-col justify-center items-center p-8 transition-all duration-500 ${isLogin ? 'block' : 'hidden'}`}>
//             <h2 className="text-3xl mb-6">Login</h2>
//             <form className="space-y-4 w-3/4" onSubmit={handleSubmit}>
//               <div className="flex flex-col">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="border rounded-md px-3 py-2"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="password">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="border rounded-md px-3 py-2"
//                 />
//               </div>
//               <Button type="submit" title="Login" variant="btn_dark" icon="" />
//             </form>
//             <p className="mt-4 cursor-pointer text-blue-500 hover:underline" onClick={handleToggleForm}>
//               Don't have an account? Sign up
//             </p>
//           </div>
//           <div className={`bg-transparent backdrop-blur-md w-1/2 flex flex-col justify-center items-center p-8 transition-all duration-500 ${isLogin ? 'hidden' : 'block'}`}>
//             <h2 className="text-3xl mb-6">Sign Up</h2>
//             <form className="space-y-4 w-3/4" onSubmit={handleSubmit}>
//               <div className="flex flex-col">
//                 <label htmlFor="username">Username</label>
//                 <input
//                   type="text"
//                   id="username"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleChange}
//                   className="border rounded-md px-3 py-2"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="email">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="border rounded-md px-3 py-2"
//                 />
//               </div>
//               <div className="flex flex-col">
//                 <label htmlFor="password">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="border rounded-md px-3 py-2"
//                 />
//               </div>
//               <Button type="submit" title="Sign Up" variant="btn_dark" icon="" />
//             </form>
//             <p className="mt-4 cursor-pointer text-green-500 hover:underline" onClick={handleToggleForm}>
//               Already have an account? Login
//             </p>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;





"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { getLocalStorgeToken } from "../../components/getToken";
import Button from "@/components/Button";
import Image from "next/image";

const LoginPage = () => {
  const token = getLocalStorgeToken();
  useEffect(() => {
    if (token) {
      window.location.href = "/product";
    }
  }, [token]);

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    username: ""
  });

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = isLogin
        ? "https://api-three-murex.vercel.app/api/login"
        : "https://api-three-murex.vercel.app/api/admin/signup";
      const response = await axios.post(url, formData);
      const { token } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        window.location.reload();
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center p-4">
      <div className="relative w-2/3 h-3/4 shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        <Image src="/Background3.gif" layout="fill" objectFit="cover" alt="background" className="flex -z-10 " />
        <div className="bg-transparent backdrop-blur-sm relative w-full md:w-1/2 hidden md:block">
          
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <Image 
          src="/Tee.png" 
          alt="Website logo" 
          height={800} 
          width={800} 
          objectFit="contain" 
          className=""
        />
      </div>
        </div>
        <div className="bg-transparent backdrop-blur-3xl w-full md:w-1/2 flex flex-col justify-center items-center p-8">
          <h2 className="text-3xl mb-6">{isLogin ? "Login" : "Sign Up"}</h2>
          <form className="space-y-4 w-full" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="flex flex-col">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="border rounded-md px-3 py-2"
                />
              </div>
            )}
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-md px-3 py-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="border rounded-md px-3 py-2"
              />
            </div>
            <Button type="submit" title={isLogin ? "Login" : "Sign Up"} variant="btn_dark" icon="" />
          </form>
          <p className="mt-4 cursor-pointer text-blue-500 hover:underline" onClick={handleToggleForm}>
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Login"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;