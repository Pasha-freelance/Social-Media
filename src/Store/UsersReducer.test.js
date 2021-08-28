import UsersReducer, {
    follow,
    setDisabledBtn, setEnabledBtn,
    setEndOfUsers,
    setIsFetchingFlag,
    setUsers,
    unfollow
} from "./UsersReducer";

const state = {
    users: [
        {id: 0, followed: false},
        {id: 1, followed: true},
        {id: 2, followed: false},
        {id: 3, followed: true},
    ],
    currentPage: 1,
    end: false,
    isFetching: false,
    disabledBtns: []
}

test('follow status of user must be true', () => {
    const userId = 1
    const action = follow(userId)
    const newState = UsersReducer(state,action)
    expect(newState.users[userId].followed).toBe(true)
});

test('follow status of user must be false', () => {
    const userId = 2
    const action = unfollow(userId)
    const newState = UsersReducer(state,action)
    expect(newState.users[userId].followed).toBe(false)
});

test('length of list of users must be 7', () => {
    const newUsers = [
        {id: 5, followed: false},
        {id: 6, followed: true},
        {id: 7, followed: false}
    ]
    const action = setUsers(newUsers)
    const newState = UsersReducer(state,action)

    expect(newState.users.length).toBe(7)
});

test('end flag must be true', () => {

    const action = setEndOfUsers()
    const newState = UsersReducer(state,action)

    expect(newState.end).toBe(true)
});
test('isFetching flag must be equal to the parameter from action creator', () => {

    const action = setIsFetchingFlag(true)
    const newState = UsersReducer(state,action)

    expect(newState.isFetching).toBe(true)
});
test('button with current id must be in the array of disabled buttons', () => {
    const buttonId = '1'
    const action = setDisabledBtn(buttonId)
    const newState = UsersReducer(state,action)

    expect(newState.disabledBtns).toContain(buttonId)
});
test('button with current id must be removed from the array of disabled buttons', () => {
    const buttonId = '1'
    const action = setEnabledBtn(buttonId)
    const newState = UsersReducer(state,action)

    expect(newState.disabledBtns).not.toContain(buttonId)
});


