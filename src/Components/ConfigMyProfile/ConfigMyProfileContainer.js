import React, {useEffect, useState} from 'react';
import ConfigMyProfile from "./ConfigMyProfile";
import {connect} from "react-redux";
import {getInfoAboutMe, setConfigurableMode, updateUserInfo} from "../../Store/AuthReducer";
import Preloader from "../Common/Preloader/Preloader";
import {getUserInfoSuccess} from "../../Store/UserProfileReducer";

const mapStateToProps = state => {
    return {
        isInConfigurableMode: state.Auth.isInConfigurableMode,
        isFetching: state.Auth.isFetching,
        nickname: state.Auth.currentUserInfo?.fullName,
        lookingForAJob: state.Auth.currentUserInfo?.lookingForAJob,
        lookingForAJobDescription: state.Auth.currentUserInfo?.lookingForAJobDescription,
        contacts: state.Auth.currentUserInfo?.contacts,
    }
}

const ConfigMyProfileContainer = props => {
    const [info, setInfo] = useState({})
    const addItemToInfo = (key, value) => {
        setInfo((prevState) => {
            return {
                ...prevState,
                [key]: value
            }
        })
    }
    useEffect(() => {
        if (Object.keys(info).length !== 0) {
            props.updateUserInfo(info)
            props.setConfigurableMode(false)
            props.getInfoAboutMe(props.id)
            props.getUserInfoSuccess(props.id)
        }
    }, [info])

    if (props.isInConfigurableMode) return <ConfigMyProfile {...props} addItemToInfo={addItemToInfo}/>
    if (props.isFetching) return <Preloader/>
    return <></>
};
export default connect(mapStateToProps, {
    setConfigurableMode,
    updateUserInfo,
    getInfoAboutMe,
    getUserInfoSuccess
})(ConfigMyProfileContainer)