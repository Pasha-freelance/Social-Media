import {profileApi, usersApi, userStatusApi} from "../Api/Api";

const IS_FETCHING = 'UserProfile/IS_FETCHING'
const IS_STATUS_FETCHING = 'UserProfile/IS_STATUS_FETCHING'
const SET_CURR_USER_INFO = 'UserProfile/SET_CURR_USER_INFO'
const SET_USER_STATUS = 'UserProfile/SET_USER_STATUS'
const SET_NEW_PHOTO = 'UserProfile/SET_NEW_PHOTO'


const initialState = {
    isFetching: false,
    isStatusFetching: false,
    currentUserInfo: null,
    userStatus: null,
}

export default function UserProfileReducer(state = initialState, action) {

    switch (action.type) {
        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.value
            }
        case IS_STATUS_FETCHING:
            return {
                ...state,
                isStatusFetching: action.value
            }
        case SET_CURR_USER_INFO:
            return {
                ...state,
                currentUserInfo: {...action.info}
            }
        case SET_USER_STATUS:
            return {
                ...state,
                userStatus: action.status
            }
        case SET_NEW_PHOTO:
            return {
                ...state,
                currentUserInfo: {
                    ...state.currentUserInfo,
                    photos: {...action.photos}
                }
            }

        default :
            return state
    }
}


//Action creators
export const setIsFetchingFlag = (value) => ({type: IS_FETCHING, value})
export const setIsStatusFetchingFlag = (value) => ({type: IS_STATUS_FETCHING, value})
export const setCurrentUserInfo = (info) => ({type: SET_CURR_USER_INFO, info})
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status})
export const setNewPhotos = photos => ({type: SET_NEW_PHOTO, photos})

//Thunks

export const getUserInfoSuccess = userId => async dispatch => {
    dispatch(setIsFetchingFlag(true))

    let data = await usersApi.getUserInfo(userId)
    dispatch(setCurrentUserInfo(data))

    dispatch(setIsFetchingFlag(false))
}
export const getUserStatusSuccess = userId => async dispatch => {
    dispatch(setIsStatusFetchingFlag(true))

    let data = await userStatusApi.getUserStatus(userId)
    dispatch(setUserStatus(data))

    dispatch(setIsStatusFetchingFlag(false))
}

export const updateStatus = status => async dispatch => {
    dispatch(setIsStatusFetchingFlag(true))

    await userStatusApi.setMyStatus(status)
    dispatch(setUserStatus(status))
    dispatch(setIsStatusFetchingFlag(false))

}

export const savePhoto = file => async dispatch => {
    dispatch(setIsFetchingFlag(true))

    const newPhotos = await profileApi.savePhoto(file)
    dispatch(setNewPhotos(newPhotos))
    dispatch(setIsFetchingFlag(false))

}