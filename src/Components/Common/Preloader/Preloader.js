import React from 'react'
import style from './Preloader.module.css'
import {Spin} from "antd";
import {Loading3QuartersOutlined} from "@ant-design/icons";


export default function Preloader() {
    return (
        <div className={style.preloader}>
            <div className={style.inner}>
                <Spin style={{transform: 'translateX(100%)'}}
                      indicator={<Loading3QuartersOutlined style={{fontSize: 54}} spin/>}/>
            </div>
        </div>
    )
}