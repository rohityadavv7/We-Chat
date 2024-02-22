
import './App.css';
import {Typography,AppBar} from "@mui/material"
import VideoPlayer from './components/VideoPlayer';
import Options from './components/Options';
import Notifications from './components/Notifications';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App bg-[#030116] h-[100vh] w-[100vw]">
      <Navbar/>

      <VideoPlayer className="justify-center items-center p-10 ml-72"/>

      <Options>
        <Notifications/>
      </Options>
    </div>
  );
}

export default App;
