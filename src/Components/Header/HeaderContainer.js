import {connect} from "react-redux";
import React from "react";
import Header from "./Header";
import {authMe, setConfigurableMode, signOut} from "../../Store/AuthReducer";


const mapStateToProps = state => {
    return {
        isFetching: state.Auth.isFetching,
        infoAboutMe:state.Auth.currentUserInfo
    }
}

function HeaderContainer(props) {

    return <Header {...props}/>
}

export default connect(mapStateToProps, {authMe,signOut,setConfigurableMode})(HeaderContainer)

