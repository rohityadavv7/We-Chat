import React, { useContext, useState } from 'react'
import { IconButton,Button,TextField,Grid, Typography,Container,Paper } from '@mui/material'
import {CopyToClipboard} from "react-copy-to-clipboard"
import {Assignment, Phone, PhoneDisabled} from "@mui/icons-material"
import { SocketContext } from '../Context'


const Options = ({children}) => {

    const {me, callAccepted, name, setName,callEnded, leaveCall, callUser} = useContext(SocketContext);

    const[idToCall, setIdToCall] = useState('');

  return (
    <div className='w-11/12 mt-20 mx-auto flex rounded-2xl m-12 bg-[#20232C]'>
        <div className='flex gap-16 p-4 mx-auto '>

                    <div>
                        <h2 className='text-richblack-50'>
                            Click to Get your meeting id
                        </h2>

                         
                        <CopyToClipboard text={me} >
                            <IconButton variant="contained"  color="main" aria-label='Assignment' size='large'>
                                <Assignment fontSize='inherit' className='text-white'/>
                            </IconButton>
                        </CopyToClipboard>
    
                    </div>

                    <div className='space-y-5'>

                        <h2 className=' text-white italic font-semibold'>
                            your name goes here...
                        </h2>

                        <div>
                            <input 
                            type='text' 
                            name="Name" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            className='rounded-lg p-1 text-pure-greys-700' />
                            
                        </div>
                        
                    </div>
                    <div className=' space-y-5'>
                        <h2 className=' text-white italic font-semibold'>
                            Enter meeting code
                        </h2>
                        
                        <input type='text' 
                        name="ID to call" 
                        value={idToCall} 
                        onChange={(e) => setIdToCall(e.target.value)}  
                        className='rounded-lg p-1 text-pure-greys-700'/>
                        
                    </div> 

                    <div className='flex justify-start items-center text-xl'>
                        {callAccepted && !callEnded ? (
                                <div className='text-3xl bg-white flex items-center rounded-full'>
                                    {/* call end krne k lie */}
                                    <IconButton variant="contained" aria-label="phone" color="error" className='bg-red' 
                                        onClick={leaveCall} >
                                        <Phone/>
                                    </IconButton>
                                </div>
                            ) : 
                            (
                                
                                <div className='text-3xl bg-white flex items-center rounded-full'>
                                    <IconButton variant="contained" color="primary" size='large'
                                    onClick={() => callUser(idToCall)}>
                                        <Phone fontSize='inherit'/>
                                    </IconButton>
                                </div>
                        )}
                    </div>
                
                {children}
        </div>

    </div>
  )
}

export default Options