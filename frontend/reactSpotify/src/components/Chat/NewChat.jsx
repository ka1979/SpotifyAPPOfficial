import { MainContainer, ChatContainer, MessageList, Message, MessageInput , Conversation,ConversationList, Sidebar, Search, ConversationHeader, AddUserButton, Button } from '@chatscope/chat-ui-kit-react';



const NewChat=()=>{
    // const fetchTeachers = async () => {
    //     try {
    //       const responseData = await fetchData("teachers");
    //       console.log(responseData);
    //       setTeachersLoaded(responseData);
    //     } catch (error) {
    //       console.error("Error fetching data:", error);
    //     }
    //   };
    return(


<MainContainer>

<form>


    <h1>Select a new user</h1>

    {/* <Select
              styles={customStyles}
              alignItem="center"
              id="state"
              name="states"
              options={Grades}
              value={selectedGrade}
              onChange={(event) => setSelectedGrade(event)}
              required
              menuPortalTarget={document.body}
            /> */}
    <button>Talk to this user</button>
</form>




</MainContainer>
    )
}

export default NewChat