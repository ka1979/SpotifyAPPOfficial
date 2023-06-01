

import { MainContainer, ChatContainer, MessageList, Message, MessageInput , Conversation,ConversationList, Sidebar, Search, ConversationHeader } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import { useState } from 'react';
const Chat=()=>{
    const [conversation, setConversation] = useState([]);

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
return(

    <MainContainer style={{width:"40rem", height:"40rem"}}>

    <Sidebar position="left" scrollable={true}>
    <Search placeholder="Search..." />
    <ConversationList>                                                     
    
      {
        messages.map((element)=>{
return(
  <Conversation name={element.user.userName} { ...getInfoAndLastSender(element.messages[element.messages.length-1])}  onClick={() => setConversation(element.user.userName) } active={conversation===element.user.userName}/>
)
        })
      }
     
                                                                  
    </ConversationList>
  </Sidebar>
  <ChatContainer>
  {conversation!==[] &&<ConversationHeader>
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
  </ChatContainer>
</MainContainer>
)


    
}


export default Chat

