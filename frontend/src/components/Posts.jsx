
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CiHeart } from "react-icons/ci";
import { FaRegComment } from "react-icons/fa";
import { LuSend } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
const Posts = () => {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [likedPosts, setLikedPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/api/posts')
      .then(res => {
        setPosts(res.data.posts)
        console.log("posts data", res.data.posts);
        setLoading(true);
      })
      .catch(error => console.log(error));
  }, [])

  function handleLike(postid) {
    if (likedPosts.includes(postid)) {
      setLikedPosts(likedPosts.filter(id => id !== postid))
      setPosts(posts.map(post => {
        if (post._id == postid) {
          return { ...post, likes: post.likes - 1 }
        }
        return post;
      }
    ))
    }
    else {
      setLikedPosts([...likedPosts, postid])
      setPosts(posts.map(post => {
        if (post._id === postid) {
          return { ...post, likes: post.likes + 1 }
        }
        else {
          return post;
        }
      }))
    }
  }

  return (
    <div className="max-w-xl mx-auto">
      <div className="space-y-6 ">
        {
          posts.length > 0 ? (
            <div>
              {posts.map(post => (
                <div className="bg-white rounded-lg  mb-6" key={post._id}>
                  {/* Post Header */}
                  <div className="flex items-center p-3">
                    <img className="rounded-full object-cover w-8 h-8"
                      src={`http://localhost:3002/${post.user.profile_pic}`}
                      alt={post.user.username}
                    />
                    <p className="ml-3 font-semibold text-sm">{post.user.username}</p>
                  </div>

                  {/* Post Image */}
                  <div className="relative aspect-square">
                    <img className="w-full h-full object-cover"
                      src={`http://localhost:3002/${post.image}`}
                      alt="Post content"
                    />
                  </div>

                  {/* Post Actions */}
                  <div className="px-4 pt-4">
                    <div className="flex  gap-4">
                      {
                      (likedPosts.includes(post._id)) ? (
                        <FaHeart
                          onClick={() => handleLike(post._id)}
                          className="w-7 h-7 cursor-pointer text-red-500"
                        />
                      )
                      :(
                        <CiHeart onClick={() => {
                         
                          handleLike(post._id)
                        }} className={`w-7 h-7 cursor-pointer hover:text-gray-600`} />
                      )
                    }
                      <FaRegComment className="w-7 h-7 cursor-pointer hover:text-gray-600" />
                      <LuSend className="w-7 h-7 cursor-pointer hover:text-gray-600" />
                    </div>
                  </div>

                  {/* Likes */}
                  <div className="px-4 pt-2 text-left">
                    <p className="font-semibold text-sm">
                      {post.likes} likes
                    </p>
                  </div>

                  {/* Caption */}
                  <div className="px-4 pt-1 pb-4 text-left">
                    <p className="text-sm">
                      <span className="font-semibold mr-1">{post.user.username}</span>
                      {post.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-gray-500">
              Loading Posts...
            </div>
          )
        }
      </div>
    </div>
  )
}

export default Posts