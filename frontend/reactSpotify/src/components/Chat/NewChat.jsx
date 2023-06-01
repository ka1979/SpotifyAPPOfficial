import { MainContainer, ChatContainer, MessageList, Message, MessageInput , Conversation,ConversationList, Sidebar, Search, ConversationHeader, AddUserButton, Button } from '@chatscope/chat-ui-kit-react';

import axios from 'axios';
import { useState } from 'react';
import { AppStateContext } from "../../AppState";
import { useContext } from 'react';
import Select from "react-select";
import { CardContent } from '@mui/material';
import NavigationBar from "../Navbar";

const NewChat=()=>{
    const { appState, setAppState } = useContext(AppStateContext);
    const[otherUsers, setOtherUsers]=useState(undefined)
    const [selectedUser, setSelectedUser] = useState(null);

    let GlobalEmail = appState.user;
    if (! appState.user){
        GlobalEmail= localStorage.getItem("email")
  
    }
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
    return(
<>
<NavigationBar/>
<MainContainer style={{display:"block", marginTop:"100px"}}>



<CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              justifyContent: "center",
            }}
          >   
    <h1>Select a new user for chat</h1>

   
    
    {otherUsers !==undefined && <Select
             
             alignItem="center"
             id="state"
             name="states"
             options={otherUsers}
             value={selectedUser}
             onChange={(event) => setSelectedUser(event)}
             required
             menuPortalTarget={document.body}
           />}
           <button onClick={getUsers}>Talk to this user</button>


</CardContent>

</MainContainer>
</>
    )
}

export default NewChat