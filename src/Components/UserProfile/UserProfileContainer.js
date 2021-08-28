import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import UserProfile from "./UserProfile";
import Preloader from "../Common/Preloader/Preloader";
import {getUserInfoSuccess, getUserStatusSuccess, savePhoto, updateStatus} from "../../Store/UserProfileReducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {getInfoAboutMe, getMyStatus} from "../../Store/AuthReducer";


const mapStateToProps = (state) => {
    return {
        isFetching: state.UserProfile.isFetching,
        isStatusFetching: state.UserProfile.isStatusFetching,
        currentUserInfo: state.UserProfile.currentUserInfo,
        userStatus: state.UserProfile.userStatus,
        myId: state.Auth.id,
        infoAboutMe: state.Auth.currentUserInfo,
        myStatus: state.Auth.userStatus
    }
}

function UserProfileContainer(props) {
    const [initialized, setInitialized] = useState(false)
    const [prevId, setPrevId] = useState(null)
    const id = props.match.params.userId || props.myId
    const [isAuthInfoChanged, setIsAuthInfoChanged] = useState(false)

    const updateStatusAndUpdateAuthState = (status) => {
        props.updateStatus(status)
        setIsAuthInfoChanged(true)
    }
    const savePhotoAndUpdateAuthState = (file) => {
        props.savePhoto(file)
        setIsAuthInfoChanged(true)
    }

    useEffect(() => {
        if (id === props.myId && isAuthInfoChanged) {
            props.getInfoAboutMe(props.myId)
                .then(() => {
                    props.getMyStatus(props.myId)
                })
                .then(() => {
                    if (!initialized)
                        setInitialized(true)

                    setIsAuthInfoChanged(false)
                })
        } else {
            if (id !== prevId) {
                setPrevId(id)
                props.getUserInfoSuccess(id)
                    .then(() => {
                        if (!initialized)
                            setInitialized(true)
                    })
                    .then(() => {
                        props.getUserStatusSuccess(id)
                    })
            }

        }
    }, [props])


    if (initialized)
        return <UserProfile user={props.currentUserInfo}
                            status={props.userStatus}
                            isOwner={id === props.myId}
                            savePhoto={id === props.myId && savePhotoAndUpdateAuthState}
                            updateStatus={id === props.myId && updateStatusAndUpdateAuthState}
                            isFetching={props.isFetching}
                            isStatusFetching={props.isStatusFetching}

        />
    else return <Preloader/>


}


export default compose(
    connect(mapStateToProps, {
        getUserInfoSuccess,
        getUserStatusSuccess,
        savePhoto,
        updateStatus,
        getInfoAboutMe,
        getMyStatus
    }),
    withRouter
)(UserProfileContainer)
