import { useDispatch, useSelector } from "react-redux";
import { toggleState, getPopupState } from "../redux/profile.slice.js";

const usePopUpToggle = () => {
  const dispatch = useDispatch();
  const popupState = useSelector(getPopupState);
  const setPopupTrue = () => dispatch(toggleState(true));
  const setPopupFalse = () => dispatch(toggleState(false));
  const popupToggle = () => dispatch(toggleState(!popupState));
  return { popupState, setPopupFalse, setPopupTrue, popupToggle };
};

export default usePopUpToggle;