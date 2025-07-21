

import React, { useEffect,useState } from 'react'
import { useParams ,Link,useNavigate} from 'react-router';
import { FaChevronCircleLeft } from "react-icons/fa";
import { FaChevronCircleRight } from "react-icons/fa";
import axios from 'axios';
const ViewStory = () => {
    const [story,setStory]=useState(null);

    const navigate=useNavigate();
    const {id,tot}=useParams();
    useEffect(()=>{
        axios.get(`http://localhost:3002/api/story/${id}`)
        .then(res=>{
            setStory(res.data.story);
            console.log("Stories data",res.data.story);
        })
        .catch(error=>{
            console.log("Error fetching stories",error);
        })
    },[id])
    if(id<=0 || id>tot){
        navigate('/')
    }
  return (
    <div>
        <div>
            {
                story ?(
                    <div className="flex items-center justify-center" >
                        <Link to={`http://localhost:5173/stories/${Number(id)-1}/${tot}`}
                        className="p-3 hover:bg-gray-200 rounded-full" >
                            <FaChevronCircleLeft/>
                        </Link>
                        <img className="h-screen" src={`http://localhost:3002/${story.image}`} alt=""/>
                        <Link to={`http://localhost:5173/stories/${Number(id)+1}/${tot}`} 
                         className="p-3 hover:bg-gray-200 rounded-full">
                            <FaChevronCircleRight/>
                        </Link>
                    </div>
                )
                :
                <p>Loading Stories...</p>
            }
        </div>

    </div>
  )
}

export default ViewStory