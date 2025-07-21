
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useNavigate} from 'react-router';
const Story = () => {
  
  const [story,setStory]=useState([]);
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate();
  useEffect(()=>{
    axios.get('http://localhost:3002/api/story')
    .then(res=>{
      setStory(res.data.story);
      console.log("Story data",res.data.story);
      setLoading(true);
    })
    .catch(err=>console.log(err));
    },[])
    const tot=story.length;
  return (
    <div className="">
        <div className="mt-0">
          {
            story.length>0 ? (
              <div className="flex ">
                {
                  story.map(item=>(
                    <div className="p-2 cursor-pointer" key={item._id} onClick={()=>navigate(`/stories/${item.id}/${tot}`)}>
                      <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 p-[2px] rounded-full">
                        <div className="bg-white p-[2px] rounded-full">
                          <img 
                            src={`http://localhost:3002/${item.user.profile_pic}`} 
                            alt={item.user.username} 
                            className="rounded-full w-14 h-14 object-cover hover:scale-95 transition-transform"
                          />
                        </div>
                      </div>
                      <p className="text-xs font-semibold text-center mt-1 truncate w-16 mb-1">{item.user.username}</p>
                    </div>
                  ))
                }
              </div>
            ):
            <p>Loading Stories...</p>
          }
        </div>
    </div>
  )
}

export default Story;