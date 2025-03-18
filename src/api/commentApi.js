
export const createCommentApi = async (AxiosPrivate, videoId,content) => {
  try {
    const response = await AxiosPrivate.post(`/comments/create-comment/${videoId}`,{
      content
    });
    return response.data.success;
  } catch (error) {
    return error.message;
  }
};

export const getVideoCommentWithUserDetailsApi = async(AxiosPrivate,videoId) =>{
  try {
    const response = await AxiosPrivate.get(`/comments/video-comment/${videoId}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
}