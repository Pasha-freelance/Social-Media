import React, {useEffect, useState} from 'react'
import './App.css';
import 'antd/dist/antd.css'
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import LoginPageContainer from "./Components/LoginPage/LoginPageContainer";
import Preloader from "./Components/Common/Preloader/Preloader";
import {connect} from "react-redux";
import {authMe, getInfoAboutMe, getMyStatus} from "./Store/AuthReducer";
import {compose} from "redux";
import withSuspense from "./HOC/withSuspense";
import {Layout} from 'antd';
import NavigationBar from "./Components/NavBar/NavBar";
import HeaderContainer from "./Components/Header/HeaderContainer";
import GoTopButton from "./Components/Common/GoTopButton/GoTopButton";
import ConfigMyProfileContainer from "./Components/ConfigMyProfile/ConfigMyProfileContainer";


const {Content} = Layout;

const MessagesPageContainer = React.lazy(() => import ('./Components/Messages/MessagesPageContainer'))
const UsersContainer = React.lazy(() => import ('./Components/Users/UsersContainer'))
const UsersProfileContainer = React.lazy(() => import ("./Components/UserProfile/UserProfileContainer"))
const Error404 = React.lazy(() => import ("./Components/Common/ErrorsPages/Error404"))

function App(props) {
    /**Checking if the app was initialized and received all the information from the server*/
    const [initialized, setInitialized] = useState(false)
    useEffect(() => {
        props.authMe().then(() => {
            setInitialized(true)
        })
    }, [])

    useEffect(() => {
        if (props.myId !== null) {
            props.getInfoAboutMe(props.myId).then(() => {
                props.getMyStatus(props.myId)
            })
        }
    }, [props.myId])


    if (!initialized)
        return <Preloader/>
    else
        return (
            <Layout>
                <GoTopButton/>
                {
                    !props.isAuth
                        ? <Redirect to='/login'/>
                        : (props.location.pathname === '/' || props.location.pathname === '/social') &&
                        <Redirect to='/myProfile'/>
                }
                <HeaderContainer/>
                <Layout>

                    <NavigationBar/>

                    <Layout style={{padding: '0 24px 24px'}}>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: '5px 24px',
                                margin: 'auto',
                                minHeight: 380,
                                minWidth: '100%',
                            }}
                        >
                            <Switch>
                                <Route exact path='/login'><LoginPageContainer/></Route>
                                <Route path='/messages'>{withSuspense(MessagesPageContainer)}</Route>
                                <Route exact path='/users'> {withSuspense(UsersContainer)} </Route>
                                <Route exact path='/myProfile'>{withSuspense(UsersProfileContainer)}</Route>
                                <Route path='/users/profile/:userId'>{withSuspense(UsersProfileContainer)} </Route>
                                <Route path='*'>{withSuspense(Error404)}</Route>
                            </Switch>
                        </Content>
                        <ConfigMyProfileContainer id={props.myId}/>
                    </Layout>
                </Layout>
            </Layout>
        )
}


const mapStateToProps = (state) => {
    return {
        NavBarInfo: state.NavBar.NavBarInfo,
        isAuth: state.Auth.isAuth,
        myId: state.Auth.id
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, {authMe, getInfoAboutMe, getMyStatus}))
(App);
