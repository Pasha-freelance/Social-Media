import UserProfileReducer, {setCurrentUserInfo, setIsFetchingFlag, setUserStatus} from "./UserProfileReducer";

const state = {
    isFetching: false,
    currentUserInfo: null,
    userStatus: null
}
test('isFetching flag should become true', () => {

    const action = setIsFetchingFlag(true)
    const newState = UserProfileReducer(state, action)
    expect(newState.isFetching).toBe(true)
})
test('currentUserInfo must contain the object with info about user', () => {

    const userInfo = {
        name: 'John',
        age: 21,
        job: 'Front-end'
    }
    const action = setCurrentUserInfo(userInfo)
    const newState = UserProfileReducer(state, action)

    expect(newState.currentUserInfo).toEqual({
        name: 'John',
        age: 21,
        job: 'Front-end'
    })
})
test('userStatus must be status', () => {

    const status = 'Status'
    const action = setUserStatus(status)
    const newState = UserProfileReducer(state, action)
    expect(newState.userStatus).toEqual(status)
})