import React, { useState, useEffect, useRef } from 'react';
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa';
import { publicVideoApi } from '../../api/videoApi.js';
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js';
import { useNavigate } from 'react-router-dom';
const PublicVideos = () => {
  const navigate = useNavigate();
  const videoRefs = useRef([]);
  const [videos, setVideos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const AxiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await publicVideoApi(AxiosPrivate);
        setVideos(response.data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };
    fetchVideos();
  }, [AxiosPrivate]);

  const handlePl = (index) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index]
        .play()
        .catch((error) => console.error('Play error:', error));
    }
  };
  const handlePause = (index) => {
    if (videoRefs.current[index]) {
      videoRefs.current[index].pause();
    }
  };
  const handlePlay = (index) => {
    videoRefs.current.forEach((video, idx) => {
      if (video && idx !== index) {
        video.pause();
      }
    });
  };

  const handleNext = () => {
    if (startIndex + 1 < videos.length) {
      setStartIndex(startIndex + 1);
    } else {
      setStartIndex(0);
    }
  };

  const handlePrev = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const handleClickOnVideo = (video) => {
    navigate('/video-player', { state: { video } });
  };

  return (
    <div className="relative flex items-center w-full overflow-hidden">
      {startIndex > 0 && (
        <button
          className="absolute left-0 z-10 p-2 bg-gray-900 text-white rounded-full shadow-md"
          onClick={handlePrev}
        >
          <FaChevronLeft size={24} />
        </button>
      )}
      <div className="flex w-full gap-4 p-4 overflow-x-hidden sm:grid sm:grid-cols-5 sm:gap-2">
        {videos.length > 0 ? (
          videos.slice(startIndex, startIndex + 5).map((video, index) => (
            <div
              key={video._id}
              className="flex flex-col items-center w-full sm:w-auto cursor-pointer shadow-md shadow-gray-700"
              onClick={() => handleClickOnVideo(video)}
            >
              <div className="relative sm:w-48 sm:h-32 md:w-[250px] md:h-[200px] overflow-hidden rounded-lg">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.videoFile}
                  onMouseEnter={() => handlePl(index)}
                  onMouseLeave={() => handlePause(index)}
                  className={`w-full h-full object-cover px-[10px]`}
                  onPlay={() => handlePlay(index)}
                />
              </div>
              <div
                className="w-full text-gray-500 p-2 cursor-pointe text-left flex flex-col"
                
              >
                <h3 className="text-lg font-semibold text-orange-500">{video.title}</h3>
                <p className="text-md ">{video.description}</p>
                <p className="text-md ">Likes: {video.views}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-full text-gray-500">
            No videos available
          </p>
        )}
      </div>
      {startIndex + 1 < videos.length && (
        <button
          className="absolute right-0 z-10 p-2 bg-gray-800 text-white rounded-full shadow-md"
          onClick={handleNext}
        >
          <FaChevronRight size={24} />
        </button>
      )}
    </div>
  );
};

export default PublicVideos;
