import React,{useState,useEffect,createContext,useRef} from "react";
import {io} from "socket.io-client"
import Peer from "simple-peer"

const SocketContext = createContext();

const Socket = io("http://localhost:5000");

const ContextProvider = ({children}) => {
    const[stream, setStream] = useState({});
    const[call,setCall] = useState({});
    const[name,setName] = useState('');
    const[me,setMe] = useState('');
    const[callAccepted, setCallAccepted] = useState(false);
    const[callEnded, setCallEnded] = useState(false);


    const myVideo = useRef({});
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {

        navigator.mediaDevices.getUserMedia({video:true, audio:true})
        .then((currentStream) => {
            setStream(currentStream);

            myVideo.current.srcObject = currentStream;
        });

        Socket.on('me', (id) => setMe(id));

        Socket.on('callUser',({ from,name: callerName, signal }) => {

            //callUser event ko server p handle krne k lie jo data chie wo set krliya
            setCall({ isReceivingCall: true, 
                from, name: callerName,
                signal
            });
        });
    },[]);


    const answerCall = () => {
        
        console.log("answering the other call");

        setCallAccepted(true);

        //websocket connection k lie ek peer ka instance bnare h
        const peer = new Peer({initiator: false, trickle: false, stream});

        peer.on('signal',(data) => {
            Socket.emit('answerCall', {signal: data, to: call.from});
        });

        peer.on('stream',(currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        peer.signal(call.signal);

        connectionRef.current = peer;
    }

    const callUser = (id) => {

        const peer = new Peer({ initiator: true, trickle: false, stream });

        peer.on('signal', (data) => {
            Socket.emit('callUser', { userToCall: id, signalData: data, from: me, name });
        });

        peer.on('stream',(currentStream) => {
            userVideo.current.srcObject = currentStream;
        });

        Socket.on('callAccepted', (signal)=> {
                
            setCallAccepted(true);

            peer.signal(signal);
        });

        connectionRef.current = peer;
    }

    const leaveCall = () => {

        setCallEnded(true);

        connectionRef.current.destroy();

        window.location.reload();
    };

    return(
        <SocketContext.Provider value={{
            stream,call, callAccepted, myVideo, userVideo, name, setName, callEnded, me, callUser, leaveCall, answerCall
        }}>
            {children}

        </SocketContext.Provider>
    )

}

export {ContextProvider, SocketContext};