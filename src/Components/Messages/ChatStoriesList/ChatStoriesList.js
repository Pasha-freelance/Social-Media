import React, {useEffect, useState} from 'react'
import {Route} from "react-router-dom";
import ChatStory from "./ChatStory/ChatStory";
import SendMessageForm from "./SendMessageForm/SendMessageForm";
import PropTypes from 'prop-types'

/***List of chat stories which shows current chat story for current nickname depending on URL*/
export default function ChatStoriesList(props) {

    return (
        <>
            {
                props.Messages.map((chat, i) => {
                    return (
                        <Route path={`/messages/${chat.nickname.toLowerCase()}/${chat.id}`} key={i}>
                            <ChatStory chat={chat}/>
                            <SendMessageForm sendMessage={props.sendMessage}
                                             changeMessageText={props.changeMessageText}/>
                        </Route>
                    )
                })
            }
        </>
    )
}

ChatStoriesList.propTypes = {
    chat: PropTypes.exact({
        nickname: PropTypes.string.isRequired,
        chatStory: PropTypes.arrayOf(PropTypes.string).isRequired,
        id: PropTypes.number.isRequired
    }),
    sendMessage: PropTypes.func.isRequired,
    changeMessageText: PropTypes.func.isRequired
}