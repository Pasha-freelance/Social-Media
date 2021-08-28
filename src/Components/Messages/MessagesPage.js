import React from 'react'
import style from './Messages.module.css'
import ChatStoriesList from "./ChatStoriesList/ChatStoriesList";
import NickNamesList from "./NickNamesList/NickNamesList";

function MessagesPage(props) {

    return (
        <section className={style.Messages}>
            <div className={style.NickNames}>
                {/****List of nicknames which are NavLinks for chat stories*/}
                <NickNamesList Messages={props.Messages}/>
            </div>
            <div className={style.DialogWindow}>
                {/***List of chat stories which shows current chat story for current nickname depending on URL*/}
                <ChatStoriesList Messages={props.Messages}
                                 sendMessage={props.sendMessage}
                                 changeMessageText={props.changeMessageText}/>
            </div>
        </section>
    )
}

export default MessagesPage