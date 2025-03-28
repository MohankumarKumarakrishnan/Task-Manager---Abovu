import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsloggedIn }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess(null);
    if (!formData.email || !formData.password) {
      setError("All fields are required!");
      return;
    }
    setError(null);
    console.log(formData.email, formData.password);
    const sendUser = await fetch("http://localhost:5500/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ formData }),
    });
    const parseResp = await sendUser.json();
    if (parseResp.error) {
      setSuccess(null);
      setError(parseResp.error);
    }
    if (parseResp.message) {
      setError(null);
      setSuccess(parseResp.message);
      localStorage.setItem("jwtToken", parseResp.jwtToken);
      setIsloggedIn(true);
      setTimeout(() => {
        setSuccess(null);
        navigate("/");
      }, 2000);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-blue-600">Login</h2>
        {success && (
          <p className="text-green-500 text-center mt-2">{success}</p>
        )}
        {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        <form onSubmit={handleSubmit} className="mt-4">
          <input
            type="email"
            name="email"
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
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
