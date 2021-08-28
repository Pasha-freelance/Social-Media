import React from 'react'
import style from './Users.module.css'
import UserItem from "./UserItem/UserItem";
import {Button, Space, Typography} from 'antd'
import RedoOutlined from "@ant-design/icons/lib/icons/RedoOutlined";

export default function Users(props) {

    const users = props.users.map(user => {
        return <UserItem user={user}
                         follow={props.follow}
                         unfollow={props.unfollow}
                         disabledBtns={props.disabledBtns}
                         key={user.id}/>
    })


    return (
        <Space direction={'vertical'} align={'center'} style={{width:'100%',padding:'20px'}}>
            <Typography.Title level={2} style={{textAlign:'center'}}>Пользователи</Typography.Title>

            {props.end && <h4 className={style.end}>This is the end</h4>}

            {users}

            <Button
                disabled={props.isFetching}
                id='getMoreUsersBtn'
                onClick={props.getUsers}
                shape='round'
                type={props.isFetching ? 'ghost' : 'primary'}
                icon={<RedoOutlined />}
            >
                Показать еще
            </Button>
        </Space>
    )

}

