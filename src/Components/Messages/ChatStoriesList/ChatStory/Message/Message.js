import React from 'react'
import style from "../../../Messages.module.css";
import PropTypes from 'prop-types'

export default function Message(props) {


    return (
        <div className={style.MessageWrap}>
            <div className={style.Message}>{props.messageText}</div>
        </div>
    )
}

Message.propTypes = {
    messageText: PropTypes.string.isRequired
}
