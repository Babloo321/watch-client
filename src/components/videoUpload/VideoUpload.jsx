import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleState } from '../../redux/profile.slice.js';
import useAuth from '../../hooks/useAuth.js';
import { getHoverState } from "../../redux/cssChangedOn.slice";
import useAxiosPrivate from '../../hooks/useAxiosPrivate.js';
import { createVideoApi } from '../../api/videoApi.js';
function VideoUpload() {
  const AxiosPrivate = useAxiosPrivate();
  let hoverState = useSelector(getHoverState);
  const { token } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: '',
    description: '',
    thumbnail: null,
    videoFile: null,
    isPublished: false
  });

  useEffect(() => {
    dispatch(toggleState(false));
  }, [token]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value === "isPublished" ? !prev.isPublished : value,
    }));
  };

  const onFileChange = (e) => {
    const { name, files } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!token) {
        toast.error('Access token not found');
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append('title', data.title);
      formDataToSend.append('description', data.description);
      if (data.isPublished) formDataToSend.append('isPublished', data.isPublished);
      if (data.thumbnail) {
        formDataToSend.append('thumbnail', data.thumbnail);
      } else {
        toast.error('Please select a thumbnail');
        return;
      }
      if (data.videoFile) {
        formDataToSend.append('videoFile', data.videoFile);
      } else {
        toast.error('Please select a video file');
        return;
      }

      const response = await createVideoApi(AxiosPrivate,formDataToSend);
      // const response = await axios.post('http://localhost:8080/api/v1/videos', formDataToSend, {
      //   headers: {
      //     "Authorization": `Bearer ${token}`,
      //     'Content-Type': 'multipart/form-data',
      //   },
      //   withCredentials: true,
      // });
      if(response.success){
        toast.success("Video is Uploading successfully...");
        setData({
          title: '',
          description: '',
          thumbnail: null,
          videoFile: null,
          isPublished: false
        });
        navigate('/');

      }
      setData({
        title: '',
        description: '',
        thumbnail: null,
        videoFile: null,
        isPublished: false
      });
    } catch (err) {
      toast.error('An error occurred while uploading the video');
      navigate("/video-upload");
    }
  };

  return (
    <div 
    className={`
    w-full mb-16 md:mb-0 px-0 flex flex-col justify-center items-center gap-4 ${hoverState ? "md:pl-48 md:duration-300 md:ease-in-out" : "md:pl-24 md:duration-300 md:ease-in-out"}
    bg-[url("https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg?auto=compress&cs=tinysrgb&w=600")] bg-cover bg-center
    `}
    >
      <div className="w-full max-w-2xl p-6 md:mt-10  shadow-lg bg-green-700/50">
        <h2 className="text-2xl font-bold text-center mb-6 text-white">Upload a Video</h2>
        <form onSubmit={onSubmit} className="space-y-4 shadow-xl p-2">
          <div>
            <label className="block font-medium text-white">Title</label>
            <input type="text" name="title" required value={data.title} onChange={onChange} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-medium text-white">Description</label>
            <textarea name="description" rows="4" value={data.description} onChange={onChange} className="w-full p-2 border rounded-md"></textarea>
          </div>
          <div>
            <label className="block font-medium text-white">Thumbnail:</label>
            <input type="file" name="thumbnail" required onChange={onFileChange} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-medium text-white">Video:</label>
            <input type="file" name="videoFile" required onChange={onFileChange} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block font-medium text-white">Publish Now:</label>
            <select name="isPublished" value={data.isPublished} onChange={onChange} className="w-full p-2 border rounded-md">
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>
          <div>
            <input type="submit" value="Upload" className="w-full bg-blue-600 text-white p-2 rounded-md cursor-pointer hover:bg-blue-700" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default VideoUpload;
