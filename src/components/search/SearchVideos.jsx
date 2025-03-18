import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { querySearchResult } from "../../api/videoApi.js";
import ChannelDetails from '../../utils/ChannelDetails.jsx';

function SearchVideo({ query }) {
  const navigate = useNavigate();
  const AxiosPrivate = useAxiosPrivate();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      if (!query) return; // ✅ Prevents unnecessary API calls
      try {
        const result = await querySearchResult(AxiosPrivate, query);
        setVideos(result);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, [query]); // ✅ Now updates when `query` changes

  return (
    <div className="w-[70%] mx-auto p-4">
      {videos.length > 0 ? (
        <div className="flex flex-col gap-6">
          {videos.map((video) => (
            <div 
              key={video._id} 
              className="cursor-pointer rounded-lg shadow-md overflow-hidden bg-purple-900 hover:shadow-lg transition h-[150px] flex justify-start items-center"
              onClick={() => navigate('/video-player', { state: { video } })}
            >
              <div className="relative group w-[40%]">
                <video 
                  src={video.videoFile} 
                  poster={video.thumbnail} 
                  className="w-full h-40 object-cover rounded-t-lg "
                  autoPlay={false} // Prevents autoplay issues
                  muted
                ></video>
              </div>
              <div className="p-3">
                <p className="text-lg font-semibold truncate text-orange-600">{video.title}</p>
                <p className="text-sm truncate text-white">{video.description}</p>
                <p className=" text-sm mt-1 text-yellow-500">{video.views} Views</p>
                <ChannelDetails videoId={video._id} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">No videos found</p>
      )}
    </div>
  );
}

export default SearchVideo;
