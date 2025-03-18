export const toggleSubscriptionApi = async (AxiosPrivate, channelDetails) => {
  try {
    const response = await AxiosPrivate.patch(`/subscription/toggle-subscription/${channelDetails._id}`, {
      "channelName": channelDetails.userName 
    });
    // if subscribe return true, else if user same  channel return true else unsubscribe return false
    return response.data.data.success;
  } catch (error) {
    return error.message;
  }
};

export const getSubscriberDataApi = async (AxiosPrivate, channelId) => {
  try {
    const response = await AxiosPrivate.get(`/subscription/total-subscriber/${channelId}`);
    return response.data.data[0];
  } catch (error) {
    return error.message;
  }
};

export const getAllSubscriptionsApi = async (AxiosPrivate) =>{
  try {
    const res = await AxiosPrivate.get("/subscription/total-subscriptions");
    return res.data.data
  } catch (error) {
    return error.message;
  }
}