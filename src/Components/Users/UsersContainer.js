import {connect} from "react-redux";
import {
    followUser,
    getUsers,
    unfollowUser
} from "../../Store/UsersReducer";
import React, {useEffect} from "react";
import Users from "./Users";
import Preloader from "../Common/Preloader/Preloader";


const mapStateToProps = (state) => {
    return {
        users: state.UsersPage.users,
        currentPage: state.UsersPage.currentPage,
        end: state.UsersPage.end,
        isFetching: state.UsersPage.isFetching,
        disabledBtns: state.UsersPage.disabledBtns
    }
}

function UsersComponent(props) {

    function getMoreUsers() {
        props.getUsers(props.currentPage, 5)
    }

    useEffect(() => {
        if (!props.users.length)
            getMoreUsers()
    }, [])


    return <>
        {props.isFetching && <Preloader/>}
        <Users users={props.users}
               follow={props.followUser}
               unfollow={props.unfollowUser}
               getUsers={getMoreUsers}
               isFetching={props.isFetching}
               disabledBtns={props.disabledBtns}
               end={props.end}/>
    </>
}

export default connect(mapStateToProps,
    {followUser, unfollowUser, getUsers})(UsersComponent)

