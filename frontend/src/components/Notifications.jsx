import React, { useContext } from 'react'
import{Button} from "@mui/material"
import { SocketContext } from '../Context'
import { PhoneCallback } from '@mui/icons-material';

const Notifications = ()  =>{
    const{answerCall, call, callAccepted} = useContext(SocketContext);

  
    return (
        <div>
            {
                call.isReceivingCall && !callAccepted && (
                    <div style={{display:'flex', justifyContent:'space-around' , flexDirection:'column'
                     , gap:'8'}}>
                        <h1 className='text-richblack-50 italic font-semibold mb-3'>
                            {call.name} is Calling
                        </h1>

                        <Button variant='contained' color='primary' onClick={answerCall}>
                            Answer
                        </Button>
                        

                    </div>
                )
            }
        </div>
  )
}

export default Notifications