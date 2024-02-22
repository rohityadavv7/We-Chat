import React, { useContext } from 'react'
import { SocketContext } from '../Context'



const VideoPlayer = ()=>{

  const {name, callAccepted, myVideo, callEnded, userVideo, stream, call} = useContext(SocketContext);
  
  return (
        <div className='flex relative gap-10 items-center justify-center mt-8  w-11/12 mx-auto mb-8'>
            
            {/* our video */}
            {
                stream && (
                    <div className='bg shadow-l rounded-md border border-blue-1 shadow-md shadow-blue-1' >
                            <h2 className='text-xl p-1 text-white'>
                                {name || 'You'}
                            </h2>

                            <video playsInline muted ref={myVideo} className='rounded-xl object-cover'
                            autoPlay width={400} height={200}/>

                    </div>
                )
            }

            {/* user's Video */}
            {
                callAccepted && !callEnded && (

                    <div className='shadow-l rounded-md border border-blue-1 shadow-md shadow-blue-1'>
                        
                            <h2 className='text-xl p-1 text-white'>
                                {call.name || 'You are in call with'}
                            </h2>

                            <video playsInline ref={userVideo} className='rounded-xl'
                            autoPlay width={400} height={200}/>

                    </div>
                )
            }
        </div>
  )
}

export default VideoPlayer