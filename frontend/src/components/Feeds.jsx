import React from 'react'
import Story from './Story';
import Posts from './Posts';
const Feeds = () => {
  return (
    <div>
      <div className="h-24 p-2"><Story/></div>
      <div><Posts/></div>
    </div>
  )
}

export default Feeds