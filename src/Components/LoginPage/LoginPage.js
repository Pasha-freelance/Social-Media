import React from 'react'
import style from './LoginPage.module.css'
import LoginForm from "./LoginForm";
import BigLogo from "../Common/BigLogo/BigLogo";

export default function LoginPage(props) {
    return (
        <section className={style.LoginPage}>
            <div className={style.LoginInner}>
                <BigLogo isAuth={props.isFetching}/>
            </div>
            <div className={style.LoginInnerForm}>
                <LoginForm {...props}/>
            </div>
        </section>
    )
}



