import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

function EditProfile() {
  const AxiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [data, setData] = useState({ email: '', fullName: '' });
  const { token } = useAuth();

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        toast.error("Invalid Access Token...");
        return;
      }
      const formDataToSend = new FormData();
      formDataToSend.append('email', data.email);
      formDataToSend.append('fullName', data.fullName);
      const response = await AxiosPrivate.patch('/users/update-account', formDataToSend);
      const { success } = response?.data;
      if (success) {
        toast.success("Details are updating...");
        setTimeout(() => {
          navigate("/")
        }, 3000);
      }
      setData({
        email: '',
        fullName: '',
      });
      return;
    } catch (error) {
      toast.error("Something went wrong with updation")
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-lg translate-y-[-50px] sm:translate-x-[-56px] translate-x-[-50px] md:translate-y-1 md:translate-x-0">

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="fullName" className="font-medium">New Full Name</label>
        <input
          type="text"
          value={data.fullName}
          name="fullName"
          onChange={onChange}
          placeholder="Enter full name"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="email" className="font-medium">New Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={onChange}
          required
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="submit"
          value="Update Details"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
        />
      </form>
    </div>
  );
}

export default EditProfile;
