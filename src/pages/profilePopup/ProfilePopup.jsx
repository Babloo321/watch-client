import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { logoutApi } from '../../api/userApi.js';
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js';
import { useDispatch } from "react-redux";
import { setProfile } from "../../redux/cssChangedOn.slice";
import { toast } from "react-toastify";
function ProfilePopup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user,logout } = useAuth();
  const AxiosPrivate = useAxiosPrivate();
  const handleProfileClick = () =>{
    dispatch(setProfile(false));
    return navigate("/you")
  }

  const handleLogout = async () => {
    try {
      const response = await logoutApi(AxiosPrivate);
      const { success } = response.data;
      if(success){
          toast.success('Logged out successfully!');
          setTimeout(() => {
            logout();
            dispatch(setProfile(false));
            return navigate('/');
          }, 3000);
        }
    } catch (error) {
      toast.error("something went wrong with logging out!" || error.message);
      return;
    }
  };
  return (
        <div className="absolute md:bottom-0 md:left-0 md:mt-2 right-0 bottom-[50px]  w-64 bg-gray-900/70 shadow-lg p-4">
          <div className="flex items-start justify-between">
            <img
              src={user.avatar}
              alt="Profile"
              className="w-12 h-12 rounded-full"
            />
            <div className="text-right">
              <p className="font-semibold">{user.fullName}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <div className="mt-4 border-t pt-2">
            <p 
            className="cursor-pointer hover:bg-gray-100 hover:text-black p-2 rounded-md"
            onClick={handleProfileClick}
            >Profile</p>
            <p 
            onClick={handleLogout}
            className="cursor-pointer hover:bg-gray-100 p-2 rounded-md text-red-500">Logout</p>
          </div>
        </div>
  );
}

export default  ProfilePopup;