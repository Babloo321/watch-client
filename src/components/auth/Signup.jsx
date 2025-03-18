import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signupApi } from '../../api/authapi.js';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { getHoverState } from '../../redux/cssChangedOn.slice.js';
const Signup = () => {
  const hoverState = useSelector(getHoverState);
  const [formData, setFormData] = useState({
    userName: "",
    fullName: "",
    email: "",
    password: "",
    avatar: null,
    coverImage: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("userName", formData.userName);
      formDataToSend.append("fullName", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("password", formData.password);

      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar);
      } else {
        toast.error("Please select an avatar");
        return;
      }
      if (formData.coverImage) {
        formDataToSend.append("coverImage", formData.coverImage);
      }else{
        toast.error("Please select a cover image")
      }
      
      console.log("FormData: ", formData);
      
      const response = await signupApi(formData);
      if(response.error === 409){
        console.log("User with this email is already exist!: ",response);
        toast.info("User with this email is already exist");
        navigate("/authenticate-signup");
        return
      }
      console.log("Response: ",response.data);
      if(response.statuseCode === 200){
        console.log(response.message);
        toast.success(response.message);
        navigate("/authenticate-login");
      }else{
        toast.error("Something wend wrong with server");
      }
      setFormData({
        userName: "",
        fullName: "",
        email: "",
        password: "",
        avatar: null,
        coverImage: null,
      });
    } catch (err) {
      toast.error(err.response?.message || "Something went wrong.");
    }
  };
const imgUrl = "https://media.istockphoto.com/id/1522058576/photo/cheerful-little-friends-watching-comedy-movie-in-theatre.jpg?b=1&s=612x612&w=0&k=20&c=L3_BOMUm3EhpiguOX4-huDurXpmIiuxUYqRJCVYw25U="
  return (
    <div 
    className={`
    h-[calc(100vh-96px)] w-full md:mb-0 md:h-screen bg-gray-900 text-white flex flex-col 
    ${hoverState ? "md:pl-48 md:duration-300 md:ease-in-out" : "md:pl-24 md:duration-300 md:ease-in-out"} flex items-center justify-center`}
    style={{
      backgroundImage: `url(${imgUrl})`,
      backgroundSize: "cover", // Ensures the image covers the div
      backgroundPosition: "center", // Centers the image
      backgroundRepeat: "no-repeat", // Prevents repetition
    }}
    
    >
      <h2 className="text-xl font-semibold text-center mb-0 md:mb-4">
        Signup
      </h2>
        <form onSubmit={handleSubmit} 
        className="flex flex-col gap-2 p-1 md:gap-4 md:p-4 hover:border-t-[1px] hover:border-t-blue-500 border-t-pink-500 shadow-pink-500/50  hover:shadow-blue-500/50 shadow-xl hover:shadow-xl transition hover:cursor-pointer cursor-default"
        >
          <div>
            <label className="block font-medium" htmlFor="userName">Username:</label>
            <input type="text" name="userName" id="userName" value={formData.userName} onChange={handleChange} required className="w-full px-3 py-2 border rounded text-black" />
          </div>
          <div>
            <label className="block font-medium" htmlFor="fullName">Full Name:</label>
            <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleChange} required className="w-full px-3 py-2 border rounded text-black" />
          </div>
          <div>
            <label className="block font-medium" htmlFor="email">Email:</label>
            <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full px-3 py-2 border rounded text-black" />
          </div>
          <div>
            <label className="block font-medium" htmlFor="password">Password:</label>
            <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} required className="w-full px-3 py-2 border rounded text-black" />
          </div>
          <div>
            <label className="block font-medium" htmlFor="avatar">Avatar:</label>
            <input type="file" name="avatar" id="avatar" accept="image/*" onChange={handleChange} required className="w-full cursor-pointer bg-white text-black" />
          </div>
          <div>
            <label className="block font-medium" htmlFor="coverImage">Cover Image:</label>
            <input type="file" name="coverImage" id="coverImage" accept="image/*" onChange={handleChange} className="w-full cursor-pointer bg-white text-black" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">Sign Up</button>
          <p className="text-center">
            Already have an account? <Link to="/authenticate-login" className="text-blue-600 hover:underline">Login</Link>
          </p>
        </form>
      
    </div>
  );
};

export default Signup;





// className={`h-[calc(100vh-96px)] w-full mb-[150px] md:mb-0 md:h-screen px-24 bg-gray-900 text-white ${hoverState ? "md:pl-48 md:duration-300 md:ease-in-out" : "md:pl-24 md:duration-300 md:ease-in-out"}`}