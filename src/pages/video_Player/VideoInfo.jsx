import React from 'react';
import { BiSolidLike } from 'react-icons/bi';
function VideoInfo({
  video,
  channelDetails,
  likeState,
  likes,
  totalSubscriber,
  onLike,
  onSubscribe,
  subscribe,
}){
  return (
    <div className="w-full h-35 flex flex-col gap-2 bg-gray-900 p-3">
    <div className='shadow-sm shadow-gray-500 p-2 my-2'>
      <h1 className="text-justify text-xl text-white font-semibold">
        {video.title + ' ' + video.description}
      </h1>
      </div>
      <div className="flex flex-row justify-between gap-2">
        <img
          src={channelDetails.coverImage}
          alt="avatar"
          className="w-12 h-12 rounded-full border-[2px] border-dotted border-yellow-300"
        />
        <div className="flex flex-col text-pink-900 text-[18px] font-bold">
          <p className="text-pink-900 text-[18px] font-bold">
            Channel: {channelDetails.userName}
          </p>
          <p>Subscribers: {totalSubscriber?totalSubscriber:0}</p>
          <p>Likes: {likes ? likes : 0}</p>
        </div>
        {subscribe ? (
          <p
            className="text-white bg-red-500 h-8 p-1 rounded-lg cursor-pointer font-bold"
            onClick={()=>onSubscribe(false)}
          >
            Subscribed
          </p>
        ) : (
          <p
            className="text-black bg-white h-8 p-1 rounded-lg cursor-pointer font-bold"
            onClick={()=>onSubscribe(true)}
          >
            Subscribe
          </p>
        )}
        <BiSolidLike
          className={`${
            likeState ? 'text-red-600' : 'text-gray-400'
          } text-[40px] cursor-pointer`}
          onClick={() => onLike(video._id)}
        />
      </div>
    </div>
  );
}

export default VideoInfo;
