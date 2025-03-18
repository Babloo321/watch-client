import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { channelPrivateVideoApi, channelPublicVideoApi } from '../../api/videoApi.js';
import { getHoverState } from '../../redux/cssChangedOn.slice.js'
import { useSelector } from 'react-redux';
function SubscriptionsDetails() {
  let hoverState = useSelector(getHoverState);
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;
  const AxiosPrivate = useAxiosPrivate();
  const [publicVideos, setPublicVideos] = useState([]);
  const [privateVideos, setPrivateVideos] = useState([]);

  useEffect(() => {
    if (!user?._id) return;

    const fetchChannelPublicVideo = async () => {
      try {
        const response = await channelPublicVideoApi(AxiosPrivate, user._id);
        setPublicVideos(response.data);
      } catch (error) {
        console.error("Error fetching public videos:", error);
      }
    };

    const fetchChannelPrivateVideo = async () => {
      try {
        const response = await channelPrivateVideoApi(AxiosPrivate, user._id);
        setPrivateVideos(response.data);
      } catch (error) {
        console.error("Error fetching private videos:", error);
      }
    };
    fetchChannelPublicVideo();
    fetchChannelPrivateVideo();
  }, [AxiosPrivate, user?._id]);

  const handleVideoClick = (video) => {
    navigate("/video-player", { state: { video } });
  };

  return (
    <div 
    className={`bg-gray-900 w-full mb-[150px] md:mb-0 px-0 flex flex-col gap-4 ${hoverState ? "md:pl-48 md:duration-300 md:ease-in-out" : "md:pl-24 md:duration-300 md:ease-in-out"}`}
    // className="w-full flex flex-col items-center p-4"
    >
      {/* Poster Section */}
      <div
        className="w-full h-60 bg-cover bg-center flex flex-col items-center justify-center relative"
        style={{ backgroundImage: `url(${user?.coverImage})` }}
      >
        <img src={user?.avatar} alt="Avatar" className="w-24 h-24 rounded-full border-4 border-white shadow-md" />
        <p className="mt-2 text-lg font-semibold text-white">{user.fullName}</p>
      </div>

      {/* Channel Info */}
      {/* <div className="flex items-center space-x-4 bg-white shadow-md p-4 w-full max-w-3xl mt-4 rounded-lg">
        <img src={user?.avatar} alt="Avatar" className="w-16 h-16 rounded-full" />
        <div className="flex-1">
          <h2 className="text-xl font-bold">{user?.userName}</h2>
          <p className="text-gray-500">{user?.fullName}</p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Subscribed</button>
      </div> */}

      {/* Videos Section */}
      <div className="w-full max-w-5xl mt-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-3 text-white">Public Videos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {publicVideos.map((video) => (
              <div 
                key={video._id} 
                className="cursor-pointer shadow-lg rounded-lg overflow-hidden bg-white p-2" 
                onClick={() => handleVideoClick(video)}
              >
                <video src={video.videoFile} poster={video.thumbnail} className="w-full h-40 object-cover rounded-md" muted />
                <p className="mt-2 text-center font-semibold">{video.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-3 text-white">Private Videos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {privateVideos.map((video) => (
              <div 
                key={video._id} 
                className="cursor-pointer shadow-lg rounded-lg overflow-hidden bg-white p-2" 
                onClick={() => handleVideoClick(video._id)}
              >
                <video src={video.videoFile} poster={video.thumbnail} className="w-full h-40 object-cover rounded-md" muted />
                <p className="mt-2 text-center font-semibold">{video.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionsDetails;