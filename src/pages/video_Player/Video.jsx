import React from 'react'

function Video({ video }) {
  return (
    <video
    src={video.videoFile}
    controls
    className={`w-full h-96`}
    poster={video.thumbnail}
    autoPlay
  />
  )
}

export default Video