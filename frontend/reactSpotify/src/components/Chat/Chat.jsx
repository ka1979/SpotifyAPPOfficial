

import { MainContainer, ChatContainer, MessageList, Message, MessageInput , Conversation,ConversationList, Sidebar, Search } from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import { useState } from 'react';
const Chat=()=>{
    const [conversation, setConversation] = useState([]);
    const [messageInputValue, setMessageInputValue] = useState("");

return(
    <MainContainer style={{width:"40rem", height:"40rem"}}>

    <Sidebar position="left" scrollable={true}>
    <Search placeholder="Search..." />
    <ConversationList>                                                     
      <Conversation name="Lilly" lastSenderName="Lilly" info="Yes i can do it for you" onClick={() => setConversation('Lilly')} active={conversation==='Lilly'}>
      </Conversation>
      
      <Conversation name="Joe" lastSenderName="Joe" info="Yes i can do it for you"  onClick={() => setConversation('Joe')} active={conversation==='Joe'}>
      </Conversation>
      
     
                                                                  
    </ConversationList>
  </Sidebar>

    

</MainContainer>
)


    
}


export default Chat

