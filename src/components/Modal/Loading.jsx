import React from "react"

const Loading = () => {
    
  return (
   <>
          <div className="fixed z-50 backdrop-blur-md h-[100%] w-[100%] top-0 left-0 flex justify-center items-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-16 h-16 border-4 border-t-transparent border-pink-500 rounded-full animate-spin"></div>
            <div className="absolute w-12 h-12 border-4 border-t-transparent border-green-500 rounded-full animate-spin-slow"></div>
            <div className="absolute w-8 h-8 border-4 border-t-transparent border-blue-500 rounded-full animate-spin-reverse"></div>
          </div>
          </div>

   </>
  )
}

export default Loading