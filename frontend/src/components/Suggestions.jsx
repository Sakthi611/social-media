import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Suggestions = () => {
  const [profile, setProfile] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [followingStatus, setFollowingStatus] = useState({});
  useEffect(() => {
    axios.get('http://localhost:3002/api/profile')
      .then(res => {
        setProfile(res.data.user);
        console.log("Fetched Data: ", res.data.user);
      })
      .catch(error => console.log("Error fetching profile:", error));

    //fetch the Suggestions data

    axios.get('http://localhost:3002/api/suggestions')
      .then(res => {
        setSuggestions(res.data.user);
        console.log("Suggestion data", res.data.user);
      })
      .catch(error => console.log(error))

  }, []);

  async function handleFollow(userId) {
    try {
      // First check if we're already following this user
      const followersResponse = await axios.get('http://localhost:3002/api/followers');
      const currentFollowers = followersResponse.data.followers;
      
      // Get the user details from suggestions
      const response = await axios.get(`http://localhost:3002/api/suggestions/${userId}`);
      const userToFollow = response.data.user;
      
      // Check if this user is already being followed
      const isAlreadyFollowing = currentFollowers.some(
        follower => follower.username === userToFollow.name
      );

      if (isAlreadyFollowing) {
        alert("You are already following this user");
        setFollowingStatus(prev => ({ ...prev, [userId]: true }));
        return;
      }

      // If not already following, create new follower
      const createFollower = await axios.post(`http://localhost:3002/api/followers`, {
        username: userToFollow.name,
        profile_pic: userToFollow.profilePicture
      });

      if (createFollower.data.success) {
        console.log("Follow Successful");
        // Update following status for this specific user
        setFollowingStatus(prev => ({ ...prev, [userId]: true }));
      }
    }
    catch (error) {
      console.error("Follow failed:", error.response?.data?.message || error.message);
      // Reset following status for this specific user on error
      setFollowingStatus(prev => ({ ...prev, [userId]: false }));
    }
  }
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
          suggestions.length > 0 ? (
            suggestions.map(user => (
              <div className="flex items-center gap-3 p-2 " key={user._id}>
                <img className="rounded-full w-10 h-10 object cover "
                  src={`http://localhost:3002/${user.profilePicture}`} alt="" />
                <p className="text-sm font-semibold">{user.name}</p>
                <button
                  className={`ml-auto text-sm font-semibold ${
                    followingStatus[user._id] 
                      ? 'text-gray-500 hover:text-gray-700' 
                      : 'text-blue-500 hover:text-blue-700'
                  } transition-colors`}
                  onClick={() => handleFollow(user._id)}
                >
                  {followingStatus[user._id] ? 'Following' : 'Follow'}
                </button>
              </div>
            ))
          ) :
            <p>Loading Suggestions...</p>
        }
      </div>
    </div>
  );
};

export default Suggestions;
