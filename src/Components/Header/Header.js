import React from 'react'
import {Avatar, Button, Col, Dropdown, Layout, Menu, Row, Tooltip} from "antd";
import plane from '../../Images/plane.png'
import {LogoutOutlined} from '@ant-design/icons';
import style from './Header.module.css'
import Preloader from "../Common/Preloader/Preloader";
import ToolFilled from "@ant-design/icons/lib/icons/ToolFilled";


export default function HeaderComponent(props) {
    const {Header} = Layout;
    const menu = () => (
        <Menu>
            <Menu.Item>
                <Button
                    icon={<ToolFilled />}
                    onClick={props.setConfigurableMode.bind(null,true)}
                >Change profile</Button>
            </Menu.Item>

        </Menu>
    );
    return (
        <>
            {
                props.isFetching && <Preloader/>
            }
            <Header className="header">
                <Row>
                    <Col span={22}>
                        <div className={style.logo}>
                            <img src={plane} className={style.imageLogo} alt="Logo"/>
                        </div>
                    </Col>
                    <Col span={1}>
                        <Dropdown overlay={menu}
                                  placement={'bottomCenter'}
                                  trigger={'hover'}
                        >
                            <Avatar src={props?.infoAboutMe?.photos?.small}
                                    alt='Avatar'
                                    className={style.avatar}
                            />
                        </Dropdown>
                    </Col>
                    <Col span={1}>
                        <Tooltip title={"Log out"}>
                            <Button
                                icon={<LogoutOutlined style={{color: 'white', fontSize: '20px'}}
                                                      rotate={'-90'}/>}
                                onClick={props.signOut}
                                style={{background: 'transparent', border: 'none', marginLeft: '40px'}}
                            />
                        </Tooltip>
                    </Col>
                </Row>
            </Header>
        </>
    )
}

