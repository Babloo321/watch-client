import React, { useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate.js';
import { getUserByVideoId } from '../api/userApi';

function ChannelDetails({ videoId }) {
  const AxiosPrivate = useAxiosPrivate();
  const [data, setData] = useState({ userName: '', coverImage: '' });

  useEffect(() => {
    const fetchChannelDetails = async () => {
      const response = await getUserByVideoId(AxiosPrivate, videoId);
      setData({ userName: response.userName, coverImage: response.coverImage });
    };
    fetchChannelDetails();
  }, [videoId]);

  return (
    <div className="flex items-center gap-2 mt-2">
      <img 
        src={data.coverImage} 
        alt="logo" 
        className="w-10 h-10 rounded-full object-cover border-[2px] border-white" 
      />
      <p className="text-sm font-semibold  text-black">{data.userName}</p>
    </div>
  );
}

export default ChannelDetails;
