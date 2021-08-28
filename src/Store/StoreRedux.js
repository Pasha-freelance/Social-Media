import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import MessagesPageReducer from "./MessagesPageReducer";
import NavBarReducer from "./NavBarReducer";
import UsersReducer from "./UsersReducer";
import UserProfileReducer from "./UserProfileReducer";
import AuthReducer from "./AuthReducer";
import thunkMiddleware from 'redux-thunk'


let reducers = combineReducers({
    MessagesPage: MessagesPageReducer,
    NavBar: NavBarReducer,
    UsersPage: UsersReducer,
    UserProfile: UserProfileReducer,
    Auth: AuthReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)))
window.store = store
export default store