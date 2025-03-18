import { useState } from "react";
import {  useSelector } from "react-redux";
import { getHoverState } from "../../redux/cssChangedOn.slice";
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth.js';

import API from '../../api/apiInstance.js';
import { toast } from 'react-toastify';
const Login = () => {
  const hoverState = useSelector(getHoverState);
  const navigate = useNavigate();

  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = formData;
    const formDataToSend = {
      email,
      password,
    };
    if (!formDataToSend) {
      toast.error('Email and password are required');
      setLoading(false);
      return;
    }

    try {
      const response = await API.post('/users/login', formDataToSend, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      const { success,message } = response?.data;
      if (success) {
        const { user, accessToken, refreshToken } = response.data?.data;
       
        if (user && accessToken) {
          const logingData = {
            user:user,
            accessToken:accessToken,
            refreshToken:refreshToken
          }
          login(logingData);
        }
        // handleSuccess(message);
        toast.success(message);
        setTimeout(() => {
          navigate('/');
        }, 3000);
      }
    } catch (err) {
      if (!err.response) {
        toast.error('No Server Respond');
      } else if (err.response.status === 401) {
        toast.error('User not found.');
        setTimeout(() => {
          navigate('/authenticate-signup')
        }, 1500);
      } else if (err.response.status === 400) {
        toast.info('Missing UserName or Password.');
      } else {
        toast.error('Login Failed.');
      }
    } finally {
      setLoading(false);
    }
  };
const imgUrl = "https://media.istockphoto.com/id/1522058576/photo/cheerful-little-friends-watching-comedy-movie-in-theatre.jpg?b=1&s=612x612&w=0&k=20&c=L3_BOMUm3EhpiguOX4-huDurXpmIiuxUYqRJCVYw25U="
  return (
    <div
     className={`
     h-[calc(100vh-96px)] w-full 
     md:mb-0 md:h-screen bg-gray-900 text-white flex flex-col 
     ${hoverState ? "md:pl-48 md:duration-300 md:ease-in-out" : "md:pl-24 md:duration-300 md:ease-in-out"} flex items-center justify-center`}
     style={{
      backgroundImage: `url(${imgUrl})`,
      backgroundSize: "cover", // Ensures the image covers the div
      backgroundPosition: "center", // Centers the image
      backgroundRepeat: "no-repeat", // Prevents repetition
    }}
    >
      <h2 className="text-xl text-white font-semibold text-center mb-4">
        Login
      </h2>
      <form onSubmit={handleSubmit} 
      className="flex flex-col gap-2 p-1 md:gap-4 md:p-4 border-t-[1px] hover:border-t-blue-500 border-t-pink-500 shadow-pink-500/50  hover:shadow-blue-500/50 shadow-xl hover:shadow-xl transition hover:cursor-pointer cursor-default"
      >
      <div>
      <label className="block font-medium" htmlFor="email">Email:</label>
      
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          value={formData.email}
          onChange={handleChange}
          required
        />
        </div>
        <div>
        <label className="block font-medium" htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          value={formData.password}
          onChange={handleChange}
          required
        />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          disabled={loading}
        >
        {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>


      <p className="mt-4 text-sm text-center">
       Don't have an account?&nbsp;
       <span 
       className="text-blue-500 hover:underline cursor-pointer"
       onClick={()=>navigate("/authenticate-signup")}>
       Signup</span>
      </p>

    </div>
  );
};

export default Login;
