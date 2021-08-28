import React from 'react'
import style from "../../Messages.module.css";
import PropTypes from 'prop-types'
import Message from "./Message/Message";

function ChatStory(props) {


    /**Parsing all messages from chat story with current person*/
    const chatStory = props.chat.chatStory.map((msg, i) => {
        return (
           <Message messageText={msg} key={i}/>
        )
    })

    return (
        <div className={style.ChatWithPerson}>
            {chatStory}
        </div>
    )
}

ChatStory.propTypes = {
    chat: PropTypes.exact({
        nickname: PropTypes.string.isRequired,
        chatStory: PropTypes.arrayOf(PropTypes.string).isRequired,
        id: PropTypes.number.isRequired
    })
}
export default ChatStory