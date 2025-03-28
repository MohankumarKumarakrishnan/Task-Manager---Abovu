import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({ userEmail: "", password: "" , userName: ""});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null); 
  const navigate = useNavigate()
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    if (!formData.userEmail || !formData.password || !formData.userName) {
      setError("All fields are required!");
      return;
    }
    setError(null);
    const sendUser = await fetch('https://task-manager-backend-abouv.onrender.com:5500/auth/newuser', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formData }),
      });
    const parseResp = await sendUser.json();
    if(parseResp.error){
      setSuccess(null); 
      setError(parseResp.error)
   }
   if(parseResp.message){
    setError(null);
    setSuccess(parseResp.message)
    setTimeout(()=>{
     setSuccess(null)
     navigate('/login')
    },2000)
  }
     };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600">Signup</h2>
        {success && <p className="text-green-500 text-center mt-2">{success}</p>}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
        <input
            type="text"
            name="userName"
            placeholder="Username"
            value={formData.userName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />

          <input
            type="email"
            name="userEmail"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Signup
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
