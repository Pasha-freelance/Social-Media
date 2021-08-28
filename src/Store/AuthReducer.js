import {authApi, profileApi, usersApi, userStatusApi} from "../Api/Api";

const SET_USER_DATA = 'Auth/SET_USER_DATA'
const IS_FETCHING = 'Auth/IS_FETCHING'
const SET_IS_LOGIN_DATA_CORRECT = 'Auth/SET_IS_LOGIN_DATA_CORRECT'
const SET_CURR_USER_INFO = 'Auth/SET_CURR_USER_INFO'
const SET_USER_STATUS = 'Auth/SET_USER_STATUS'
const SET_CONFIGURABLE_MODE = 'Auth/SET_CONFIGURABLE_MODE'


const initialState = {
    login: '',
    email: '',
    id: null,
    isAuth: false,
    isFetching: false,
    isLoginDataCorrect: true,
    currentUserInfo: null,
    userStatus: null,
    isInConfigurableMode:false
}

export default function AuthReducer(state = initialState, action) {

    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: action.isAuth
            }
        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.value
            }
        case SET_IS_LOGIN_DATA_CORRECT:
            return {
                ...state,
                isLoginDataCorrect: action.value
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
        case SET_CONFIGURABLE_MODE:
            return{
                ...state,
                isInConfigurableMode: action.value
            }
        default :
            return state
    }
}
//Action creators
export const setAuthData = (data, isAuth) => ({type: SET_USER_DATA, data, isAuth})
export const setIsFetchingFlag = (value) => ({type: IS_FETCHING, value})
export const setConfigurableMode = (value) => ({type: SET_CONFIGURABLE_MODE, value})
export const setIsLoginDataCorrect = (value) => ({type: SET_IS_LOGIN_DATA_CORRECT, value})
export const setCurrentUserInfo = (info) => ({type: SET_CURR_USER_INFO, info})
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status})
//Thunks

export const authMe = () => async dispatch => {
    dispatch(setIsFetchingFlag(true))
    const data = await authApi.me()
    data.resultCode === 0 && dispatch(setAuthData(data.data, true))
    dispatch(setIsFetchingFlag(false))
}

export const getInfoAboutMe = (myId) => async dispatch => {
   // dispatch(setIsFetchingFlag(true))
    let data = await usersApi.getUserInfo(myId)

    dispatch(setCurrentUserInfo(data))

   // dispatch(setIsFetchingFlag(false))
}

export const getMyStatus = myId => async dispatch => {
   // dispatch(setIsFetchingFlag(true))

    let data = await userStatusApi.getUserStatus(myId)
    dispatch(setUserStatus(data))

    //dispatch(setIsFetchingFlag(false))
}

export const signIn = (email, password, rememberMe) => async dispatch => {
    dispatch(setIsFetchingFlag(true))
    const {resultCode} = await authApi.signIn(email, password, rememberMe)

    switch (resultCode) {
        case 0 :
            dispatch(authMe())
            dispatch(setIsLoginDataCorrect(true))
            break
        case 1 :
            dispatch(setIsLoginDataCorrect(false))
            break
        case 10 :
            //get captcha
            dispatch(setIsLoginDataCorrect(false))
            break
        default :
            dispatch(setIsLoginDataCorrect(false))
    }
    dispatch(setIsFetchingFlag(false))
}
export const signOut = () => async dispatch => {
    dispatch(setIsFetchingFlag(true))
    const {resultCode} = await authApi.signOut()
    resultCode === 0 && dispatch(setAuthData(null, false))

    dispatch(setIsFetchingFlag(false))
}
export const updateUserInfo = (info) => async dispatch => {
    dispatch(setIsFetchingFlag(true))
    const {resultCode} = await profileApi.updateProfileInfo(info)
    resultCode === 0 && dispatch(setCurrentUserInfo(info))
    dispatch(setIsFetchingFlag(false))
}


