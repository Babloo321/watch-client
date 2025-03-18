import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleState } from "../../redux/profile.slice.js";
import useAxiosPrivate from "../../hooks/useAxiosPrivate.js";
import { getAllSubscriptionsApi } from "../../api/subscriptionApi.js";
import { useNavigate } from "react-router-dom";
import { getHoverState } from '../../redux/cssChangedOn.slice.js'
function Subscriptions() {
  let hoverState = useSelector(getHoverState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const AxiosPrivate = useAxiosPrivate();
  const [subscriptions, setSubscriptions] = useState(null);

  useEffect(() => {
    dispatch(toggleState(false));

    const fetchSubscriptions = async () => {
      try {
        const response = await getAllSubscriptionsApi(AxiosPrivate);
        setSubscriptions(response && Array.isArray(response) ? response : []);
      } catch (error) {
        console.error("Failed to fetch subscriptions:", error);
        setSubscriptions([]);
      }
    };

    fetchSubscriptions();
  }, [dispatch, AxiosPrivate]);

  const handleChannelClick = (user) => {
    navigate("/subscriptions-details", { state: { user } });
  };

  if (subscriptions === null)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <h1 className="text-xl font-semibold">Loading...</h1>
      </div>
    );

  if (subscriptions.length === 0)
    return (
      <div  className={`w-full mb-[150px] md:mb-0 px-0 flex flex-col gap-4 ${hoverState ? "md:pl-48 md:duration-300 md:ease-in-out" : "md:pl-24 md:duration-300 md:ease-in-out"}`}>
        <h1 className="text-xl font-semibold">
          There are no subscribed channels
        </h1>
      </div>
    );

  return (
    <div className={`w-full min-h-screen mb-[150px] md:mb-0 px-0 md:p-12 flex flex-col justify-start gap-4 ${hoverState ? "md:pl-48 md:duration-300 md:ease-in-out bg-gray-900" : "md:pl-24 md:duration-300 md:ease-in-out"}  bg-gray-900`}>
      <h2 className="text-2xl font-bold mb-4 text-white text-center">Your Subscriptions</h2>

      <div className="w-[80%] mx-auto grid grid-cols-1 gap-6">
        {subscriptions.map((subs) => (
          <div
            key={subs.channelData._id}
            onClick={() => handleChannelClick(subs.channelData)}
            className="relative  h-24 md:h-[120px] bg-gray-200 rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
            style={{
              backgroundImage: subs.channelData.coverImage
                ? `url(${subs.channelData.coverImage})`
                : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-40 flex gap-12 items-center justify-start text-white p-4">
              <img
                src={subs.channelData.avatar || "/default-avatar.png"}
                alt="Channel Avatar"
                className="w-16 h-16 rounded-full border-2 border-white mb-2"
              />
              <div>
              <p className="text-lg font-semibold p-1">{subs.channelData.userName}</p>
              <p className="text-sm p-1">{subs.channelData.fullName}</p>
              <p className="text-sm p-1">{subs.channelData.email}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Subscriptions;
