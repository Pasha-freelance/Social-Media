import React, {useState} from 'react'
import {useLocation} from 'react-router-dom'
import style from './SendMessageForm.module.css'

function SendMessageForm(props) {
    let [val, setVal] = useState('')
    let location = useLocation();

    function onSendMessage(e) {
        e.preventDefault()
        //get the companion id
        let id = location.pathname.split('/')
        id = +id[id.length - 1]

        props.sendMessage(id)
        setVal('')
    }

    function onChangeFn(text) {
        setVal(text)
        props.changeMessageText(text)
    }

    return (
        <form action="" onSubmit={onSendMessage} className={style.form}>
            <input type='text' className={style.textarea} value={val} onChange={(e) => {
                onChangeFn(e.target.value)
            }}/>
            <button className={style.sendBtn}><img src="https://image.flaticon.com/icons/png/512/60/60525.png" alt="sendBtn"/></button>
        </form>
    )
}

export default SendMessageForm