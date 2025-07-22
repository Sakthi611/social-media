import React from 'react'
import { AiFillHome, AiOutlineSearch, AiFillMessage, AiOutlineHeart, AiOutlinePlusCircle } from 'react-icons/ai'
import { RiVideoFill } from 'react-icons/ri'
import { CgProfile } from 'react-icons/cg'
import { HiHome } from "react-icons/hi";
import { MdPlayCircleOutline } from "react-icons/md";
import { PiMessengerLogo } from "react-icons/pi";
import { FaRegCompass } from "react-icons/fa";
import { IoReorderThreeOutline } from "react-icons/io5"
import {useNavigate} from 'react-router'

const SideBar = () => {
    const navigate=useNavigate();
  return (

    <div className="fixed  h-screen w-[17%]  bg-cover bg-white border-r border-gray-200">
      <div className="flex flex-col gap-8 ">
        <div className="py-2 px-2">
          <img 
            src="/instagramText.png" 
            className="w-28 cursor-pointer object-contain" 
            alt="Instagram"
          />
        </div>
        
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 px-3 py-1 hover:bg-gray-100 rounded-lg cursor-pointer">
            <HiHome className="text-2xl" />
            <span>Home</span>
          </div>

          <div className="flex flex-col gap-6"> 
            <div className='flex items-center gap-4 px-2 py-1 hover:bg-gray-100 rounded-lg cursor-pointer'>
                <FaRegCompass className="text-2xl"/>
                <span>Explore</span>
            </div>
          </div>

          <div className="flex items-center gap-4 px-2 py-1 hover:bg-gray-100 rounded-lg cursor-pointer">
            <AiOutlineSearch className="text-2xl" />
            <span>Search</span>
          </div>

          <div className="flex items-center gap-4 px-2 py-1 hover:bg-gray-100 rounded-lg cursor-pointer">
            <MdPlayCircleOutline  className="text-2xl" />
            <span>Reels</span>
          </div>

          <div className="flex items-center gap-4 px-2 py-1 hover:bg-gray-100 rounded-lg cursor-pointer">
            <PiMessengerLogo className="text-2xl" />
            <span>Messages</span>
          </div>

          <div className="flex items-center gap-4 px-2 py-1 hover:bg-gray-100 rounded-lg cursor-pointer">
            <AiOutlineHeart className="text-2xl" />
            <span>Notifications</span>
          </div>

          <div className="flex items-center gap-4 px-2 py-1 hover:bg-gray-100 rounded-lg cursor-pointer">
            <AiOutlinePlusCircle className="text-2xl" />
            <span>Create</span>
          </div>

          <div className="flex items-center gap-4 px-2 py-1 hover:bg-gray-100 rounded-lg cursor-pointer "  onClick={()=>navigate('/profile')} >
            <CgProfile className="text-2xl"/>
            <span>Profile</span>
          </div>

           <div className="flex items-center gap-4 px-2 py-1 hover:bg-gray-100 rounded-lg cursor-pointer">
            <IoReorderThreeOutline className="text-2xl" />
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default SideBar