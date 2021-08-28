import React, {useState} from 'react'
import style from './goTopButton.module.css'
import {UpCircleOutlined} from '@ant-design/icons';
import {Button} from "antd";

export default function GoTopButton() {

    /**Checking if document was scrolled enough for showing the button*/
    const [scrolled, setScrolled] = useState(false)

    window.onscroll = () => {
        window.pageYOffset > 400
            ? setScrolled(true)
            : setScrolled(false)
    }


    function goTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <div className={`${style.btnWrap} ${scrolled ? style.visible : style.hidden}`}>
            <Button
                    onClick={goTop}
                    icon={<UpCircleOutlined style={{fontSize:'40px',}}/>}
                    style={{
                        background:'transparent',
                        border:'none',
                        width:'40px',
                        height:'40px'
                    }}
            />
        </div>
    )
}