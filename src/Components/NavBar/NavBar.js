import {Layout, Menu} from "antd";
import {Link, withRouter} from "react-router-dom";
import React from "react";
import {UserOutlined, TeamOutlined} from '@ant-design/icons';

const {SubMenu} = Menu;
const {Sider} = Layout;


function NavigationBar(props) {
    const defineCurrentOpenedItem = () => {
        const path = props.location.pathname
        switch (path) {
            case '/myProfile':
                return '1'
            case '/messages':
                return '2'
            case '/users':
                return '3'
            default:
                return '1'
        }
    }
    const defaultSelectedKey = defineCurrentOpenedItem()
    return (
        <Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"
                defaultSelectedKeys={defaultSelectedKey}
                defaultOpenKeys={['Profile']}
                style={{height: '100%', borderRight: 0}}
            >
                <SubMenu key="Profile" icon={<UserOutlined/>} title="Profile">
                    <Menu.Item key="1"><Link to={'/myProfile'}>My profile</Link></Menu.Item>
                    <Menu.Item key="2"><Link to={'/messages'}>Messages</Link></Menu.Item>
                </SubMenu>
                <Menu.Item icon={<TeamOutlined/>} key="3"><Link to={'/users'}>Users</Link></Menu.Item>
            </Menu>
        </Sider>
    )
}

export default withRouter(NavigationBar)