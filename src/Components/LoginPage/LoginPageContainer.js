import {connect} from "react-redux";
import React from "react";
import LoginPage from "./LoginPage";
import {signIn} from "../../Store/AuthReducer";
import {Redirect, withRouter} from "react-router-dom";
import {compose} from "redux";
import Preloader from "../Common/Preloader/Preloader";


const mapStateToProps = (state) => {
    return {
        isLoginDataCorrect: state.Auth.isLoginDataCorrect,
        isAuth: state.Auth.isAuth,
        isFetching: state.Auth.isFetching,
    }
}

function LoginContainer(props) {
    if (props.isAuth) return <Redirect to={'/myProfile'}/>
    return <>
        {props.isFetching && <Preloader/>}
        <LoginPage {...props}/>
    </>
}

export default compose(
    withRouter,
    connect(mapStateToProps, {signIn}))
(LoginContainer)
