const CHANGE_NEW_MESSAGE_TEXT = 'Messages/CHANGE-NEW-MESSAGE-TEXT'
const SEND_MESSAGE = 'Messages/SEND-MESSAGE'


const initialState = {
    Messages: [
        {
            nickname: 'Nick',
            chatStory: ['Hi', 'I`m Nick'],
            id: 1
        },
        {
            nickname: 'John',
            chatStory: ['Hello', 'I`m John'],
            id: 2

        },
        {
            nickname: 'Mike',
            chatStory: ['Sorry', 'I`m Mike'],
            id: 3

        },
        {
            nickname: 'Sarah',
            chatStory: ['I don`t know', 'I`m Sarah'],
            id: 4

        },
        {
            nickname: 'Lana',
            chatStory: ['I can`t go', 'I`m Lana'],
            id: 5

        }
    ],
    newMessageText: '',
}

export default function messagesPageReducer(state = initialState, action) {


    switch (action.type) {
        //updates value of variable with new text for new message
        case CHANGE_NEW_MESSAGE_TEXT:
            return {
                ...state,
                newMessageText: action.newText
            }
        //sends message to chosen person
        case SEND_MESSAGE:
            if (state.newMessageText !== '') {
                return {
                    ...state,
                    Messages: state.Messages.map(chat => {      //finding and adding the message to the person
                        // with current userId
                        if (chat.id === action.id) {
                            return {
                                ...chat,
                                chatStory: [...chat.chatStory, state.newMessageText],
                            }
                        }
                        return chat
                    }),
                    newMessageText: ''
                }
            } else return state
        default:
            return state
    }
}

//Action Creators
export const changeNewMessageTextActionCreator = text => ({type: CHANGE_NEW_MESSAGE_TEXT, newText: text})
export const sendMessageActionCreator = userId => ({type: SEND_MESSAGE, id: userId})
