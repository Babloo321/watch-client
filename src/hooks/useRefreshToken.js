import API from '../api/apiInstance';
import useAuth from './useAuth';
function useRefreshToken() {
  const { login, refreshToken,token,user } = useAuth();
  const refresh = async () => {
    const response = await API.post(
      '/users/refresh-token',
      { refreshToken:refreshToken },
      { headers: { 'Content-Type': 'application/json' } },
      { withCredentials: true }
    );
    login({ accessToken: response.data?.data?.accessToken,refreshToken:response.data?.data?.refreshToken,user });
    return response.data?.data?.accessToken;
  };
  return refresh;
}

export default useRefreshToken;


