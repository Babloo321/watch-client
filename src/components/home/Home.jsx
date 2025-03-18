import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaArrowRight } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import { useSelector,useDispatch } from "react-redux";
import { getHoverState,setCloseImage,getImageState } from "../../redux/cssChangedOn.slice";
import { homeVideoApiWithoutToken } from '../../api/videoApi.js';
import { useNavigate } from "react-router-dom";
import useAuth from '../../hooks/useAuth.js';
import { toast } from "react-toastify";
const Home = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  let hoverState = useSelector(getHoverState);
  const imageState = useSelector(getImageState)
  const dispatch = useDispatch();
  const adImage = "https://images.pexels.com/photos/6001796/pexels-photo-6001796.jpeg?auto=compress&cs=tinysrgb&w=600"; // Replace with ad image URL
  const adUrl = "https://example.com"; // Target URL for ad
  const [videoList,setVideoList] = useState([]);
  async function fetchingHomeVideos(){
    const res = await homeVideoApiWithoutToken();
    setVideoList(res.data);
  }
  useEffect(() =>{
    fetchingHomeVideos();
  },[])


  useEffect(() =>{
    dispatch(setCloseImage(false))
  },[])
  // Video Slider Settings
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000, // 5 seconds
    arrows: false,
  };

  const handleClickOnVideo = (video,e) =>{
    e.stopPropagation();
    if(token){
      return navigate("/video-player", { state: { video } });
    }
    toast.error(`You are not authorized...
      goto login/signup page to login first`)
    return navigate('/authenticate-login');
  }

  return (
    <div 
    className={`w-full mb-[150px] md:mb-0 px-0 flex flex-col gap-4 ${hoverState ? "md:pl-48 md:duration-300 md:ease-in-out" : "md:pl-24 md:duration-300 md:ease-in-out"}`}
    >
      {/* Advertisement Section */}
     {
      !imageState &&  <div className="relative w-full ">
        <img src={adImage} alt="Advertisement" className="w-full h-48 object-cover" />
        <div className="absolute bottom-4 left-4 text-white">
          <h2 className="text-xl font-bold">Special Offer!</h2>
          <p className="text-sm">Get 50% off on premium content. Limited time only.</p>
        </div>
        <a
          href={adUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Visit Now
        </a>
        <IoCloseCircleSharp 
        onClick={()=>dispatch(setCloseImage(true))}
        className="absolute top-4 right-4  text-white text-[36px] cursor-pointer rounded-[50%]  transition"/>
      </div>
     }

      {/* Video Slider */}
      <div className={`relative w-full`}>
        <Slider {...sliderSettings} className="w-full">
          {videoList.map((video) => (
            <div 
            onClick={(e)=>handleClickOnVideo(video,e)}
            key={video._id} className="w-full relative cursor-pointer">
              <video 
              src={video.videoFile}
              poster={video.thumbnail}
              controls
              autoplay="true"
              muted
              className={`w-full h-64 md:h-[480px] object-cover rounded-lg ${imageState ? "md:h-[620px]" : ""}`} 
              />
              <div className="absolute bottom-24 left-4 flex flex-col gap-1 text-2xl text-white">
                <p>{video.title}</p>
                <p>{video.description}</p>
              </div>
              {/* Small Video Cards in Bottom-Right */}
              <div className="absolute bottom-4 right-4 flex space-x-2 bg-black bg-opacity-50 p-2 rounded-lg">
                {videoList.slice(0, 3).map((smallVideo) => (
                  <video 
                  key={smallVideo._id} 
                  src={smallVideo.videoFile}
                  poster={smallVideo.thumbnail}
                  className="w-16 h-12 object-cover rounded-md"
                  />
                   
                ))}
                {/* <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition">
                  Next
                </button> */}
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Horizontal Scrolling Videos */}
      <div className="relative overflow-hidden w-full">
        <div className="flex flex-wrap justify-center items-center gap-2 overflow-x-hidden scrollbar-hide p-2" style={{ scrollSnapType: "x mandatory" }}>
          {videoList.map((video) => (
            <div key={video._id} 
            onClick={(e)=>handleClickOnVideo(video,e)}
            className="w-[200px] h-30 sm:w-[40%] sm:h-48  mx-auto md:w-64 md:h-40 flex-shrink-0 cursor-pointer"
            >
              <video 
              src={video.videoFile}
              poster={video.thumbnail}
              controls
              muted
              className="w-full h-full object-cover rounded-lg"
              />
             
            </div>
          ))}
        </div>
        {/* <button className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center">
          View All <FaArrowRight className="ml-2" />
        </button> */}
      </div>

    </div>
  );
};

export default Home;
