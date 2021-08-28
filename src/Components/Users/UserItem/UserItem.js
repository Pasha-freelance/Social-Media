import React from 'react'
import noPhoto from '../../../Images/noUserPhoto.png'
import {NavLink} from "react-router-dom";
import {Avatar, Button, Card, Row, Tooltip, Typography} from "antd";
import UserDeleteOutlined from "@ant-design/icons/lib/icons/UserDeleteOutlined";
import UserAddOutlined from "@ant-design/icons/lib/icons/UserAddOutlined";


export default function UserItem(props) {

    function isDisabled(userId) {
        return props.disabledBtns.includes(userId)
    }

    function onFollowBtn() {
        props.user.followed
            ? props.unfollow(props.user.id)
            : props.follow(props.user.id)
    }

    return (
        <Card style={{width: '500px',background:'transparent'}}>
            <Row justify={'center'}>
                <Tooltip title='Перейти к профилю' arrowPointAtCenter={true}>
                    <NavLink to={`/users/profile/${props.user.id}`}>
                        <Avatar size={50}
                                src={props.user.photos.small ?? noPhoto}/>
                    </NavLink>
                </Tooltip>
            </Row>
            <Row justify={'center'}>
                <Typography.Title level={5} style={{margin: 0}}>{props.user.name}</Typography.Title>
            </Row>
            <Row justify={'center'}>
                <Button type={props.user.followed ? "ghost" : "primary"}
                        disabled={isDisabled(props.user.id)}
                        size={'small'}
                        id={props.user.id}
                        onClick={onFollowBtn}
                        icon={props.user.followed ? <UserDeleteOutlined />:<UserAddOutlined />}
                >
                    {
                        props.user.followed ? 'Отписаться' : 'Подписаться'
                    }
                </Button>
            </Row>
        </Card>
    )
}