import React from "react";
import { useSelector } from "react-redux";
import { getHoverState } from "../../redux/cssChangedOn.slice";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const hoverState = useSelector(getHoverState);
  return (
    <footer 
    className={`hidden md:flex w-full mb-[150px] md:mb-0 px-0 flex-col gap-4 ${hoverState ? "md:pl-48 md:duration-300 md:ease-in-out" : "md:pl-24 md:duration-300 md:ease-in-out"} bg-gray-900`}
    // className="bg-gray-900 text-white py-12 hidden md:block"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Logo & About */}
          <div>
            <h2 className="text-xl font-semibold text-white">MyWebsite</h2>
            <p className="text-gray-400 mt-2">
              The best platform for awesome content and community.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h2 className="text-lg font-semibold text-white">Quick Links</h2>
            <ul className="mt-2 space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Services</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h2 className="text-lg font-semibold text-white">Follow Us</h2>
            <div className="flex justify-center md:justify-start mt-2 space-x-4">
              <a href="https://www.facebook.com/babloo.sajan/" className="text-gray-400 hover:text-white text-xl"><FaFacebook /></a>
              <a href="https://x.com/" className="text-gray-400 hover:text-white text-xl"><FaTwitter /></a>
              <a href="https://www.instagram.com/" className="text-gray-400 hover:text-white text-xl"><FaInstagram /></a>
              <a href="https://www.linkedin.com/feed/" className="text-gray-400 hover:text-white text-xl"><FaLinkedin /></a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="text-center text-gray-500 mt-6 border-t border-gray-700 pt-4">
          © {new Date().getFullYear()} MyWebsite. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
