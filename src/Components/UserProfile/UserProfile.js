import React from 'react'
import UserInfo from "./UserInfo/UserInfo";
import ProfileStatus from "./ProfileStatus/ProfileStatus";


export default function UserProfile(props) {
    return (
        <section>
            <UserInfo UserInfo={props.user}
                      isOwner={props.isOwner}
                      savePhoto={props.savePhoto}
                      isFetching={props.isFetching}
                      isStatusFetching={props.isStatusFetching}
                      status={props.status}
                      updateStatus={props.updateStatus}
            />
        </section>
    )
}