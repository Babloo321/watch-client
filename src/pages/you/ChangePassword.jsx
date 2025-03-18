import React, { useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { toast } from 'react-toastify';
function ChangePassword() {
  const AxiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const token = useAuth();
  const [password, setPassword] = useState({
    oldPassword: '',
    newPassword: '',
  });
  const [msg, setMsg] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword((prevPassword) => ({
      ...prevPassword,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!token) {
        toast.error("Invalid Access Token");
        return;
      }
      const formDataToSend = new FormData();
      formDataToSend.append('oldPassword', password.oldPassword);
      formDataToSend.append('newPassword', password.newPassword);
      const response = await AxiosPrivate.post('/users/change-password', formDataToSend);
      const { success } = response.data;
      if (success) {
        toast.success("Password is updaing...");
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      setPassword({
        oldPassword: '',
        newPassword: '',
      });
      return;
    } catch (error) {
      // setMsg("Something went wrong, try again");
      toast.error("Something went wrong")
      setTimeout(() => {
        navigate('/you');
      }, 3000);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-md rounded-lg translate-y-[-50px] sm:translate-x-[126px] translate-x-[40px] md:translate-y-1 md:translate-x-0">
      {msg && (
        <div className="mb-4 p-3 text-white bg-red-500 rounded-md text-center">
          <p>{msg}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="oldPassword" className="font-medium">Old Password:</label>
        <input
          type="password"
          name="oldPassword"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label htmlFor="newPassword" className="font-medium">New Password:</label>
        <input
          type="password"
          name="newPassword"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="submit"
          value="Change Password"
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 cursor-pointer"
        />
      </form>
    </div>
  );
}

export default ChangePassword;
