import React, { useEffect, useState } from 'react';
import { IoSend } from 'react-icons/io5';
function CommentSection({ user, comments, onCommentSend }) {
  const [createComment, setCreateComment] = useState('');
  const [show,setShow] = useState(false);
  useEffect(() =>{
    setShow(false);
  },[])
  function handleComment(){
    onCommentSend(createComment);
    setCreateComment('')
  }
  return (
    <div className='flex flex-col bg-gray-900'>
    <div className="w-full p-2 flex justify-between bg-gray-900">

    <div>
        <img src={user?.avatar} alt="avatar" className={`w-10 h-10 rounded-full border-[1px] border-s-orange-50`} />
    </div>

    <div className='w-[90%] flex gap-1'>
    <input
            onClick={() => setShow(!show)}
            type="text"
            value={createComment}
            onChange={(e) => setCreateComment(e.target.value)}
            placeholder="Write a comment"
            className={`bg-gray-900 px-2 cursor-text text outline-none no-underline hover:underline text-white text-4 font-sans border-none w-[90%]`}
          />
     <IoSend 
     className={`text-white w-[10%] text-center text-[28px] px-2 hover:text-blue-700 hover:cursor-pointer`} 
     onClick={handleComment} />
    </div>
   
    </div>

    {
      comments ? (
        <div className={`${show ? "flex flex-col gap-2 px-2" : "hidden"} md:flex md:flex-col md:gap-2 md:px-2 md:py-4`}>
          { 
            comments.map((comment) => (
              <div key={comment._id} className='flex justify-start items-center gap-2 py-2'>
                <img src={comment?.userDetails?.avatar} alt='avatar' className={`w-10 h-10 rounded-full border-[1px] border-s-orange-50`}/>
                <p className='text-white text-[18px] px-2'>{comment.content}</p>
              </div>
            ))
          }
        </div>
      ) : (
        <p className='text-white text-3xl p-12'>No Comments</p>
      )
    }
    </div>
  );
}

export default CommentSection;
