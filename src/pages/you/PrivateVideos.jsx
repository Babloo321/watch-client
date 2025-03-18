import React, { useState, useEffect, useRef } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { privateVideoApi } from "../../api/videoApi.js";
import { useNavigate } from "react-router-dom";

const PrivateVideos = () => {
  const navigate = useNavigate();
  const videoRefs = useRef([]);
  const [videos, setVideos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const AxiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await privateVideoApi(AxiosPrivate);
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

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
    navigate("/video/main", { state: { video } });
  };

  return (
    <div className="relative flex items-center w-full overflow-hidden py-4">
      {startIndex > 0 && (
        <button className="absolute left-0 z-10 p-2 bg-gray-800 text-white rounded-full shadow-md" onClick={handlePrev}>
          <FaChevronLeft size={24} />
        </button>
      )}
      <div className="flex w-full gap-4 overflow-hidden px-10">
        {videos.length > 0 ? (
          videos.slice(startIndex, startIndex + 5).map((video, index) => (
            <div key={video._id} className="w-1/5 flex flex-col bg-white shadow-md rounded-lg overflow-hidden">
              <div className="relative w-full h-40 bg-gray-200">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={video.videoFile}
                  controls
                  className="w-full h-full object-cover"
                  onPlay={() => handlePlay(index)}
                />
              </div>
              <div className="p-3 cursor-pointer" onClick={() => handleClickOnVideo(video)}>
                <h3 className="text-lg font-semibold">{video.title}</h3>
                <p className="text-sm text-gray-600">{video.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center w-full text-gray-600">No Videos Available</p>
        )}
      </div>
      {videos && startIndex + 1 < videos.length && (
        <button className="absolute right-0 z-10 p-2 bg-gray-800 text-white rounded-full shadow-md" onClick={handleNext}>
          <FaChevronRight size={24} />
        </button>
      )}
    </div>
  );
};

export default PrivateVideos;
