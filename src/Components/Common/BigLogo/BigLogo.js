import React from 'react'
import style from './BigLogo.module.css'
import plane from "../../../Images/plane.png";



export default function BigLogo() {
    return (
        <div className={style.wrapper}>
            <div className={style.LogoWrap}>
                <img src={plane} alt="Logo"/>
            </div>
            <h2 className={style.logoText}>Touch On</h2>
        </div>
    )
}