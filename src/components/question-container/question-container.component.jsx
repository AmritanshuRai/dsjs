import React from "react";
import "./question-container.styles.scss";
import Question from "../question/question.component";
import { connect } from "react-redux";
import { selectQuestionData } from "../../redux/question/question.selector";
import { setQuestionData } from "../../redux/question/question.action";
import { toggleLoader } from "../../redux/universal/universal.action";
import { firestore } from "../../firebase/firebase.utils";

class QuestionContainer extends React.Component {
    componentDidMount() {
        this.fetchData();
    }
    async fetchData() {
        this.props.toggleLoader();
        const userRef = firestore.doc(`questions/b41rFEKQw3OOzuzImSci`);
        const { questions } = await (await userRef.get()).data();
        this.props.setQuestionData(questions);
        this.props.toggleLoader();
    }
    render() {
        return (
            <div className="questionContainer">
                {this.props.question_data.map(question => (
                    <Question key={question.id} question={question} />
                ))}
            </div>
        );
    }
}
const mapStateToProps = state => ({
    question_data: selectQuestionData(state)
});
const mapDispatchToProps = dispatch => ({
    toggleLoader: () => dispatch(toggleLoader()),
    setQuestionData: data => dispatch(setQuestionData(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(QuestionContainer);
