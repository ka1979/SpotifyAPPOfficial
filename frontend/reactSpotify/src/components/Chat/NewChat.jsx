import { MainContainer, ChatContainer, MessageList, Message, MessageInput , Conversation,ConversationList, Sidebar, Search, ConversationHeader, AddUserButton, Button,ArrowButton } from '@chatscope/chat-ui-kit-react';

import axios from 'axios';
import { useState } from 'react';
import { AppStateContext } from "../../AppState";
import { useContext } from 'react';
import { useEffect } from 'react';
import Select from "react-select";
import { CardContent } from '@mui/material';
import NavigationBar from "../Navbar";
import { useNavigate } from 'react-router-dom';
const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'green',
      borderColor: 'white',
      fontWeight: 'bold',
    }),
    option: (provided, state) => ({
      ...provided,
      color: 'black',
      backgroundColor:  'white',
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'whitenpm', // Set the text color of the control item
      }),
  };
  
const NewChat=()=>{
    const { appState, setAppState } = useContext(AppStateContext);
    const[otherUsers, setOtherUsers]=useState(undefined)
    const [selectedUser, setSelectedUser] = useState(null);
    const Navigate=useNavigate()


    useEffect(()=>{
        const getUsers=async()=>{
            try {
            const res = await axios.get(`http://localhost:3000/database/all-users`);
            const emailAndName = res.data.map((element) => ({
                value: element.email,
                label: element.name
            }));
    
            const getUsersFiltered=emailAndName.filter((element)=>{
                return element.value!==GlobalEmail
            })
            setOtherUsers(getUsersFiltered)
           
            }catch(error){
                console.log(error)
            }
        }
    

            getUsers()
            
        
    },[])
    let GlobalEmail = appState.user;
    if (! appState.user){
        GlobalEmail= localStorage.getItem("email")
  
    }
   
    return(
<>
<NavigationBar/>
<MainContainer style={{ borderRadius:"5px",display:"block", marginTop:"100px", height:"80vh", width:"90vw", marginLeft:"2vw"}}>



<CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >   
<Button onClick={()=>{
    Navigate("/chat")
}}><i className="fa-solid fa-arrow-left fa-beat fa-2xl" style={{ marginTop:"2vh", marginRight:"90vw", color: "#4eacf4"}}></i></Button>
    <h1>Select a new user for chat</h1>

   
    
    {otherUsers !==undefined && <Select

             
             alignItem="center"
             id="state"
             name="states"
             options={otherUsers}
             styles={customStyles}
                
             value={selectedUser}
             onChange={(event) => setSelectedUser(event)}
             required
             menuPortalTarget={document.body}
           />}
           <button disabled={otherUsers ===undefined} style={{marginTop:"5vh"}} >Talk to this user</button>


</CardContent>

</MainContainer>
</>
    )
}

export default NewChat