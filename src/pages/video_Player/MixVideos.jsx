import React from 'react'
import { useNavigate } from 'react-router-dom'
function MixVideos({videos}) {
  const navigate = useNavigate();
  const handleVideoClick = async(video) =>{
    navigate("/video-player",{state:{video}})
  }
  return (
    <div className='w-full bg-gray-900 h-screen flex flex-col gap-2 px-2 cursor-pointer'>
    
    <div className='border-[1px] border-white py-2'>
    <div className='flex flex-col gap-2 text-white shadow-sm shadow-gray-400 p-2'>
    <p className={``}>Watch Mix</p>
    <p>Mixes are playlists Watch makes for you</p>      
    </div>
    <div className="flex flex-col gap-2 h-[300px] p-3 rounded-lg overflow-y-auto">
  {videos.map((videoItem) => (
    <div
    onClick={()=>handleVideoClick(videoItem)}
    key={videoItem._id} 
    className="flex items-center gap-3 p-2 border-b border-gray-700 last:border-b-0">
      <video
        src={videoItem.videoFile}
        poster={videoItem.thumbnail}
        className="w-32 h-20 rounded-lg object-cover"
      />
      <p className="text-sm text-white leading-tight">
        {videoItem.title} - {videoItem.description}
      </p>
    </div>
  ))}
</div>
    </div>

    <div>
      something new
    </div>
</div>
  )
}

export default MixVideos