import API from './apiInstance';
const signupApi = async (data) => {
  try {
    const response = await API.post('/users/register', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // API responded with a status code other than 2xx
      return { error: error.response.status };
    } else if (error.request) {
      // No response from server
      return { error: "Server is not responding. Please try again later." };
    } else {
      // Something else happened
      return { error: "An unexpected error occurred. Please try again." };
    }
  }
};

const loginApi = async (data) => {
  try {
    const response = await API.post('/users/login',data,{
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (err) {
    return err;
  }
}

export { signupApi, loginApi };
