import React from 'react'
import {NavLink} from "react-router-dom";
import style from "../Messages.module.css";
import PropTypes from 'prop-types'

/****List of nicknames which are NavLinks for chat stories*/
export default function NickNamesList(props) {
    return (
        <>
            {
                props.Messages.map((chat, i) => {
                    return (
                        <NavLink to={`/messages/${chat.nickname.toLowerCase()}/${chat.id}`} // path===current person
                                 className={style.NameLink}
                                 key={i}
                                 activeClassName={style.active}>{chat.nickname}</NavLink>
                    )
                })
            }
        </>
    )
}

NickNamesList.propTypes = {
    Messages: PropTypes.arrayOf(PropTypes.exact({
        nickname: PropTypes.string.isRequired,
        chatStory: PropTypes.arrayOf(PropTypes.string).isRequired,
        id: PropTypes.number.isRequired
    })).isRequired
}