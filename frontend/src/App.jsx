import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './index.css'
import SideBar from './components/SideBar'
import Feeds from './components/Feeds'
import Suggestions from './components/Suggestions'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex ">
        <div className="w-[20%]  ">
          <SideBar />
        </div>
        <div className="w-[50%]">
          <Feeds />
        </div>
        <div className="w-[30%]">
          <Suggestions />
        </div>
      </div>
    </>
  )
}

export default App
