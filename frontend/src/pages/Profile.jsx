import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import axios from 'axios'
const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [followers, setFollowers] = useState([]);
  const [unfollowed, setunFollowed] = useState(false);

  const navigate=useNavigate('');
  useEffect(() => {
    axios.get('http://localhost:3002/api/profile')
      .then(res => {
        setProfile(res.data.user)
        console.log("profile info", res.data.user)
      })
      .catch(err => {
        console.log(err);
      })

    axios.get('http://localhost:3002/api/followers')
      .then(res => {
        setFollowers(res.data.followers)
        console.log("followers", res.data.followers);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  function handleOnChange(e, userId) {
    setProfile(prev =>
      prev.map(user =>
        user._id === userId
          ? { ...user, [e.target.name]: e.target.value }
          : user
      )
    );
  }

  async function updateChange(userId) {
    try {
      const userToUpdate = profile.find(user => user._id === userId);
      if (!userToUpdate) return;

      const response = await axios.put(
        `http://localhost:3002/api/profile/${userId}`,
        {
          name: userToUpdate.name,
          profilePicture: userToUpdate.profilePicture
        }
      );

      if (response.data.success) {
        // Update the local state with the server response
        setProfile(prev =>
          prev.map(user =>
            user._id === userId ? response.data.user : user
          )
        );
        console.log("Profile updated successfully");
        alert("Profile updated Successfully");
        navigate('/');
      }
    }
    catch (error) {
      console.error("Update failed:", error.response?.data?.message || error.message);
    }
  }

  const length = followers.length;
  async function handleUnfollow(id){
    console.log("working");
    try{
      const response = await axios.delete(`http://localhost:3002/api/followers/${id}`)
      if(response.data.success){
        console.log("follower deleted");
        // Update the followers state by removing the unfollowed user
        setFollowers(prev => prev.filter(follower => follower._id !== id));
        setunFollowed(!unfollowed);
      }
    }
    catch(err){
      console.log(err);
    }
  }
  console.log(followers);
  return (
    <div>
      {
        profile.length > 0 ? profile.map(user => (
          <div key={user._id} className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow">
            <div className="flex items-center gap-4 mb-4">
              <img
                className="rounded-full w-40 h-40 object-cover border border-gray-200"
                src={`http://localhost:3002/${user.profilePicture}`}
                alt={user.name}
              />
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                  <h5 className="text-xl font-semibold">{user.name}</h5>
                  <button className="px-4 py-1.5 bg-gray-100 rounded-md font-semibold text-sm hover:bg-gray-200">
                    Edit profile
                  </button>
                </div>

                <div className="flex items-center gap-10">
                  <div className="flex items-center gap-1 cursor-pointer">
                    <span className="font-semibold">{length}</span>
                    <span className="text-gray-700">posts</span>
                  </div>

                  <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
                    <span className="font-semibold">{length}</span>
                    <span className="text-gray-700">followers</span>
                  </div>

                  <div className="flex items-center gap-1 cursor-pointer hover:opacity-80">
                    <span className="font-semibold">{length}</span>
                    <span className="text-gray-700">following</span>
                  </div>
                </div>

                <div className="text-sm">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-gray-700 mt-1">Bio goes here...</p>
                </div>
              </div>


            </div>


            <div className="space-y-4">
              <div>
                <label className=" text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={user.name}
                  name="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  onChange={(e) => handleOnChange(e, user._id)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL</label>
                <input
                  type="text"
                  value={user.profilePicture}
                  name="profilePicture"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                  onChange={(e) => handleOnChange(e, user._id)}
                />
              </div>

              <button
                onClick={() => updateChange(user._id)}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Update Profile
              </button>
            </div>
          </div>

        )
        )
          :
          <p>Loading Profile...</p>
      }

      {
        followers.length > 0 ? followers.map(follower => (
          <div className="max-w-2xl mx-auto p-4 bg-white rounded-lg shadow" key={follower._id}>
            <div className="flex items-center gap-3">
              <img
                src={`http://localhost:3002/${follower.profile_pic}`}
                alt="profile"
                className=" rounded-full w-20 h-20 object cover "
               
              />
              <strong className="ml-4">{follower.username}</strong>
            <button className=" ml-10 w-20 h-10  bg-blue-500 text-white py-1 px-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 "
             onClick={() => { handleUnfollow(follower._id) }}>
              Unfollow
            </button>
            </div>
          </div>
        )) :
        <div className="max-w-2xl mx-auto mt-8 p-8 bg-white rounded-lg shadow text-center">
          <div className="flex flex-col items-center gap-4">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-800">No Followers Yet</h3>
            <p className="text-gray-500 mb-4">Start connecting with other users to build your following</p>
            <button 
              onClick={() => navigate('/')} 
              className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Explore People
            </button>
          </div>
        </div>
      }
    </div>
  )
}

export default Profile