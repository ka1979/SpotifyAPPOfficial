import { MainContainer, ChatContainer, MessageList, Message, MessageInput , Conversation,ConversationList, Sidebar, Search, ConversationHeader, AddUserButton, Button,ArrowButton } from '@chatscope/chat-ui-kit-react';

import axios from 'axios';
import { useState } from 'react';
import { AppStateContext } from "../../AppState";
import { useContext } from 'react';
import { useEffect } from 'react';
import Select from "react-select";
import { CardContent } from '@mui/material';
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
  
const NewChat=(props)=>{

    const { appState, setAppState } = useContext(AppStateContext);
    const[otherUsers, setOtherUsers]=useState(undefined)
    const [selectedUser, setSelectedUser] = useState(null);

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

    const getNewUser=(event)=>{
        event.preventDefault()
    const { value, label } = selectedUser

    localStorage.setItem("newUSERNAME", label)
    localStorage.setItem("newUSEREmail", value)


    props.onSubmit()

    }
   
    return(
<>




<CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >   
<Button onClick={()=>{
    props.goBack()
}}><i className="fa-solid fa-arrow-left fa-beat fa-2xl" style={{ marginTop:"2vh", marginRight:"90vw", color: "#4eacf4"}}></i></Button>
    <h1>Select a new user for chat</h1>

   <form onSubmit={getNewUser}>
    
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
           <button type="submit" disabled={otherUsers ===undefined} style={{marginTop:"5vh", color:"white"}} >Talk to this user</button>
           </form>

</CardContent>


</>
    )
}

export default NewChat