import React from "react";
import QuestionContainer from "../../components/question-container/question-container.component";
import { connect } from "react-redux";
import {
    toggleLoader,
    setQuestionData
} from "../../redux/question/question.action";
import { firestore } from "../../firebase/firebase.utils";

class HomePage extends React.Component {
    //todo stop api call on back button
    async componentDidMount() {
        this.props.toggleLoader();
        const userRef = firestore.doc(`questions/b41rFEKQw3OOzuzImSci`);
        const { questions } = await (await userRef.get()).data();
        this.props.setQuestionData(questions);
        this.props.toggleLoader();
    }
    // componentWillUpdate(nextProps, nextState) {
    //     debugger;
    // }
    render() {
        return (
            <div className="homepage">
                <QuestionContainer />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    toggleLoader: () => dispatch(toggleLoader()),
    setQuestionData: data => dispatch(setQuestionData(data))
});
const mapStateToProps = state => ({
    EVERY_QUESTION: state.question.EVERY_QUESTION
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
