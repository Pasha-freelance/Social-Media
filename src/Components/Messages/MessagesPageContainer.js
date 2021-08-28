import {connect} from "react-redux";
import MessagesPage from "./MessagesPage";
import {changeNewMessageTextActionCreator, sendMessageActionCreator} from "../../Store/MessagesPageReducer";
import {compose} from "redux";
import withAuthRedirect from "../../HOC/withAuthRedirect";


const mapStateToProps = (state) => {
    return {
        Messages: state.MessagesPage.Messages,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMessageText: (text) => {
            dispatch(changeNewMessageTextActionCreator(text))
        },
        sendMessage: (id) => {
            dispatch(sendMessageActionCreator(id))
        }
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthRedirect
)(MessagesPage)

