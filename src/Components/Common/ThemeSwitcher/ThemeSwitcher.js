import React, {useState} from 'react'
import style from './ThemeSwitcher.module.css'

export default function ThemeSwitcher(props){
    const [checked,setChecked] = useState(false)

    function onChangeFn(){
        if(!checked){
            props.changeTheme('black')
            setChecked(true)
        }else{
            props.changeTheme('white')
            setChecked(false)
        }

    }

    return(
        <label className={style.switch} title={checked ? 'Switch on light mode' : 'Switch on dark mode'}>
            <input type="checkbox" checked={checked} onChange={onChangeFn} />
                <span className={`${style.slider} ${style.round}`}/>
        </label>
    )
}