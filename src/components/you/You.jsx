import React, { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import EditProfile from '../../pages/you/EditProfile.jsx';
import ChangePassword from '../../pages/you/ChangePassword.jsx';
import ChannelVideos from '../../pages/you/ChannelVideos.jsx';
import PublicVideos from '../../pages/you/PublicVideos.jsx';
import PrivateVideos from '../../pages/you/PrivateVideos.jsx';
import useAuth from '../../hooks/useAuth.js';
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js';
import usePopupToggle from '../../hooks/usePopUpToggle.js';
import { getHoverState } from '../../redux/cssChangedOn.slice.js';
import { useSelector } from 'react-redux';
function You() {
  let hoverState = useSelector(getHoverState);
  const { setPopupFalse } = usePopupToggle();
  const { token } = useAuth();
  const AxiosPrivate = useAxiosPrivate();
  const [activeTab, setActiveTab] = useState('public');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    try {
      if (!token) return;
      const response = await AxiosPrivate.get('/users/current-user');
      setUser(response.data.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [token]);

  useEffect(() => {
    setPopupFalse();
    setShowChangePassword(false);
    setShowEditProfile(false);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'public':
        return <PublicVideos />;
      case 'private':
        return <PrivateVideos />;
      case 'channel':
        return <ChannelVideos />;
      default:
        return null;
    }
  };

  const handleProfileEditClick = () => {
    setShowEditProfile(true);
    setShowChangePassword(false);
  };

  const handleChangePasswordClick = () => {
    setShowChangePassword(true);
    setShowEditProfile(false);
  };

  return (
    <div
      className={`
    w-full mb-[150px] md:mb-0 px-0 flex flex-col gap-4 bg-gray-900
    ${
      hoverState
        ? 'md:pl-48 md:duration-300 md:ease-in-out'
        : 'md:pl-24 md:duration-300 md:ease-in-out'
    }
    `}
    >
      <div
        className={`relative w-full h-screen bg-cover bg-center rounded-lg shadow-md flex flex-col-reverse justify-center items-center
      md:flex md:flex-row-reverse md:justify-between md:items-start md:h-96
      `}
        style={{ backgroundImage: `url(${user?.coverImage})` }}
      >
        <div className="flex gap-4 px-12 md:pt-2">
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              onClick={handleProfileEditClick}
            >
              Edit Profile
            </button>
            {showEditProfile && <EditProfile />}
          </div>
          <div>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={handleChangePasswordClick}
            >
              Change Password
            </button>
            {showChangePassword && <ChangePassword />}
          </div>
        </div>
        <div className="md:translate-x-[-48px] md:my-0 lg:translate-x-[-100px] xl:translate-x-[-150px] md:flex md:flex-col text-white py-[12px] rounded-lg shadow-lg flex flex-col items-center w-1/2">
          <div>
            <img
              src={user?.avatar}
              alt="User"
              className="w-48 h-48 rounded-3xl md:w-24 md:h-24 md:rounded-full md:border-4 border-white shadow-md"
            />
            <div>
              <h2 className="text-xl font-semibold mt-2">
                UserName: {user?.userName}
              </h2>
              <p className="text-white">FullName: {user?.fullName}</p>
              <p className="text-white">Email: {user?.email}</p>
            </div>
          </div>
          <div className="flex gap-6 mt-4">
            <span className="font-semibold">Followers: 120</span>
            <span className="font-semibold">Following: 80</span>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="bg-gray-900 p-4 rounded-lg shadow-md h-screen md:h-96">
        <div className="flex gap-4 border-b pb-2">
          {['public', 'private', 'channel'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 text-gray-600 rounded-md transition-all ${
                activeTab === tab
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-gray-200'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        {renderContent()}
      </div>

      {/* Video Playlists & Likes Section */}
      <div className="bg-white p-4 rounded-lg shadow-md mt-4">
        <h3 className="text-lg font-semibold mb-2">Playlists</h3>
        <div className="grid grid-cols-2 gap-4">All Playlists Here</div>

        <h3 className="text-lg font-semibold mt-4 mb-2">Liked Videos</h3>
        <div className="grid grid-cols-2 gap-4">All Liked Videos Here</div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default You;
