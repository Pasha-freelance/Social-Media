import {usersApi} from "../Api/Api";
import {changeObjectInArray} from "../Helpers/object-helpers";

const FOLLOW = 'Users/FOLLOW'
const UNFOLLOW = 'Users/UNFOLLOW'
const SET_USERS = 'Users/SET_USERS'
const SET_END = 'Users/SET_END'
const IS_FETCHING = 'Users/IS_FETCHING'
const SET_DISABLED_BTN = 'Users/SET_DISABLED_BTN'
const SET_ENABLED_BTN = 'Users/SET_ENABLED_BTN'


const initialState = {
    users: [],
    currentPage: 1,
    end: false,
    isFetching: false,
    disabledBtns: []
}

export default function UsersReducer(state = initialState, action) {

    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: changeObjectInArray(state.users,'id',action.userId,{followed:true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: changeObjectInArray(state.users,'id',action.userId,{followed:false})
            }
        case SET_USERS:
            const newUsers = action.users.map(item => {//making a copy of users list
                return {...item}
            })
            return {...state, users: [...state.users, ...newUsers], currentPage: state.currentPage + 1}

        case SET_END:
            return {
                ...state,
                end: true
            }
        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.value
            }
        case SET_DISABLED_BTN:
            return {
                ...state,
                disabledBtns: [...state.disabledBtns, action.id]
            }
        case SET_ENABLED_BTN:
            return {
                ...state,
                disabledBtns: state.disabledBtns.filter(item => item !== action.id)
            }
        default :
            return state
    }
}
//Action creators
export const follow = (userId) => ({type: FOLLOW, userId})
export const unfollow = (userId) => ({type: UNFOLLOW, userId})
export const setUsers = (users) => ({type: SET_USERS, users})
export const setEndOfUsers = () => ({type: SET_END})
export const setIsFetchingFlag = (value) => ({type: IS_FETCHING, value})
export const setDisabledBtn = (id) => ({type: SET_DISABLED_BTN, id})
export const setEnabledBtn = (id) => ({type: SET_ENABLED_BTN, id})
//Thunks

export const getUsers = (currentPage, usersAmount) => async dispatch => {

    dispatch(setIsFetchingFlag(true))
    const data = await usersApi.getUsers(currentPage, usersAmount)

    data.endOfUsers
        ? dispatch(setEndOfUsers())
        : dispatch(setUsers(data.items))

    dispatch(setIsFetchingFlag(false))
}

const followUnfollowUserFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(setDisabledBtn(userId))
    const {resultCode} = await apiMethod(userId)
    resultCode === 0 && dispatch(actionCreator(userId))
    dispatch(setEnabledBtn(userId))
}
export const followUser = userId => dispatch => {
    followUnfollowUserFlow(dispatch, userId, usersApi.followUser.bind(usersApi), follow)
}
export const unfollowUser = userId => dispatch => {
    followUnfollowUserFlow(dispatch, userId, usersApi.unfollowUser.bind(usersApi), unfollow)
}
