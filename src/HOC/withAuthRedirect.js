import React from 'react'
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToProps = (state) => {
    return {
        isAuth: state.Auth.isAuth,
    }
}

export default function withAuthRedirect(Component) {

    function RedirectComponent(props) {
        if(!props.isAuth) {
            return <Redirect to='/login'/>
        }
        else
            return <Component {...props}/>
    }
    return connect(mapStateToProps)(RedirectComponent)
}