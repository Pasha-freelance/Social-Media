import AuthReducer, {setAuthData, setIsFetchingFlag, setIsLoginDataCorrect} from "./AuthReducer";


const state = {
    login: '',
    email: '',
    id: null,
    isAuth: false,
    isFetching: false,
    isLoginDataCorrect: true
}
describe('AuthReducer test', () => {
    test('isFetching flag should become true', () => {

        const action = setIsFetchingFlag(true)
        const newState = AuthReducer(state, action)
        expect(newState.isFetching).toBe(true)
    })
    test('isLoginDataCorrect flag should become true', () => {

        const action = setIsLoginDataCorrect(true)
        const newState = AuthReducer(state, action)
        expect(newState.isLoginDataCorrect).toBe(true)
    })
    test('isAuth should become true', () => {

        const action = setAuthData(null, true)
        const newState = AuthReducer(state, action)
        expect(newState.isAuth).toBe(true)
    })
    test('state should not be changed', () => {

        const action = setAuthData(null, false)
        const newState = AuthReducer(state, action)
        expect(newState).toEqual({
            login: '',
            email: '',
            id: null,
            isAuth: false,
            isFetching: false,
            isLoginDataCorrect: true
        })
    })
    test('keys in the state must be equal to appropriate keys in the authData', () => {
        const authData = {
            login: 'JOhn',
            email: 'v@gmail.com',
            id: 134,
        }
        const action = setAuthData(authData, true)
        const newState = AuthReducer(state, action)
        expect(newState.login).toBe('JOhn')
        expect(newState.email).toBe('v@gmail.com')
        expect(newState.id).toBe(134)
        expect(newState.isAuth).toBe(true)
    })
})

