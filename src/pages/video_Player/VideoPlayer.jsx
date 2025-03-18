import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';
import { getUserByVideoId } from '../../api/userApi';
import { videoLikeApi, toggleVideoLikeApi, fetchVideoLikeState } from '../../api/likeApi';
import { toggleSubscriptionApi, getSubscriberDataApi } from '../../api/subscriptionApi';
import { allVideosApi } from '../../api/videoApi';
import { createCommentApi, getVideoCommentWithUserDetailsApi } from '../../api/commentApi';
import Video from './Video';
import VideoInfo from './VideoInfo';
import CommentSection from './CommentSection';
import MixVideos from './MixVideos';
import { getHoverState } from '../../redux/cssChangedOn.slice';
import { useSelector } from 'react-redux';
const VideoPlayer = () => {
  let hoverState = useSelector(getHoverState);
  const { user } = useAuth();
  const location = useLocation();
  const AxiosPrivate = useAxiosPrivate();
  const video = location.state?.video;

  const [channelDetails, setChannelDetails] = useState({});
  const [mixVideo, setMixVideo] = useState([]);
  const [likeState, setLikeState] = useState(false);
  const [like, setLike] = useState(0);
  const [subscribe, setSubscribe] = useState(false);
  const [totalSubscribers, setTotalSubscribers] = useState(0);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    if (!video) return;

    const fetchVideoDetails = async () => {
      try {
        const [channelRes, mixRes, likeRes, commentRes, likeStateRes] = await Promise.all([
          getUserByVideoId(AxiosPrivate, video._id),
          allVideosApi(AxiosPrivate),
          videoLikeApi(AxiosPrivate, video._id),
          getVideoCommentWithUserDetailsApi(AxiosPrivate, video._id),
          fetchVideoLikeState(AxiosPrivate, video._id),
        ]);
        
        setChannelDetails({
          userName: channelRes.userName,
          coverImage: channelRes.coverImage,
          _id: channelRes._id,
        });
        setMixVideo(mixRes.data);
        setLike(likeRes.data.totalLikes);
        setComments(commentRes.data);
        setLikeState(likeStateRes.data);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };
    
    fetchVideoDetails();
  }, [video?._id]);

  useEffect(() => {
    if (!channelDetails._id) return;
    
    const fetchSubscribers = async () => {
      try {
        const response = await getSubscriberDataApi(AxiosPrivate, channelDetails._id);
        setTotalSubscribers(response.totalSubscribers);
      } catch (error) {
        console.error('Error fetching subscriber data:', error);
      }
    };
    
    fetchSubscribers();
  }, [channelDetails._id]);


  const handleLike = async () => {
    try {
      const response = await toggleVideoLikeApi(AxiosPrivate, video._id);
      setLikeState(response.data.action === 'like');
    } catch (error) {
      console.error('Error liking video:', error);
    }
  };

  const handleSubscription = async (sub) => {
    try {
      await toggleSubscriptionApi(AxiosPrivate, channelDetails);
      setSubscribe(sub);
    } catch (error) {
      console.error('Error subscribing to channel:', error);
    }
  };

  const handleCommentSend = async (comment) => {
    try {
      await createCommentApi(AxiosPrivate, video._id, comment);
      setComments((prev) => [...prev, { user, text: comment }]);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  if (!video) return <p className="text-center text-gray-500">No video data available</p>;

  return (
    <div 
    className={`w-full mb-[150px] md:mb-0 px-0 flex flex-col md:flex-row gap-1 ${hoverState ? "md:pl-48 md:duration-300 md:ease-in-out" : "md:pl-24 md:duration-300 md:ease-in-out"}`}
    // className="flex flex-col md:flex-row gap-1 p-2 bg-gray-700"
    >
    
      <div className="flex flex-col gap-[1px] w-full md:w-[60%]">
        <Video video={video} />
        <VideoInfo
          video={video}
          channelDetails={channelDetails}
          likeState={likeState}
          likes={like}
          onLike={handleLike}
          subscribe={subscribe}
          totalSubscribers={totalSubscribers}
          onSubscribe={handleSubscription}
        />
        <CommentSection user={user} comments={comments} onCommentSend={handleCommentSend} />
      </div>

      <div className='w-full md:w-[40%]'>
      <MixVideos videos={mixVideo} />
      </div>
    </div>
  );
};

export default VideoPlayer;
