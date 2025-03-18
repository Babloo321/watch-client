export const toggleVideoLikeApi = async (AxiosPrivate,videoId) => {
  try {
    const response = await AxiosPrivate.patch(`/likes/toggle-like/${videoId}`);
    return response.data;
  } catch (err) {
    return err;
  }
}

export const videoLikeApi = async (AxiosPrivate, videoId) => {
  try {
    const response = await AxiosPrivate.get(`/likes/total-like/${videoId}`);
    return response.data
  } catch (error) {
    return error.message
  }
}

export const fetchVideoLikeState = async(AxiosPrivate, videoId) =>{
  try {
    const response = await AxiosPrivate.get(`/likes/video-like-state/${videoId}`);
    return response.data
  } catch (error) {
    return error.message
  }
}