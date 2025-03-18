import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaSearch, FaUser } from "react-icons/fa";
import { RiVideoUploadFill, RiLoginBoxFill  } from "react-icons/ri";
import { useDispatch,useSelector } from "react-redux";
import { toggleHover,setProfile,getProfileState } from "../../redux/cssChangedOn.slice";
import useAuth from '../../hooks/useAuth';
import ProfilePopup from "../../pages/profilePopup/ProfilePopup";
import { MdSubscriptions } from "react-icons/md";

const Navbar = () => {
  const { token,user } = useAuth();
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector(getProfileState);
  const handleProfileClick = () =>{
    dispatch(setProfile(!profile));
  }
    return (
      <nav
        className={`fixed bottom-0 text-white transition-all duration-300 
        flex w-full h-[60px] flex-row justify-center max-md:bg-gray-900
        md:bg-gray-0 md:w-24 md:h-screen md:top-0 md:left-0 md:flex-col md:items-center md:justify-start
        
        ${isHovered ? "md:w-48 md:bg-gray-900 md:h-[100vh]" : "md:w-24"}`}
        onMouseEnter={() => {setIsHovered(true);dispatch(toggleHover(true))}}
        onMouseLeave={() => {setIsHovered(false);dispatch(toggleHover(false))}}
      >
        <ul className="flex flex-row md:justify-start md:flex-col md:items-start md:space-y-2 md:mt-2 md:px-2">
         
         {
          token ? (
            <>
            <NavItem to="/" icon={<FaHome className="text-[32px]"/>} text="Home" isHovered={isHovered} />
            <NavItem to="/video-upload" icon={<RiVideoUploadFill className="text-[32px]"/>} text="Upload" isHovered={isHovered} />
            <NavItem to="/subscriptions" icon={<MdSubscriptions className="text-[32px]"/>} text="Subscriptions" isHovered={isHovered} />
            <NavItem to="/search" icon={<FaSearch className="text-[32px]"/>} text="Search" isHovered={isHovered} />
          <NavItem to="/you" icon={<FaUser className="text-[32px]"/>} text="You" isHovered={isHovered} />
          <img src={user.avatar} alt="avatar"
            className={`w-[35px] h-[35px] border-[1px] border-circle border-white rounded-full cursor-pointer md:ml-3 md:space-x-4 translate-y-3 md:translate-y-2`}
            onClick={handleProfileClick}
          />
          <span className={`hidden ${isHovered ? "md:block translate-x-14 translate-y-[-30px]" : ""}`}>Profile</span>
          { profile && <ProfilePopup />}
          </>
          
          ) : (
            <>
            <NavItem to="/" icon={<FaHome className="text-[32px]"/>} text="Home" isHovered={isHovered} />
            {/* <NavItem to="/authenticate-signup" icon={<FaSignInAlt className="text-[32px]"/>} text="Signup" isHovered={isHovered} /> */}
          <NavItem to="/authenticate-login" icon={<RiLoginBoxFill className="text-[32px]"/>} text="Login" isHovered={isHovered} />
          </>
          )
         } 
        </ul>
      </nav>
        
    );
  }
  

const NavItem = ({ to, icon, text, isHovered }) => {
  return (
    <li className="w-full">
      <NavLink
        to={to}
        className="flex items-center space-x-4 p-3 rounded-md text-white md:hover:bg-gray-700 hover:text-white transition-all duration-300"
      >
        <span className="text-xl">{icon}</span>
        {isHovered && <span className="hidden md:block md:whitespace-nowrap md:opacity-100">{text}</span>}
      </NavLink>
    </li>
  );
};

export default Navbar;
