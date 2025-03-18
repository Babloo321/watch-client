import API from '../api/apiInstance'
export const homeVideoApiWithoutToken = async() =>{
  try {
    const response = await API.get("/videos-without-token",{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data
  } catch (error) {
    return error.message
  }
}

export const createVideoApi = async(AxiosPrivate,formDataToSend) =>{
  try {
    const response = await AxiosPrivate.post('/videos', formDataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
    });
    return response.data;
  } catch (err) {
    return err;
  }
}

export const allVideosApi = async (AxiosPrivate) => {
  try {
    const response = await AxiosPrivate.get('/videos');
    return response.data;
  } catch (err) {
    return err;
  }
}

export const trendingVideosApi = async (AxiosPrivate) => {
  try {
    const response = await AxiosPrivate.get('/videos');
    return response.data;
  } catch (err) {
    return err;
  }
}

export const videosApi = async (AxiosPrivate) => {
  try {
    const response = await AxiosPrivate.get('/videos');
    return response.data;
  } catch (err) {
    return err;
  } 
}

export const publicVideoApi = async (AxiosPrivate) => {
  try {
    const response = await AxiosPrivate.get("/videos/public-videos");
    return response.data;
  } catch (err) {
    return err;
  }
};

export const privateVideoApi = async (AxiosPrivate) => {
  try {
    const response = await AxiosPrivate.get("/videos/private-videos");
    return response.data;
  } catch (err) {
    console.error("Error fetching public videos:", err);
    return err;
  }
};

export const incrementViewsApi = async(AxiosPrivate, videoId) =>{
  try {
    const response = await AxiosPrivate.patch(`/videos/increment-views/${videoId}`);
    return response.data
  } catch (error) {
    return error.message;
  }
}

export const decrementViewsApi = async(AxiosPrivate, videoId) =>{
  try {
    const response = await AxiosPrivate.patch(`/videos/decrement-views/${videoId}`);
    return response.data
  } catch (error) {
    return error.message;
  }
}

export const querySearchResult = async (AxiosPrivate, query) => {
  try {
    const response = await AxiosPrivate.get("/videos/query-search-result", {
      params: { query },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching search results:", error);
    throw error.message; 
  }
};

export const channelPublicVideoApi = async(AxiosPrivate, userId) =>{
  try {
    const response = await AxiosPrivate.get(`/videos/channel-public-video/${userId}`)
    return response.data
  } catch (error) {
    return error.message
  }
}

export const channelPrivateVideoApi = async(AxiosPrivate,userId) =>{
  try {
    const response = await AxiosPrivate.get(`/videos/channel-private-video/${userId}`)
    return response.data
  } catch (error) {
    return error.message
  }
}