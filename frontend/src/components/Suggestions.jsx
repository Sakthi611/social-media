import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Suggestions = () => {
  const [profile, setProfile] = useState([]);
  const [suggestions,setSuggestions]=useState([]);
  useEffect(() => {
    axios.get('http://localhost:3002/api/profile')
      .then(res => {
        setProfile(res.data.user);
        console.log("Fetched Data: ", res.data.user);
      })
      .catch(error => console.log("Error fetching profile:", error));

   //fetch the Suggestions data
   
   axios.get('http://localhost:3002/api/suggestions')
   .then(res=>{
    setSuggestions(res.data.user);
    console.log("Suggestion data",res.data.user);
   })
   .catch(error=>console.log(error))

  }, []);

  return (
    <div className="p-6 pt-0 ml-0 ">
      {profile.length > 0 ? (
        profile.map(user => (
          <div className="flex items-center gap-3 p-2" key={user._id}>
            <img 
              className="w-10 h-10 rounded-full object-cover border border-gray-200" 
              src={`http://localhost:3002/${user.profilePicture}`} 
              alt={user.name} 
            />
              <p className="text-sm font-semibold">{user.name}</p>
             

            <button className="ml-auto text-sm font-semibold text-blue-500 hover:text-blue-700">
              Switch
            </button>
          </div>
        ))
      ) : (
        <p>Loading users...</p>
      )}

<div className="flex items-center gap-3 p-2 mb-3 mt-3">
  <p className="text-sm font-semibold text-gray-700">Suggested For You</p>

  <button className="ml-auto text-sm font-semibold text-gray-700 hover:text-gray-400">
    See all
  </button>
</div>
      <div >
        {
          suggestions.length>0 ?(
            suggestions.map(user=>(
              <div  className="flex items-center gap-3 p-2 " key={user._id}>
                <img className="rounded-full w-10 h-10 object cover "
                 src={`http://localhost:3002/${user.profilePicture}`} alt="" />
                 <p className="text-sm font-semibold">{user.name}</p>

                 <button className='ml-auto text-sm font-semibold text-blue-500 hover:text-blue-800'>
                  Follow</button>
              </div>
            ))
          ):
          <p>Loading Suggestions...</p>
        }
      </div>
    </div>
  );
};

export default Suggestions;
