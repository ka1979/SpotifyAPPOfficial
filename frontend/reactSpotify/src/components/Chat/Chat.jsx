

import { MainContainer, ChatContainer, MessageList, Message, MessageInput , Conversation,ConversationList, Sidebar, Search, ConversationHeader, AddUserButton } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { CardContent } from '@mui/material';
import { useState } from 'react';
import NavigationBar from "../Navbar";
import NewChat from './NewChat';
import { useContext } from 'react';
import { AppStateContext } from "../../AppState";
import useMediaQuery from "@mui/material/useMediaQuery";
import axios from 'axios';
const Chat=()=>{
  const isMobile = useMediaQuery('(max-width: 768px)');

  const { appState, setAppState } = useContext(AppStateContext);
  let email = appState.user;
  if (!appState.user) {
    email = localStorage.getItem("email");
  }
  const [isNewperson, setIsNewPerson]=useState(false)
    const [conversation, setConversation] = useState(undefined);
    const [messages, setMessages]=useState([
      {
        user:{name:"jim@gmail.com", userName:"Joe"},
        messages:[
          {
            message:"what up",
            sender:"jim@gmail.com",
            position:"single"

          },
          {
            message:"not much tbh",
            sender:"murrah@email.com",
            position:"single"

          }
        ]
      },
      {
        user:{name:"jimdffadsfasdfasdfaf@gmail.com", userName:"Lilly"},
        messages:[
          {
            message:"how are you",
            sender:"murrah@email.com",
            position:"single"

          },
          {
            message:".....",
            sender:"jimdffadsfasdfasdfaf@gmail.com",
            position:"single"

          }
        ]
      }
    ])
  
   
    const [messageInputValue, setMessageInputValue] = useState("");
    let indexOFMESSAGEFORUSER=messages.findIndex((element)=>{
      return element.user.userName===conversation
    })
         const userName="murrah@email.com"

    const updateMessage=()=>{
      const getMsg=messageInputValue
      const newMessagePage=[...messages[indexOFMESSAGEFORUSER].messages]
      newMessagePage.push({
        message:getMsg,
        sender:userName,
        position:"single"
      })
      const updatedValue={ ...messages[indexOFMESSAGEFORUSER], messages: newMessagePage };
      const newArray = [...messages];
      newArray[indexOFMESSAGEFORUSER] = updatedValue;
      setMessages(newArray);
      setMessageInputValue("")
    }


    const getInfoAndLastSender=(element)=>{


       

      const index=messages.findIndex((object)=>{
        console.log(element.sender)
        console.log(object.user.name)
        return element.sender===object.user.name
        
      })
     
      return {
        lastSenderName: index===-1?"YOU":messages[index].user.userName,
        info:element.message
      }
    }


    const CheckIfanyMessages=(messages)=>{
      if (messages.length===0){
        return{

        }
      }else{
       return  getInfoAndLastSender(messages[messages.length-1])
      }
    }


const newUserSelected=()=>{
const newMessages=[...messages]

console.log()
newMessages.unshift(
  {user:{name:localStorage.getItem("newUSEREmail"),userName:localStorage.getItem("newUSERNAME")}
  ,messages:[]}
  
  
  )
setMessages(newMessages)
  setIsNewPerson(false)
  
  setConversation(localStorage.getItem("newUSERNAME"))



}







return(
  <>
<NavigationBar page="chat"/>
    <MainContainer style={{ display:isNewperson?"block":"", borderRadius:"5px", marginTop:"100px", height:"80vh", width:"90vw", marginLeft:"-3vw"}}>







{!isNewperson? <>
<Sidebar position="left" scrollable={true}>
{isMobile &&  <AddUserButton onClick={()=>{
            setIsNewPerson(true)
          }} />

          }
    <CardContent
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >    <Search placeholder="Search..." />
          
          {!isMobile &&  <AddUserButton onClick={()=>{
            setIsNewPerson(true)
          }} />

          }
          
        

       </CardContent>
   
    <ConversationList>                                                     
    
      {
        messages.map((element)=>{
return(
  <Conversation key={element.user.userName}  name={element.user.userName} { ...CheckIfanyMessages(element.messages)}  onClick={() => setConversation(element.user.userName) } active={conversation===element.user.userName}/>
)
        })
      }
     
                                                                  
    </ConversationList>
  </Sidebar>
  <ChatContainer>
  {conversation!==undefined &&<ConversationHeader>
            <ConversationHeader.Content>
              <span style={{
      color: "#36342f",
      alignSelf: "flex-center"
    }}>{conversation}</span>
            </ConversationHeader.Content>
        </ConversationHeader>}
  <MessageList>
    {indexOFMESSAGEFORUSER>=0 && messages[indexOFMESSAGEFORUSER].messages.map((element)=>{
         return(  <Message  model={{
            message: element.message,
            sentTime: "15 mins ago",
            sender: element.sender,
            direction: userName!==element.sender?"incoming":"outgoing",
            position: "single"
          }}></Message>)
    })}
  </MessageList>
  
  {indexOFMESSAGEFORUSER>=0 && <MessageInput placeholder="Type message here" value={messageInputValue} onChange={val => setMessageInputValue(val)} onSend={updateMessage} />}
  </ChatContainer></>:<NewChat goBack={()=>{
     setIsNewPerson(false)
  }} messages={messages} onSubmit={newUserSelected}/>

}





</MainContainer>
</>
)


    
}


export default Chat

