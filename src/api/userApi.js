export const getUserByVideoId = async (AxiosPrivate, videoId) => {
  try {
    const response = await AxiosPrivate.get(`/users/video-owner/${videoId}`);
    return response.data.data.videoId[0].owner;
  } catch (error) {
    return error.message;
  }
}

export const logoutApi = async(AxiosPrivate) =>{
  try {
    const response = await AxiosPrivate.post("/users/logout");
    return response;
  } catch (error) {
    return error
  }
}